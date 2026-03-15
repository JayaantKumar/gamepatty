import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth, googleProvider } from '../firebase'; 
// 1. Import Eye Icons
import { FaEye, FaEyeSlash } from "react-icons/fa6"; 

const AdminLoginPage = () => {
    const login = useLogin();
    const notify = useNotify();
    const [loading, setLoading] = useState(false);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // 2. New State for Password Visibility
    const [showPassword, setShowPassword] = useState(false);

    // === CONFIG: Allowed Admins ===
    const allowedEmails = [
        "developer.sbgames@gmail.com",
        "second.admin@gmail.com",
        "jayantk4041@gmail.com"
    ];

    const checkSecurity = async (user) => {
        if (!allowedEmails.includes(user.email)) {
            await auth.signOut();
            throw new Error("Unauthorized email");
        }
        await login({ user });
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await checkSecurity(result.user);
        } catch (error) {
            console.error("Google Login Failed:", error);
            const msg = error?.message || "Unknown Error";
            
            // Fix for the crash if error.message is missing
            notify(msg === "Unauthorized email" ? "Access Denied" : "Login Failed: " + msg);
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            await checkSecurity(result.user);
        } catch (error) {
            console.error("Email Login Failed:", error);
            // Show a friendly error message
            notify("Login Failed: Incorrect email or password.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-gray-800 uppercase">Admin Panel</h2>
                        <p className="text-gray-500">Authorized Personnel Only</p>
                    </div>

                    {/* === EMAIL FORM === */}
                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                                placeholder="admin@gamepatty.com"
                            />
                        </div>
                        
                        {/* === PASSWORD FIELD WITH EYE ICON === */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <div className="relative">
                                <input 
                                    // 3. Toggle type between text and password
                                    type={showPassword ? "text" : "password"} 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors pr-10" // pr-10 makes room for icon
                                    placeholder="••••••••"
                                />
                                {/* 4. The Toggle Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all shadow-md"
                        >
                            {loading ? "Verifying..." : "Login"}
                        </button>
                    </form>

                    <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* === GOOGLE BUTTON === */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-lg transition-all shadow-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Sign in with Google
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;