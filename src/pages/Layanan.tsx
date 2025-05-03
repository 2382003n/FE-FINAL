import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { layananApi } from '../utils/api';

interface Layanan {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
}

const Layanan = () => {
  const navigate = useNavigate();
  const [layananList, setLayananList] = useState<Layanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLayanan();
  }, []);

  const fetchLayanan = async () => {
    try {
      const response = await layananApi.getAll();
      setLayananList(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch services');
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await layananApi.delete(id);
        setLayananList(layananList.filter(layanan => layanan.id !== id));
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete service');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <button
          onClick={() => navigate('/layanan/add')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {layananList.map((layanan) => (
          <div key={layanan.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{layanan.nama}</h2>
            <p className="text-gray-600 mb-4">{layanan.deskripsi}</p>
            <p className="text-lg font-bold mb-4">${layanan.harga}</p>
            <div className="flex justify-between">
              <button
                onClick={() => navigate(`/layanan/edit/${layanan.id}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(layanan.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layanan; 