import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { layananApi } from '../utils/api';


const EditLayanan = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    harga: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLayanan = async () => {
      try {
        const response = await layananApi.getById(parseInt(id!));
        const layanan = response.data;
        setFormData({
          nama: layanan.nama,
          deskripsi: layanan.deskripsi,
          harga: layanan.harga.toString(),
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch service');
      }
    };

    fetchLayanan();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await layananApi.update(parseInt(id!), {
        ...formData,
        harga: parseFloat(formData.harga)
      });
      navigate('/layanan');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Service</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="nama" className="block text-gray-700 text-sm font-bold mb-2">
            Service Name
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="deskripsi" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="harga" className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            id="harga"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/layanan')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLayanan; 