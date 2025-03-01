import { useEffect, useState } from "react";

interface Level {
    id: number;
    name: string;
}

const LevelsScreen = () => {
    const [levels, setLevels] = useState<Level[]>([]);
    {/*   const [loading] = useState(true); */}
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLevels = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8010/levels");
                if (!response.ok) {
                    throw new Error("Failed to fetch levels");
                }
                const data = await response.json();
                setLevels(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            }
        };

        fetchLevels();
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-6">
            <div className="bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center">
                <h1 className="text-5xl font-bold text-white mb-6">Select a Level</h1>

                {/* {loading && <p className="text-lg text-gray-300">Loading levels...</p>} */}
                {error && <p className="text-red-500 text-lg">{error}</p>}

                <div className="space-y-6">
                    {levels.map((level) => (
                        <button
                            key={level.id}
                            className="w-full bg-blue-600 py-4 text-2xl font-semibold rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg"
                            onClick={() => alert(`Selected ${level.name}`)}
                        >
                            {level.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LevelsScreen;