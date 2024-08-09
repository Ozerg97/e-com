import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userRegisterAction, resetMessages } from '../../Redux/Actions/User';

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(""); // État pour gérer l'erreur localement

  const userRegisterReducer = useSelector((state) => state.userRegisterReducer);
  const { loading, error, successMessage } = userRegisterReducer;

  const dispatch = useDispatch();

  // Réinitialiser l'erreur locale si l'erreur du backend change
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
    
    dispatch(userRegisterAction(name, email, password));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        {loading && <p>Loading...</p>}
        {localError && <p className="text-red-600">{localError}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}

        <form onSubmit={submitHandler}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
            <input
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="John Doe"
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="johndoe@hotmail.com"
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
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="••••••••"
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
              />
            </div>
            <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900">
              I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={loading} // Désactiver le bouton si le chargement est en cours
          >
            Register new account
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account? <Link to="/login" className="text-blue-700 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
