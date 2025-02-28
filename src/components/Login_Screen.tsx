import { useState } from "react";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRequestOtp = async () => {
        setError("");
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8010/request-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error("Failed to send Password. Please check your email.");
            }

            alert("Password sent to your email!");
            setStep(2);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setError("");
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8010/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            if (!response.ok) {
                throw new Error("Invalid Password. Please try again.");
            }

            alert("Login successful!");
            localStorage.setItem("isAuthenticated", "true"); // Store login state
        } catch (err: any) {
            setError(err.message);
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
                            className="p-4 w-full bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 text-white text-xl"
                        />
                        <button
                            onClick={handleRequestOtp}
                            className="bg-blue-600 text-white py-3 text-xl font-bold rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg w-full mt-6"
                            disabled={loading}
                        >
                            {loading ? "Sending Password..." : "Login"}
                        </button>
                    </div>
                ) : (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Password"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="p-4 w-full bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500 text-white text-xl"
                        />
                        <button
                            onClick={handleVerifyOtp}
                            className="bg-green-600 text-white py-3 text-xl font-bold rounded-xl hover:bg-green-700 transition duration-300 shadow-lg w-full mt-6"
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify Password"}
                        </button>
                    </div>
                )}

                <p className="text-center text-lg text-gray-400 mt-8">
                    Didn't receive an Password?{" "}
                    <button onClick={handleRequestOtp} className="text-blue-400 hover:underline">
                        Resend Password
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;
