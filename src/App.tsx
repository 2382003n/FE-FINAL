import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LayananList from './components/LayananList';
import PembeliList from './components/PembeliList';
import PembeliForm from './components/PembeliForm';
import Login from './pages/Login';
import Register from './pages/Register';

import RootLayout from './layouts/RootLayout';
import PublicRoute from './utils/PublicRoute';
import BaseLayout from './layouts/BaseLayout';
import PrivateRoute from './utils/PrivateRoute';
import Home from './pages/Home';
import PegawaiList from './components/PegawaiList';
import PegawaiForm from './components/PegawaiForm';
import LayananForm from './components/LayananForm';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
            <Routes>
              <Route path='/' element={<BaseLayout/>}>
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              </Route>




              <Route path='/' element={<RootLayout/>}>
                <Route index element={<PrivateRoute><Home/></PrivateRoute>}/>
                {/* Employee Routes */}
                <Route path="/pegawai" element={<PrivateRoute><PegawaiList/></PrivateRoute>} /> 
                <Route path="/pegawai/new" element={<PrivateRoute><PegawaiForm/></PrivateRoute>} />
                <Route path="/pegawai/:id/edit" element={<PrivateRoute><PegawaiForm/></PrivateRoute>} />

                {/* Service Routes */}
                <Route path="/layanan" element={<PrivateRoute><LayananList/></PrivateRoute>} />
                <Route path="/layanan/new" element={<PrivateRoute><LayananForm/></PrivateRoute>} />
                <Route path="/layanan/:id/edit" element={<PrivateRoute><LayananForm/></PrivateRoute>} />

                {/* Customer Routes */}
                <Route path="/pembeli" element={<PrivateRoute><PembeliList/></PrivateRoute>} />
                <Route path="/pembeli/new" element={<PrivateRoute><PembeliForm/></PrivateRoute>} />
                <Route path="/pembeli/:id/edit" element={<PrivateRoute><PembeliForm/></PrivateRoute>} />
              </Route>
            </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
