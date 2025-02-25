import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

const LoginScreen = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "user@example.com" && password === "password123") {
            alert("Login successful!");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white p-6">
            <div className="bg-gray-800 p-14 rounded-3xl shadow-2xl w-full max-w-lg text-center">
                <h2 className="text-5xl font-extrabold text-white mb-10">Sign In</h2>
                {error && <p className="text-red-500 text-lg text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="flex flex-col space-y-8">
                    <div className="relative">
                        <FaUser className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-14 p-5 w-full bg-gray-700 border border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 text-white text-xl"
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="pl-14 p-5 w-full bg-gray-700 border border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 text-white text-xl"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-4 text-xl font-bold rounded-2xl hover:bg-blue-700 transition duration-300 shadow-lg w-full"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-lg text-gray-400 mt-8">
                    Don't have an account?{' '}
                    <a href="#" className="text-blue-400 hover:underline text-xl">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;