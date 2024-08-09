import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userResetPasswordAction, resetMessages } from '../../Redux/Actions/User';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
    const { userId, resetString } = useParams();
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState("");

    const userResetPasswordReducer = useSelector((state) => state.userResetPasswordReducer);
    const { loading, error, successMessage } = userResetPasswordReducer;

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Création de l'instance useNavigate

    // Gestion des erreurs et redirection en cas de succès
    useEffect(() => {
        if (error && error !== localError) {
            setLocalError(error);
        }
        if (successMessage) {
            navigate("/reset-password-confirmation"); // Redirige vers la nouvelle page de confirmation
        }
    }, [error, successMessage, navigate, localError]);

    // Réinitialiser les messages lors du montage et démontage du composant
    useEffect(() => {
        dispatch(resetMessages()); // Réinitialiser les messages au montage du composant
  
        return () => {
            dispatch(resetMessages()); // Réinitialiser les messages lors du démontage du composant
        };
    }, [dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        setLocalError("");
        dispatch(userResetPasswordAction(userId, resetString, password));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                
                <form onSubmit={submitHandler}>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                            Enter a new password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="••••••••"
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {localError && (
                            <p className="text-red-500 text-sm mt-2">{localError}</p>
                        )}
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        disabled={loading} // Désactiver le bouton si le chargement est en cours
                    >
                        {loading ? "Loading..." : "Reset my password"}
                    </button>
                </form>
                
                {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;
