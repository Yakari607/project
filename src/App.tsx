import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailGenerator from './components/EmailGenerator';
import Templates from './pages/Templates';
import Toast from './components/Toast';
import { useToast } from './hooks/useToast';
import HomeLogin from './pages/Homelogin';
import LoginForm from './components/auth/LoginForm';

function App() {
  const { toasts } = useToast();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="generator" element={<EmailGenerator />} />
          <Route path="templates" element={<Templates />} />
        </Route>
        <Route path="/" element={<LoginForm />} />
        <Route path="/homelogin" element={<HomeLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homelogin" element={<HomeLogin />} />
      </Routes>

      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => {}}
        />
      ))}
    </BrowserRouter>
  );
}

export default App;