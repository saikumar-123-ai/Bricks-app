import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      <div className="relative z-10 p-10 mt-4 text-left bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 rounded-3xl w-[450px] transform transition-all hover:scale-[1.01]">
        <h3 className="text-4xl font-extrabold text-center text-white drop-shadow-md mb-2">Smart Brick AI</h3>
        <p className="text-center text-gray-200 mb-8 font-light tracking-wide">Welcome back to the portal</p>
        
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">Email Address</label>
            <input type="email" placeholder="john@example.com"
              className="w-full px-5 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-black/30 transition-all"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">Password</label>
            <input type="password" placeholder="••••••••"
              className="w-full px-5 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-black/30 transition-all"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          
          <button className="w-full py-3 mt-6 text-white bg-primary rounded-xl hover:bg-primary-hover font-bold tracking-wider shadow-[0_0_15px_rgba(255,87,34,0.5)] hover:shadow-[0_0_25px_rgba(255,87,34,0.7)] transition-all duration-300">
            LOGIN
          </button>
          
          <div className="mt-6 text-sm text-center text-gray-300">
            Don't have an account? <Link to="/register" className="text-primary hover:text-primary-hover font-semibold hover:underline transition-all">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
