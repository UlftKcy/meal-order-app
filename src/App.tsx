import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Welcome from './pages/Welcome';
import { lazy, Suspense } from 'react';
import NotFound from './components/NotFound';
import Loader from './components/Loader';

const Menu = lazy(() => import('./pages/Menu'));
const Meal = lazy(() => import('./pages/Meal'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="menu" element={<Suspense fallback={<Loader size={6}/>}><Menu /></Suspense>} />
        <Route path="menu/:id" element={<Suspense fallback={<Loader  size={6}/>}><Meal /></Suspense>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
