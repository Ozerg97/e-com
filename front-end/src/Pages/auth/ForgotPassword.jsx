import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userForgotPasswordAction, resetMessages } from '../../Redux/Actions/User';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [localError, setLocalError] = useState(""); // État pour gérer l'erreur localement

    const userForgotPasswordReducer = useSelector((state) => state.userForgotPasswordReducer);
    const { loading, error, successMessage } = userForgotPasswordReducer;

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
        setLocalError(""); // Réinitialiser l'erreur locale avant une nouvelle tentative de réinitialisation de mot de passe
        dispatch(userForgotPasswordAction(email)); // Action de réinitialisation de mot de passe
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                {loading && <p>Loading...</p>}
                {localError && <p className="text-red-600">{localError}</p>}
                {successMessage && <p className="text-green-600">{successMessage}</p>}
                <form onSubmit={submitHandler}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Please enter your email</label>
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
                    
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        disabled={loading}
                    >
                        Reset my password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
