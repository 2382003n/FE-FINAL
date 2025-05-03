import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pegawaiApi } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';

interface Pegawai {
  id: number;
  nama_pegawai: string;
  posisi: string;
  gaji: number;
}

const PegawaiList = () => {
  const [pegawai, setPegawai] = useState<Pegawai[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPegawai = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await pegawaiApi.getAll();
        if (response.data) {
          setPegawai(response.data);
        }
      } catch (err) {
        setError('Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    };

    fetchPegawai();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await pegawaiApi.delete(id);
        setPegawai(pegawai.filter(p => p.id !== id));
      } catch (err) {
        setError('Failed to delete employee');
      }
    }
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <motion.div 
          animate={{ 
            rotate: 360,
            transition: { duration: 1, repeat: Infinity, ease: "linear" }
          }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"
        />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-red-500">{error}</div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <Link to="/pegawai/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add New Employee
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {pegawai.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-semibold text-gray-900">
                    {p.nama_pegawai}
                  </h2>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>Position: {p.posisi}</p>
                    <p>Salary: Rp {p.gaji.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex space-x-4">
                    <Link to={`/pegawai/${p.id}/edit`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default PegawaiList; 