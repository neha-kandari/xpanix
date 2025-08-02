import React, { useState, useEffect } from 'react';
import { useAuthUser } from '../hooks/useAuthUser';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, User as UserIcon, Mail, Phone, Calendar, Settings, LogOut } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  phone: string;
  createdAt?: string;
  lastLogin?: string;
}

export default function Profile() {
  const { user } = useAuthUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            name: data.name || user.displayName || 'N/A',
            email: data.email || user.email || 'N/A',
            phone: data.phone || 'N/A',
            createdAt: data.createdAt,
            lastLogin: data.lastLogin
          });
          setEditForm({
            name: data.name || user.displayName || '',
            phone: data.phone || ''
          });
        } else {
          // If no Firestore data, use Firebase Auth data
          setUserData({
            name: user.displayName || 'N/A',
            email: user.email || 'N/A',
            phone: 'N/A',
            createdAt: user.metadata.creationTime,
            lastLogin: user.metadata.lastSignInTime
          });
          setEditForm({
            name: user.displayName || '',
            phone: ''
          });
        }
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setError(null);
      
      // Update Firebase Auth display name
      await updateProfile(user, {
        displayName: editForm.name
      });

      // Update Firestore data
      await updateDoc(doc(db, 'users', user.uid), {
        name: editForm.name,
        phone: editForm.phone,
        updatedAt: new Date().toISOString()
      });

      // Update local state
      setUserData(prev => prev ? {
        ...prev,
        name: editForm.name,
        phone: editForm.phone
      } : null);

      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.href = '/';
    } catch (err) {
      setError('Failed to sign out');
      console.error('Error signing out:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-32">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
              <p className="text-gray-300 mb-6">You need to be logged in to view your profile.</p>
              <Link to="/login" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-gray-400 hover:text-white transition">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-3xl font-bold text-white">My Profile</h1>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {error && (
            <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-2">
              <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <Edit className="w-4 h-4" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Full Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <UserIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Full Name</p>
                        <p className="text-white font-medium">{userData?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Email Address</p>
                        <p className="text-white font-medium">{userData?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Phone Number</p>
                        <p className="text-white font-medium">{userData?.phone}</p>
                      </div>
                    </div>
                    {userData?.createdAt && (
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-gray-400 text-sm">Member Since</p>
                          <p className="text-white font-medium">
                            {new Date(userData.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    to="/contact"
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition"
                  >
                    <Settings className="w-5 h-5 text-blue-400" />
                    <span className="text-white">Contact Support</span>
                  </Link>
                  <Link
                    to="/services"
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition"
                  >
                    <UserIcon className="w-5 h-5 text-green-400" />
                    <span className="text-white">View Services</span>
                  </Link>
                  <Link
                    to="/portfolio"
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition"
                  >
                    <UserIcon className="w-5 h-5 text-purple-400" />
                    <span className="text-white">View Portfolio</span>
                  </Link>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Account Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Email Verified</span>
                    <span className={`px-2 py-1 rounded text-xs ${user.emailVerified ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                      {user.emailVerified ? 'Verified' : 'Not Verified'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Last Login</span>
                    <span className="text-white text-sm">
                      {userData?.lastLogin ? new Date(userData.lastLogin).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 