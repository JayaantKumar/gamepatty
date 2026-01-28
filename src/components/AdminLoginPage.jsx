import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase'; // Import from your firebase file

const AdminLoginPage = () => {
    const login = useLogin();
    const notify = useNotify();
    const [loading, setLoading] = useState(false);

    // === CONFIG: List of emails allowed to access the Admin Panel ===
    const allowedEmails = [
        "developer.sbgames@gmail.com",
        "jayantk4041@gmail.com" // <--- Add your 2nd email here
    ];
    // ==============================================================

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            // 1. Open the Google Pop-up
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // 2. SECURITY CHECK:
            // Check if the email is in our allowed list.
            if (!allowedEmails.includes(user.email)) {
                await auth.signOut();
                throw new Error("Unauthorized email");
            }

            // 3. Tell React-Admin we are logged in
            await login({ user }); 
        } catch (error) {
            console.error("Login Failed:", error);
            
            // === THE FIX ===
            // Safely check if error exists before reading .message
            const errorMessage = error?.message || "Popup closed or network error";
            
            notify(errorMessage === "Unauthorized email" 
                ? "Access Denied: You are not an authorized admin." 
                : "Google Sign-In Failed: " + errorMessage
            );
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden">
                <div className="p-8 text-center">
                    <h2 className="text-3xl font-black text-gray-800 mb-2 uppercase">Admin Panel</h2>
                    <p className="text-gray-500 mb-8">Sign in to manage GamePatty</p>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-lg transition-all shadow-sm"
                    >
                        {/* Google Icon SVG */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        {loading ? "Signing in..." : "Sign in with Google"}
                    </button>
                    
                    <p className="mt-6 text-xs text-gray-400">
                        Protected by Firebase Security
                    </p>
                </div>
                <div className="bg-gray-100 p-4 text-center border-t border-gray-200">
                    <span className="text-sm text-gray-500">Authorized Personnel Only</span>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;