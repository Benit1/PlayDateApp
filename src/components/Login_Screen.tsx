import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1); // 1 = Enter Email, 2 = Enter Password
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRequestPassword = async () => {
        setError("");
        setLoading(true);

        try {
            console.log("Requesting password for:", email); // Debugging log
            const response = await fetch("http://127.0.0.1:8010/request-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error("Failed to send password. Please check your email.");
            }

            alert("Password sent to your email!");
            setStep(2);
        } catch (err: unknown) {
            console.error("Error requesting password:", err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyPassword = async () => {
        setError("");
        setLoading(true);

        try {
            console.log("Verifying password for:", email);
            const response = await fetch("http://127.0.0.1:8010/verify-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            console.log("Response received:", response);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Invalid password.");
            }

            alert("Login successful!");
            localStorage.setItem("isAuthenticated", "true");
            navigate("/levels");
        } catch (err: unknown) {
            console.error("Password verification failed:", err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
            <div className="bg-gray-800 p-12 rounded-3xl shadow-2xl w-full max-w-lg text-center">

                {/* Title */}
                <h1 className="text-6xl font-bold text-white mb-6">PlayDate</h1>
                <h2 className="text-3xl font-semibold text-gray-300 mb-10">
                    {step === 1 ? "Sign In with Email" : "Enter Password"}
                </h2>

                {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

                {step === 1 ? (
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-4 w-full bg-gray-700 border border-gray-600 rounded-xl text-white text-xl"
                        />
                        <button
                            onClick={handleRequestPassword}
                            className="bg-blue-600 text-white py-3 text-xl font-bold rounded-xl hover:bg-blue-700 transition duration-300 w-full mt-6"
                            disabled={loading}
                        >
                            {loading ? "Sending Password..." : "Request Password"}
                        </button>
                    </div>
                ) : (
                    <div>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="p-4 w-full bg-gray-700 border border-gray-600 rounded-xl text-white text-xl"
                        />
                        <button
                            onClick={handleVerifyPassword}
                            className="bg-green-600 text-white py-3 text-xl font-bold rounded-xl hover:bg-green-700 transition duration-300 w-full mt-6"
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify Password"}
                        </button>
                    </div>
                )}

                <p className="text-center text-lg text-gray-400 mt-8">
                    Didn't receive a password?{" "}
                    <button onClick={handleRequestPassword} className="text-blue-400 hover:underline">
                        Resend Password
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;
