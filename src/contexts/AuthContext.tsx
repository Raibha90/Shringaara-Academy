import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, query, collection, where, getDocs, deleteDoc } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  name?: string;
  profilePic?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // 1. Check if user already exists by UID
        let userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        } else {
          // 2. Check if an "invited" user exists with this email
          const q = query(collection(db, 'users'), where('email', '==', user.email));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            // Link invited user to this UID
            const invitedDoc = querySnapshot.docs[0];
            const invitedData = invitedDoc.data();
            const updatedProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              role: invitedData.role || 'student',
              name: user.displayName || invitedData.name || '',
              profilePic: user.photoURL || invitedData.profilePic || '',
            };
            
            // Delete old invited doc (if it had a different key) and create new one with UID
            if (invitedDoc.id !== user.uid) {
              await deleteDoc(doc(db, 'users', invitedDoc.id));
            }
            await setDoc(doc(db, 'users', user.uid), { ...updatedProfile, status: 'active' });
            setProfile(updatedProfile);
          } else {
            // 3. Create fresh student profile
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              role: 'student',
              name: user.displayName || '',
              profilePic: user.photoURL || '',
            };
            await setDoc(doc(db, 'users', user.uid), { ...newProfile, status: 'active' });
            setProfile(newProfile);
          }
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
