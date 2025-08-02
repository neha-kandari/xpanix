import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User as FirebaseUser } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Check Firestore for phone number
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists() || !userDoc.data().phone) {
        setGoogleUser(user);
        setShowPhoneModal(true);
      } else {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/");
        }, 1500);
      }
    } catch (err: unknown) {
      console.error("Google Sign-In Error:", err);
      const error = err as any;
      if (error.code === 'auth/popup-closed-by-user') {
        setError("Sign-in was cancelled. Please try again.");
      } else if (error.code === 'auth/popup-blocked') {
        setError("Popup was blocked by your browser. Please allow popups and try again.");
      } else if (error.code === 'auth/auth-domain-config-required') {
        setError("Google Sign-In is not properly configured. Please contact support.");
      } else if (error.code === 'auth/operation-not-allowed') {
        setError("Google Sign-In is not enabled. Please contact support.");
      } else if (error.code === 'auth/unauthorized-domain') {
        setError("This domain is not authorized for Google Sign-In.");
      } else {
        setError(`Sign-in failed: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (googleUser) {
      await setDoc(doc(db, "users", googleUser.uid), {
        phone: phone,
        name: googleUser.displayName,
        email: googleUser.email,
      }, { merge: true });
      setShowPhoneModal(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 1500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-black bg-opacity-60 rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gray-800 rounded-full p-3 mb-2">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-gray-400 text-sm">Sign in with Google or Email</p>
        </div>
        <div className="flex justify-center mb-4">
          <button
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full flex items-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <g>
                <path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3C34.7 32.1 29.8 35 24 35c-6.1 0-11.3-4.1-13.1-9.6s-.3-11.3 4.6-14.7c4.9-3.4 11.5-2.7 15.7 1.6l6.2-6.2C33.1 2.1 28.7 0 24 0 10.7 0 0 10.7 0 24s10.7 24 24 24c12.2 0 22.3-9.3 23.8-21.2.1-.7.2-1.3.2-2 0-1.3-.1-2.5-.4-3.7z"/>
                <path fill="#34A853" d="M6.3 14.6l6.6 4.8C14.5 16.1 19 13 24 13c3.1 0 6 .9 8.3 2.6l6.2-6.2C34.7 4.1 29.8 1 24 1 14.1 1 5.7 7.6 2.1 16.1l6.2-1.5z"/>
                <path fill="#FBBC05" d="M24 47c5.8 0 11.1-2.2 15.2-5.8l-7.1-5.8C29.8 37.9 27 39 24 39c-5 0-9.5-3.1-11.3-7.6l-6.6 5.1C5.7 40.4 14.1 47 24 47z"/>
                <path fill="#EA4335" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-4.1 5.5-7.3 6.2l7.1 5.8C41.7 36.2 44 30.6 44 24c0-1.3-.1-2.5-.4-3.7z"/>
              </g>
            </svg>
            <span className="text-white">Sign in with Google</span>
          </button>
        </div>
        <div className="flex items-center mb-4">
          <div className="flex-grow h-px bg-gray-700" />
          <span className="mx-2 text-gray-500 text-xs">OR</span>
          <div className="flex-grow h-px bg-gray-700" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email..."
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-400 text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="********"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end mb-4">
            <a href="#" className="text-xs text-gray-400 hover:underline">Forgot Password?</a>
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 rounded bg-gray-700 text-white font-semibold hover:bg-gray-600 transition"
          >
            Sign in
          </button>
        </form>
        <div className="mt-4 text-center text-gray-400 text-sm">
          Don&apos;t have an account yet?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link>
        </div>
      </div>
      {/* Phone number modal for Google sign-in */}
      {showPhoneModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold text-white mb-4">Enter your phone number</h3>
            <form onSubmit={handlePhoneSubmit}>
              <input
                type="tel"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500 mb-4"
                placeholder="Enter your phone number..."
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
              <button
                type="submit"
                className="w-full py-2 rounded bg-gray-700 text-white font-semibold hover:bg-gray-600 transition"
              >
                Save Phone Number
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Success popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-green-600 p-6 rounded-lg shadow-lg w-full max-w-sm flex flex-col items-center">
            <svg className="w-10 h-10 text-white mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white text-lg font-semibold">Sign in successful!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm; 