import React, { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, CheckCircle, RefreshCw, Layers, Trash2, Calendar, Plus, Upload, Eye, FileText, CheckCircle2, X } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState('leads'); // leads, fleet, testimonials, documents
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Data States
  const [leads, setLeads] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [documents, setDocuments] = useState([]);
  
  // Form Addition States
  const [newTruck, setNewTruck] = useState({ name: '', capacity: '', type: '', routes: '', imageUrl: '' });
  const [newTestimonial, setNewTestimonial] = useState({ clientName: '', companyName: '', feedback: '', rating: 5 });
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocDesc, setNewDocDesc] = useState('');
  const [selectedDocFile, setSelectedDocFile] = useState(null);

  // Loading States
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  // Check login on load
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      // Verify token
      fetch('http://localhost:5001/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${savedToken}`
        }
      })
      .then(res => {
        if (res.ok) {
          setIsLoggedIn(true);
          setToken(savedToken);
        } else {
          localStorage.removeItem('adminToken');
        }
      })
      .catch(() => localStorage.removeItem('adminToken'));
    }
  }, []);

  // Fetch tab data on tab or auth change
  useEffect(() => {
    if (!isLoggedIn || !token) return;

    setLoading(true);
    setActionError(null);

    const headers = { 'Authorization': `Bearer ${token}` };

    if (activeTab === 'leads') {
      fetch('http://localhost:5001/api/leads', { headers })
        .then(res => res.json())
        .then(data => setLeads(data))
        .catch(err => setActionError('Failed to fetch leads'))
        .finally(() => setLoading(false));
    } else if (activeTab === 'fleet') {
      fetch('http://localhost:5001/api/trucks')
        .then(res => res.json())
        .then(data => setTrucks(data))
        .catch(err => setActionError('Failed to fetch fleet'))
        .finally(() => setLoading(false));
    } else if (activeTab === 'testimonials') {
      fetch('http://localhost:5001/api/testimonials')
        .then(res => res.json())
        .then(data => setTestimonials(data))
        .catch(err => setActionError('Failed to fetch testimonials'))
        .finally(() => setLoading(false));
    } else if (activeTab === 'documents') {
      fetch('http://localhost:5001/api/documents')
        .then(res => res.json())
        .then(data => setDocuments(data))
        .catch(err => setActionError('Failed to fetch compliance documents'))
        .finally(() => setLoading(false));
    }
  }, [isLoggedIn, token, activeTab]);

  // Handle Login Submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } catch (err) {
      setLoginError(err.message);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setIsLoggedIn(false);
  };

  // 1. Leads Actions
  const handleLeadStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5001/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update lead');
      const updated = await res.json();
      setLeads(leads.map(lead => lead._id === id ? updated : lead));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLeadDelete = async (id) => {
    if (!window.confirm("Delete this lead entry permanently?")) return;
    try {
      const res = await fetch(`http://localhost:5001/api/leads/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete lead');
      setLeads(leads.filter(lead => lead._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // 2. Fleet Actions
  const handleTruckAdd = async (e) => {
    e.preventDefault();
    if (!newTruck.name || !newTruck.capacity || !newTruck.type || !newTruck.imageUrl) {
      alert("Please enter Name, Capacity, Type, and Image URL");
      return;
    }
    try {
      const res = await fetch('http://localhost:5001/api/trucks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTruck)
      });
      if (!res.ok) throw new Error('Failed to add truck');
      const added = await res.json();
      setTrucks([added, ...trucks]);
      setNewTruck({ name: '', capacity: '', type: '', routes: '', imageUrl: '' });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleTruckDelete = async (id) => {
    if (!window.confirm("Remove this truck from fleet list?")) return;
    try {
      const res = await fetch(`http://localhost:5001/api/trucks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete truck');
      setTrucks(trucks.filter(t => t._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // 3. Testimonial Actions
  const handleTestimonialAdd = async (e) => {
    e.preventDefault();
    if (!newTestimonial.clientName || !newTestimonial.feedback) {
      alert("Please provide Client Name and Feedback");
      return;
    }
    try {
      const res = await fetch('http://localhost:5001/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTestimonial)
      });
      if (!res.ok) throw new Error('Failed to add testimonial');
      const added = await res.json();
      setTestimonials([added, ...testimonials]);
      setNewTestimonial({ clientName: '', companyName: '', feedback: '', rating: 5 });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleTestimonialDelete = async (id) => {
    if (!window.confirm("Delete this review entry?")) return;
    try {
      const res = await fetch(`http://localhost:5001/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete testimonial');
      setTestimonials(testimonials.filter(t => t._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // 4. Document Actions
  const handleDocUploadSubmit = async (e) => {
    e.preventDefault();
    if (!newDocTitle || !selectedDocFile) {
      alert("Please provide Document Title and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append('title', newDocTitle);
    formData.append('description', newDocDesc);
    formData.append('file', selectedDocFile);

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5001/api/documents/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to upload document');
      
      setDocuments([data, ...documents]);
      setNewDocTitle('');
      setNewDocDesc('');
      setSelectedDocFile(null);
      // Clear file input manually
      document.getElementById('file-upload-input').value = '';
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDocDelete = async (id) => {
    if (!window.confirm("Delete this document and remove from server storage?")) return;
    try {
      const res = await fetch(`http://localhost:5001/api/documents/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete document');
      setDocuments(documents.filter(d => d._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Render Login Card if not authenticated
  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-brand-slate-50 dark:bg-brand-slate-950 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white dark:bg-brand-slate-900 p-8 rounded-2xl shadow-xl border border-brand-slate-105 dark:border-brand-slate-800"
        >
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-brand-blue-500 text-white flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h1 className="font-outfit font-extrabold text-2xl text-brand-slate-900 dark:text-white">
              Admin Portal
            </h1>
            <p className="text-xs text-brand-slate-400 mt-1">
              Log in with credentials to manage company leads & fleet.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-500 text-xs font-semibold border border-red-100 dark:border-red-950/25">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full px-4 py-2 border border-brand-slate-200 dark:border-brand-slate-800 bg-white/50 dark:bg-brand-slate-900/50 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-brand-slate-200 dark:border-brand-slate-800 bg-white/50 dark:bg-brand-slate-900/50 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                required
              />
            </div>
            <button type="submit" className="w-full btn-primary py-2.5 font-bold text-sm">
              Authenticate Admin
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-slate-50 dark:bg-brand-slate-950 pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white dark:bg-brand-slate-900 p-6 rounded-2xl shadow-sm border border-brand-slate-105 dark:border-brand-slate-800/80 mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-outfit font-black text-xl text-brand-slate-900 dark:text-white uppercase leading-none">
                Roadways Dashboard
              </h1>
              <span className="text-xxs font-bold text-brand-orange-500 uppercase tracking-widest mt-1 block">
                Secured Administrative Mode
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-slate-100 hover:bg-brand-slate-200 dark:bg-brand-slate-800 dark:hover:bg-brand-slate-700 text-brand-slate-700 dark:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Log Out Session
          </button>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'leads', name: 'Freight Inquiries', count: leads.length },
            { id: 'fleet', name: 'Fleet Inventory', count: trucks.length },
            { id: 'testimonials', name: 'Client Reviews', count: testimonials.length },
            { id: 'documents', name: 'Document Center', count: documents.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-brand-slate-900 text-brand-slate-600 dark:text-brand-slate-350 hover:bg-brand-slate-100 dark:hover:bg-brand-slate-800 border border-brand-slate-100 dark:border-brand-slate-800/50'
              }`}
            >
              {tab.name} {tab.count > 0 && <span className="ml-1.5 bg-black/10 text-xxs px-1.5 py-0.5 rounded-full">{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <main className="bg-white dark:bg-brand-slate-900 rounded-2xl shadow-sm border border-brand-slate-100 dark:border-brand-slate-800/80 p-6 min-h-[50vh]">
          {loading && (
            <div className="flex justify-center items-center py-20 text-brand-slate-400">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              <span className="font-semibold">Loading data...</span>
            </div>
          )}

          {actionError && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-lg text-xs font-semibold mb-6">
              {actionError}
            </div>
          )}

          {!loading && (
            <>
              {/* LEADS TAB */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-brand-slate-100 dark:border-brand-slate-800">
                    <h2 className="font-outfit font-extrabold text-lg text-brand-slate-900 dark:text-white">
                      Inquiries & Leads Database
                    </h2>
                  </div>

                  {leads.length === 0 ? (
                    <div className="text-center py-16 text-brand-slate-400 text-sm font-medium">
                      No customer inquiries logged.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-brand-slate-100 dark:border-brand-slate-800 text-brand-slate-400 uppercase font-bold tracking-wider">
                            <th className="py-3 px-4">Customer Details</th>
                            <th className="py-3 px-4">Route stations</th>
                            <th className="py-3 px-4">Material / Cargo</th>
                            <th className="py-3 px-4">Dispatch Status</th>
                            <th className="py-3 px-4">Date Logged</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-slate-100 dark:divide-brand-slate-800/60">
                          {leads.map((lead) => (
                            <tr key={lead._id} className="hover:bg-brand-slate-50/50 dark:hover:bg-brand-slate-900/40">
                              <td className="py-4 px-4">
                                <div className="font-bold text-brand-slate-900 dark:text-white">{lead.name}</div>
                                <div className="text-xxs text-brand-slate-400 font-medium mt-0.5">{lead.phone} | {lead.email || 'No Email'}</div>
                              </td>
                              <td className="py-4 px-4 font-semibold text-brand-slate-700 dark:text-brand-slate-300">
                                {lead.source} → {lead.destination}
                              </td>
                              <td className="py-4 px-4">
                                <div className="font-semibold">{lead.materialType}</div>
                                <div className="text-xxs text-brand-slate-450 mt-0.5">Weight: {lead.weight || 'N/A'}</div>
                              </td>
                              <td className="py-4 px-4">
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleLeadStatusChange(lead._id, e.target.value)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                    lead.status === 'New' ? 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950/20 dark:text-orange-400' :
                                    lead.status === 'Contacted' ? 'bg-blue-50 text-brand-blue-500 border-blue-200 dark:bg-blue-950/20 dark:text-brand-blue-400' :
                                    lead.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-450' :
                                    'bg-brand-slate-105 text-brand-slate-500 border-brand-slate-200 dark:bg-brand-slate-800 dark:text-brand-slate-400'
                                  }`}
                                >
                                  <option value="New">New Request</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="py-4 px-4 text-brand-slate-400">
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-4 text-center">
                                <button
                                  onClick={() => handleLeadDelete(lead._id)}
                                  className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition-colors cursor-pointer"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="h-4.5 w-4.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* FLEET TAB */}
              {activeTab === 'fleet' && (
                <div className="space-y-8">
                  {/* Form to Add */}
                  <form onSubmit={handleTruckAdd} className="bg-brand-slate-50 dark:bg-brand-slate-900/40 p-5 rounded-2xl border border-brand-slate-150 dark:border-brand-slate-800 space-y-4">
                    <h3 className="font-outfit font-extrabold text-sm sm:text-base text-brand-slate-900 dark:text-white flex items-center gap-1.5">
                      <Plus className="h-5 w-5 text-brand-orange-500" />
                      Add Fleet Truck
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1">Truck Model Name</label>
                        <input
                          type="text"
                          value={newTruck.name}
                          onChange={(e) => setNewTruck({ ...newTruck, name: e.target.value })}
                          placeholder="e.g. Tata Signa 2823"
                          className="w-full px-3 py-1.5 border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 text-xs rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1">Load Limit (Tons)</label>
                        <input
                          type="text"
                          value={newTruck.capacity}
                          onChange={(e) => setNewTruck({ ...newTruck, capacity: e.target.value })}
                          placeholder="e.g. 25 Tons"
                          className="w-full px-3 py-1.5 border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 text-xs rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1">Vehicle Type / Wheels</label>
                        <input
                          type="text"
                          value={newTruck.type}
                          onChange={(e) => setNewTruck({ ...newTruck, type: e.target.value })}
                          placeholder="e.g. 10-Wheeler Open"
                          className="w-full px-3 py-1.5 border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 text-xs rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1">Unsplash Image URL</label>
                        <input
                          type="text"
                          value={newTruck.imageUrl}
                          onChange={(e) => setNewTruck({ ...newTruck, imageUrl: e.target.value })}
                          placeholder="e.g. https://images.unsplash..."
                          className="w-full px-3 py-1.5 border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 text-xs rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1">Operational Routes (comma separated)</label>
                      <input
                        type="text"
                        value={newTruck.routes}
                        onChange={(e) => setNewTruck({ ...newTruck, routes: e.target.value })}
                        placeholder="Jamshedpur -> Kolkata, Jamshedpur -> Patna"
                        className="w-full px-3 py-1.5 border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 text-xs rounded-lg"
                      />
                    </div>
                    <button type="submit" className="btn-accent px-4 py-2 text-xs font-bold flex items-center gap-1">
                      <Plus className="h-4 w-4" /> Save Vehicle Record
                    </button>
                  </form>

                  {/* Fleet Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {trucks.map((truck) => (
                      <div key={truck._id} className="border border-brand-slate-150 dark:border-brand-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                        <img src={truck.imageUrl} alt={truck.name} className="w-full h-32 object-cover" />
                        <div className="p-4 space-y-3">
                          <div>
                            <span className="text-[10px] text-brand-orange-500 font-bold uppercase tracking-wider">{truck.type}</span>
                            <h4 className="font-outfit font-bold text-sm text-brand-slate-900 dark:text-white">{truck.name}</h4>
                            <p className="text-xxs text-brand-slate-400">Limit: {truck.capacity}</p>
                          </div>
                          <button
                            onClick={() => handleTruckDelete(truck._id)}
                            className="flex items-center gap-1 text-xxs text-red-500 hover:text-red-650 font-bold transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove Truck
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TESTIMONIALS TAB */}
              {activeTab === 'testimonials' && (
                <div className="space-y-8">
                  {/* Form to Add */}
                  <form onSubmit={handleTestimonialAdd} className="bg-brand-slate-50 dark:bg-brand-slate-900/40 p-5 rounded-2xl border border-brand-slate-150 dark:border-brand-slate-800 space-y-4">
                    <h3 className="font-outfit font-extrabold text-sm sm:text-base text-brand-slate-900 dark:text-white flex items-center gap-1.5">
                      <Plus className="h-5 w-5 text-brand-orange-500" />
                      Add Customer Review
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1">Client Name</label>
                        <input
                          type="text"
                          value={newTestimonial.clientName}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                          placeholder="e.g. Rajesh Sharma"
                          className="w-full px-3 py-1.5 border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 text-xs rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1">Company / Division</label>
                        <input
                          type="text"
                          value={newTestimonial.companyName}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, companyName: e.target.value })}
                          placeholder="e.g. Tata Steel Supplier"
                          className="w-full px-3 py-1.5 border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 text-xs rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1">Star Rating (1-5)</label>
                        <select
                          value={newTestimonial.rating}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
                          className="w-full px-3 py-1.5 border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 text-xs rounded-lg"
                        >
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="2">2 Stars</option>
                          <option value="1">1 Star</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1">Review Feedback Comment</label>
                      <textarea
                        value={newTestimonial.feedback}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, feedback: e.target.value })}
                        placeholder="Type review comment text here..."
                        rows="2"
                        className="w-full px-3 py-1.5 border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 text-xs rounded-lg resize-none"
                      />
                    </div>
                    <button type="submit" className="btn-accent px-4 py-2 text-xs font-bold flex items-center gap-1">
                      <Plus className="h-4 w-4" /> Save Review Card
                    </button>
                  </form>

                  {/* Reviews Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {testimonials.map((test) => (
                      <div key={test._id} className="border border-brand-slate-150 dark:border-brand-slate-800 p-4 rounded-xl shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="font-bold text-sm text-brand-slate-900 dark:text-white">{test.clientName}</span>
                            <span className="text-xxs text-brand-orange-500 font-semibold">{test.companyName}</span>
                          </div>
                          <p className="text-xxs text-brand-slate-500 italic">"{test.feedback}"</p>
                        </div>
                        <div className="flex justify-between items-center border-t border-brand-slate-100 dark:border-brand-slate-850 pt-3 mt-4">
                          <span className="text-[10px] font-bold text-brand-orange-500">Rating: {test.rating} ★</span>
                          <button
                            onClick={() => handleTestimonialDelete(test._id)}
                            className="text-[10px] text-red-500 hover:text-red-650 font-bold transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DOCUMENTS TAB */}
              {activeTab === 'documents' && (
                <div className="space-y-8">
                  {/* File Upload Form */}
                  <form onSubmit={handleDocUploadSubmit} className="bg-brand-slate-50 dark:bg-brand-slate-900/40 p-5 rounded-2xl border border-brand-slate-150 dark:border-brand-slate-800 space-y-4">
                    <h3 className="font-outfit font-extrabold text-sm sm:text-base text-brand-slate-900 dark:text-white flex items-center gap-1.5">
                      <Upload className="h-5 w-5 text-brand-orange-500" />
                      Upload Compliance Document / PDF
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1">Document Title</label>
                        <input
                          type="text"
                          value={newDocTitle}
                          onChange={(e) => setNewDocTitle(e.target.value)}
                          placeholder="e.g. GST Registration Certificate"
                          className="w-full px-3 py-1.5 border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 text-xs rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1">Short Description</label>
                        <input
                          type="text"
                          value={newDocDesc}
                          onChange={(e) => setNewDocDesc(e.target.value)}
                          placeholder="e.g. GSTIN Verification logs certificate."
                          className="w-full px-3 py-1.5 border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 text-xs rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xxs font-bold text-brand-slate-400 uppercase tracking-wider mb-1">Select File (PDF, JPG, PNG)</label>
                        <input
                          id="file-upload-input"
                          type="file"
                          onChange={(e) => setSelectedDocFile(e.target.files[0])}
                          className="w-full text-xs text-brand-slate-500 dark:text-brand-slate-400 mt-1 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-brand-blue-50 file:text-brand-blue-600 dark:file:bg-brand-slate-800 dark:file:text-white"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn-accent px-4 py-2 text-xs font-bold flex items-center gap-1.5">
                      <Upload className="h-4 w-4" /> Start File Upload
                    </button>
                  </form>

                  {/* Documents List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {documents.map((doc) => (
                      <div key={doc._id} className="border border-brand-slate-150 dark:border-brand-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-brand-orange-50 dark:bg-brand-orange-950/20 text-brand-orange-500 flex items-center justify-center">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-outfit font-bold text-xs sm:text-sm text-brand-slate-900 dark:text-white leading-tight">{doc.title}</h4>
                            <p className="text-[10px] text-brand-slate-400 mt-0.5 line-clamp-1">{doc.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={doc.fileUrl.startsWith('/') ? `http://localhost:5001${doc.fileUrl}` : doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-brand-blue-500 hover:bg-brand-blue-50 dark:hover:bg-brand-blue-950/20 rounded"
                            title="View document"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => handleDocDelete(doc._id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded cursor-pointer"
                            title="Delete file"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>

      </div>
    </div>
  );
};

export default AdminDashboard;
