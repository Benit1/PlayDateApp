import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {JSX, useEffect, useState} from "react";
import LoginScreen from "./components/Login_Screen";
import LevelsScreen from "./components/LevelsScreen";

const App: () => JSX.Element = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(authStatus);
    }, []);

    return (
        <Router>
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <Routes>
                    {/* Login Screen (default page) */}
                    <Route path="/" element={<LoginScreen />} />

                    {/* Protected Route for Levels */}
                    <Route
                        path="/levels"
                        element={
                            isAuthenticated ? <LevelsScreen /> : <Navigate to="/" replace />
                        }
                    />

                    {/* Redirect unknown paths to login */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
