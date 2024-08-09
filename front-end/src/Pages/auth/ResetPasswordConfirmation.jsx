import React from 'react';
import { Link } from 'react-router-dom';

function ResetPasswordConfirmation() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-6">Password Reset Successful</h2>
                <p className="text-gray-700 mb-4">
                    Your password has been successfully reset. You can now log in with your new password.
                </p>
                <Link to="/login">
                    <button
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Go to Login
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ResetPasswordConfirmation;
