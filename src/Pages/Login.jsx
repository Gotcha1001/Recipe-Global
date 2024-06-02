import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import FoodImage from '/Food.jpg';

export default function Login({ updateUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            updateUser(currentUser);
            setUser(currentUser);
            if (currentUser) {
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, [updateUser, navigate]);

    async function handleSignUp() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    async function handleSignIn() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    async function SignInWithGoogle() {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    async function logout() {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen relative">
            <div className="absolute inset-0" style={{ backgroundImage: `url(${FoodImage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(1px)' }}></div>
            <div className="bg-black p-4 md:p-8 rounded-lg relative hover:bg-transparent" style={{ width: '80%', maxWidth: '400px', margin: 'auto', boxShadow: '0 0 5px 2px rgba(255, 255, 255, 0.5)' }}>
                <input className="px-4 py-2 border rounded mb-4 w-full"
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input className="px-4 py-2 border rounded mb-4 w-full"
                    placeholder="Password..."
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={isRegistering ? handleSignUp : handleSignIn} className="px-6 py-3 text-lg text-white rounded-md bg-red-800 hover:bg-red-500 w-full mb-2">
                    {isRegistering ? 'Register' : 'Sign In'}
                </button>
                <button onClick={SignInWithGoogle} className="px-6 py-3 text-lg text-white rounded-md bg-red-800 hover:bg-red-500 w-full mb-2">Sign In with Google</button>
                {user ? (
                    <button onClick={logout} className="px-6 py-3 text-lg text-white rounded-md bg-red-800 hover:bg-red-500 w-full">Logout</button>
                ) : (
                    <button onClick={() => setIsRegistering(!isRegistering)} className="px-6 py-3 text-lg text-white rounded-md bg-red-800 hover:bg-red-500 w-full">
                        {isRegistering ? 'Already have an account? Sign In' : 'Don’t have an account? Register'}
                    </button>
                )}
                <div className="absolute inset-0 rounded-lg border border-white border-opacity-20" style={{ pointerEvents: 'none' }}></div>
            </div>
        </div>
    );
}
