import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { layananApi, pegawaiApi, pembeliApi } from '../utils/api';
// Import motion and useReducedMotion hook for accessibility
import { motion, useReducedMotion } from 'framer-motion';

// --- Animation Variants ---

// Staggered container for the grid
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Start animating children slightly after the container becomes visible
      delayChildren: 0.3,
      // Stagger the animation of each child by 0.15 seconds
      staggerChildren: 0.15
    }
  }
};

// Individual card entrance animation (used with stagger)
const cardItemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 }, // Start lower, faded, slightly smaller
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" // A nice easing for entrances
    }
  }
};

// Simple fade-in/slide-up for text elements within cards
const contentVariants = {
   hidden: { opacity: 0, y: 10 },
   visible: {
     opacity: 1,
     y: 0,
     transition: { duration: 0.3, ease: "easeOut" }
   }
}

// --- Component ---

const Home = () => {
  const [stats, setStats] = useState({
    layanan: 0,
    pegawai: 0,
    pembeli: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Hook to respect user's motion preference
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const [layananRes, pegawaiRes, pembeliRes] = await Promise.all([
          layananApi.getAll(),
          pegawaiApi.getAll(),
          pembeliApi.getAll()
        ]);
        setStats({
          layanan: layananRes?.data?.length ?? 0,
          pegawai: pegawaiRes?.data?.length ?? 0,
          pembeli: pembeliRes?.data?.length ?? 0
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError('Failed to fetch statistics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Loading State
  if (loading) {
    return (
      <motion.div
        key="loader" // Add key for potential AnimatePresence transitions
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50"
      >
        <motion.div
          // Add a subtle pulse to the spinner border
          animate={shouldReduceMotion ? {} : { // Only animate if motion is enabled
            scale: [1, 1.1, 1],
            rotate: 360,
          }}
          transition={shouldReduceMotion ? {} : { // Only transition if motion is enabled
            rotate: { duration: 1, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"
        />
      </motion.div>
    );
  }

  // Error State
  if (error) {
    return (
      <motion.div
        key="error"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-6"
      >
        <motion.div
           // Add a slight scale animation to draw attention
           initial={{ scale: 0.95 }}
           animate={{ scale: 1 }}
           transition={{ delay: 0.1, duration: 0.3 }}
           className="bg-white border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-lg text-center" role="alert"
        >
            <p className="font-bold mb-1">Error Occurred</p>
            <p>{error}</p>
        </motion.div>
      </motion.div>
    );
  }

  // Main Content
  return (
    <motion.div
      key="dashboard"
      initial="hidden" // Use initial="hidden" with variants
      animate="visible" // Use animate="visible" with variants
      variants={shouldReduceMotion ? {} : { // Apply variants conditionally
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
      }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Title Animation */}
        <motion.h1
          // Apply variants directly if not part of a stagger group
          variants={shouldReduceMotion ? {} : contentVariants}
          // Adjust initial/animate if needed, or rely on parent's propagation if using variants
          initial={shouldReduceMotion ? {} : { y: -30, opacity: 0 }}
          animate={shouldReduceMotion ? {} : { y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? {} : { delay: 0.2, duration: 0.5, type: "spring", stiffness: 100 }} // Spring effect
          className="text-4xl font-bold text-gray-900 mb-10 text-center md:text-left"
        >
          Dashboard Overview
        </motion.h1>

        {/* Grid container with stagger animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={shouldReduceMotion ? {} : gridContainerVariants} // Apply grid variants
          initial="hidden"
          animate="visible"
        >

          {/* Services Card */}
          <motion.div variants={shouldReduceMotion ? {} : cardItemVariants} /* Apply item variants */ >
            <Link to="/layanan" className="block h-full group">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -5, transition: { duration: 0.2 } }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98, transition: { duration: 0.1 } }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between overflow-hidden border-t-4 border-transparent group-hover:border-indigo-500"
              >
                <div className="flex items-start justify-between mb-4"> {/* Use items-start */}
                  <motion.div variants={shouldReduceMotion ? {} : contentVariants} /* Animate text block */ >
                    <h2 className="text-lg font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">Services</h2>
                    <motion.p
                      variants={shouldReduceMotion ? {} : contentVariants} // Animate number
                      transition={shouldReduceMotion ? {} : { delay: 0.1 }} // Slight delay after title
                      className="text-4xl font-bold text-indigo-600 mt-1"
                    >
                      {stats.layanan}
                    </motion.p>
                  </motion.div>
                  <motion.div
                    initial={shouldReduceMotion ? {} : { scale: 0, rotate: -45 }} // Icon entrance
                    animate={shouldReduceMotion ? {} : { scale: 1, rotate: 0 }}
                    transition={shouldReduceMotion ? {} : { delay: 0.2, type: "spring", stiffness: 150, damping: 10 }} // Springy icon entrance
                    whileHover={shouldReduceMotion ? {} : { rotate: 15 }} // Keep icon rotation on hover
                    className="bg-indigo-100 p-3 rounded-full transition-colors duration-300 group-hover:bg-indigo-200"
                  >
                    <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                </div>
                <motion.p
                   variants={shouldReduceMotion ? {} : contentVariants} // Animate description
                   transition={shouldReduceMotion ? {} : { delay: 0.2 }} // Delay after number
                   className="text-sm text-gray-500 mt-auto"
                >
                  Manage service offerings
                </motion.p>
              </motion.div>
            </Link>
          </motion.div>

          {/* Employees Card */}
          <motion.div variants={shouldReduceMotion ? {} : cardItemVariants}>
             <Link to="/pegawai" className="block h-full group">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -5, transition: { duration: 0.2 } }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98, transition: { duration: 0.1 } }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between overflow-hidden border-t-4 border-transparent group-hover:border-green-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.div variants={shouldReduceMotion ? {} : contentVariants}>
                    <h2 className="text-lg font-semibold text-gray-700 group-hover:text-green-600 transition-colors duration-300">Employees</h2>
                    <motion.p
                      variants={shouldReduceMotion ? {} : contentVariants}
                      transition={shouldReduceMotion ? {} : { delay: 0.1 }}
                      className="text-4xl font-bold text-green-600 mt-1"
                    >
                      {stats.pegawai}
                    </motion.p>
                  </motion.div>
                  <motion.div
                    initial={shouldReduceMotion ? {} : { scale: 0, rotate: -45 }}
                    animate={shouldReduceMotion ? {} : { scale: 1, rotate: 0 }}
                    transition={shouldReduceMotion ? {} : { delay: 0.2, type: "spring", stiffness: 150, damping: 10 }}
                    whileHover={shouldReduceMotion ? {} : { rotate: 15 }}
                    className="bg-green-100 p-3 rounded-full transition-colors duration-300 group-hover:bg-green-200"
                  >
                     <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                     </svg>
                  </motion.div>
                </div>
                <motion.p
                   variants={shouldReduceMotion ? {} : contentVariants}
                   transition={shouldReduceMotion ? {} : { delay: 0.2 }}
                   className="text-sm text-gray-500 mt-auto"
                >
                  View and manage staff
                </motion.p>
              </motion.div>
            </Link>
          </motion.div>

          {/* Customers Card */}
          <motion.div variants={shouldReduceMotion ? {} : cardItemVariants}>
            <Link to="/pembeli" className="block h-full group">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -5, transition: { duration: 0.2 } }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98, transition: { duration: 0.1 } }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between overflow-hidden border-t-4 border-transparent group-hover:border-purple-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.div variants={shouldReduceMotion ? {} : contentVariants}>
                    <h2 className="text-lg font-semibold text-gray-700 group-hover:text-purple-600 transition-colors duration-300">Customers</h2>
                    <motion.p
                      variants={shouldReduceMotion ? {} : contentVariants}
                      transition={shouldReduceMotion ? {} : { delay: 0.1 }}
                      className="text-4xl font-bold text-purple-600 mt-1"
                    >
                      {stats.pembeli}
                    </motion.p>
                  </motion.div>
                  <motion.div
                     initial={shouldReduceMotion ? {} : { scale: 0, rotate: -45 }}
                     animate={shouldReduceMotion ? {} : { scale: 1, rotate: 0 }}
                     transition={shouldReduceMotion ? {} : { delay: 0.2, type: "spring", stiffness: 150, damping: 10 }}
                     whileHover={shouldReduceMotion ? {} : { rotate: 15 }}
                    className="bg-purple-100 p-3 rounded-full transition-colors duration-300 group-hover:bg-purple-200"
                  >
                     <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                     </svg>
                  </motion.div>
                </div>
                 <motion.p
                   variants={shouldReduceMotion ? {} : contentVariants}
                   transition={shouldReduceMotion ? {} : { delay: 0.2 }}
                   className="text-sm text-gray-500 mt-auto"
                 >
                  Access customer records
                </motion.p>
              </motion.div>
            </Link>
          </motion.div>

        </motion.div> {/* End grid */}
      </div> {/* End max-w-7xl */}
    </motion.div> // End page container
  );
};

export default Home;