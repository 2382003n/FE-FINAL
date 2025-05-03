import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pegawaiApi } from '../utils/api';

interface Pegawai {
  id: number;
  nama: string;
  alamat: string;
  telepon: string;
  jabatan: string;
}

const Pegawai = () => {
  const navigate = useNavigate();
  const [pegawaiList, setPegawaiList] = useState<Pegawai[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPegawai();
  }, []);

  const fetchPegawai = async () => {
    try {
      const response = await pegawaiApi.getAll();
      setPegawaiList(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await pegawaiApi.delete(id);
        setPegawaiList(pegawaiList.filter(pegawai => pegawai.id !== id));
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete employee');
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
        <h1 className="text-2xl font-bold">Employees</h1>
        <button
          onClick={() => navigate('/pegawai/add')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pegawaiList.map((pegawai) => (
          <div key={pegawai.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{pegawai.nama}</h2>
            <p className="text-gray-600 mb-2">Position: {pegawai.jabatan}</p>
            <p className="text-gray-600 mb-2">Address: {pegawai.alamat}</p>
            <p className="text-gray-600 mb-4">Phone: {pegawai.telepon}</p>
            <div className="flex justify-between">
              <button
                onClick={() => navigate(`/pegawai/edit/${pegawai.id}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pegawai.id)}
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

export default Pegawai; 