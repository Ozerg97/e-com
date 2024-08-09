import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAction, resetMessages } from '../../Redux/Actions/User';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { loading, error } = userLoginReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    if (error && error !== localError) {
      setLocalError(error); // Met à jour l'état local avec l'erreur du backend
    }
  }, [error, localError]);

  useEffect(() => {
    dispatch(resetMessages()); // Réinitialiser les messages au montage du composant
  
    return () => {
      dispatch(resetMessages()); // Réinitialiser les messages lors du démontage du composant
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLocalError(""); // Réinitialiser l'erreur locale avant une nouvelle tentative de connexion
    dispatch(userLoginAction(email, password));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {localError && (
          <p className="text-green-500 text-sm mb-4 text-center">{localError}</p> // Affichage de l'erreur en rouge
        )}

        <form onSubmit={submitHandler}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="example@gmail.com"
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="••••••••"
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              />
            </div>
            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">Remember me</label>
          </div>
          
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={loading} // Désactiver le bouton si le chargement est en cours
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-sm text-blue-700 hover:underline">Forgot password?</Link>
          <p className="mt-2 text-sm">
            Don't have an account? <Link to="/register" className="text-blue-700 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
