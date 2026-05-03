import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';

export default function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <RouterProvider router={router} />
      </PropertyProvider>
    </AuthProvider>
  );
}