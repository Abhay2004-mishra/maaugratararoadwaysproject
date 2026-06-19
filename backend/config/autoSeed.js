const User = require('../models/User');
const Truck = require('../models/Truck');
const Testimonial = require('../models/Testimonial');
const Document = require('../models/Document');

const autoSeed = async () => {
  try {
    // 1. Auto-seed Admin User
    let admin = await User.findOne({ username: 'admin' });
    if (!admin) {
      admin = new User({
        username: 'admin',
        password: 'admin1234'
      });
      await admin.save();
      console.log('🌱 [AutoSeed] Default admin user created: admin / admin1234');
    } else {
      // Ensure the admin password is reset to admin1234
      admin.password = 'admin1234';
      await admin.save();
      console.log('🌱 [AutoSeed] Admin user password reset to admin1234');
    }

    // 2. Auto-seed Trucks
    const truckCount = await Truck.countDocuments();
    if (truckCount === 0) {
      const defaultTrucks = [
        {
          name: "Tata Signa 2823.K",
          capacity: "25 Tons",
          type: "10-Wheeler Open Truck",
          routes: ["Jamshedpur -> Kolkata", "Jamshedpur -> Patna"],
          imageUrl: "/uploads/truck10.jpg",
          isActive: true
        },
        {
          name: "BharatBenz 3523R",
          capacity: "31 Tons",
          type: "12-Wheeler Heavy Taurus",
          routes: ["Jamshedpur -> Bhubaneswar", "Jamshedpur -> Kolkata"],
          imageUrl: "/uploads/truck.jpg",
          isActive: true
        },
        {
          name: "Ashok Leyland 4019",
          capacity: "40 Tons",
          type: "18-Wheeler Heavy Trailer",
          routes: ["Jamshedpur -> Raipur", "Jamshedpur -> Kolkata"],
          imageUrl: "/uploads/trip_trailer.png",
          isActive: true
        },
        {
          name: "Tata LPT 1613",
          capacity: "10 Tons",
          type: "6-Wheeler Box Truck",
          routes: ["Jamshedpur -> Ranchi", "Jamshedpur -> Dhanbad"],
          imageUrl: "/uploads/download11.jpeg",
          isActive: true
        }
      ];
      await Truck.insertMany(defaultTrucks);
      console.log('🌱 [AutoSeed] Seeded 4 default fleet trucks.');
    }

    // 3. Auto-seed Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      const defaultTestimonials = [
        {
          clientName: "Rajesh Sharma",
          companyName: "Tata Steel Supplier Logistics",
          feedback: "Maa Ugra Tara Roadways has been our trusted transport partner for over a decade. Their timely delivery of steel scrap and iron ore coils, combined with seamless digital billing, makes them the best in Jamshedpur.",
          rating: 5
        },
        {
          clientName: "Amit Agarwal",
          companyName: "Jamshedpur Scrap Metal Industries",
          feedback: "Extremely reliable loading management and 24x7 support. Their challan process is transparent, and they maintain excellent logs. Highly recommended for heavy commercial transport.",
          rating: 5
        },
        {
          clientName: "Debasis Mohanty",
          companyName: "Eastern India Cement Works",
          feedback: "Outstanding multi-state logistics capability. We regularly transport bulk industrial materials across Odisha and West Bengal. Their drivers are experienced, and transit updates are prompt.",
          rating: 4
        }
      ];
      await Testimonial.insertMany(defaultTestimonials);
      console.log('🌱 [AutoSeed] Seeded 3 default client testimonials.');
    }

    // 4. Auto-seed Documents
    const docCount = await Document.countDocuments();
    if (docCount === 0) {
      const defaultDocs = [
        {
          title: "Maa Ugra Tara Roadways GST Certificate",
          description: "GST Identification Number registration document verifying compliance and licensing status.",
          fileUrl: "/uploads/mock-gst-certificate.pdf",
          fileType: "pdf"
        },
        {
          title: "Standard Consignment Note & Challan Process",
          description: "Overview document describing company liability, delivery conditions, and digital challan steps.",
          fileUrl: "/uploads/mock-challan-template.pdf",
          fileType: "pdf"
        }
      ];
      await Document.insertMany(defaultDocs);
      console.log('🌱 [AutoSeed] Seeded 2 compliance documents.');
    }

  } catch (error) {
    console.error('❌ [AutoSeed] Error auto-seeding database:', error.message);
  }
};

module.exports = autoSeed;
