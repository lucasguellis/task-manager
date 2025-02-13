import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Header from './components/Header';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './utils/ProtectedRoute.tsx';

function App() {
  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Header />
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<Navigate to={'/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
