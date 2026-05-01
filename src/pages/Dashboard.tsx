import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Settings, Users, ShoppingBag, BookOpen, Mic, CreditCard } from 'lucide-react';

export default function Dashboard() {
  const { isAdmin, user } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [stats, setStats] = useState({ users: 0, products: 0, courses: 0, mentors: 0 });

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    const usersSnap = await getDocs(collection(db, 'users'));
    const productsSnap = await getDocs(collection(db, 'products'));
    const coursesSnap = await getDocs(collection(db, 'courses'));
    const mentorsSnap = await getDocs(collection(db, 'mentors'));
    
    setStats({
      users: usersSnap.size,
      products: productsSnap.size,
      courses: coursesSnap.size,
      mentors: mentorsSnap.size,
    });
  };

  if (!isAdmin) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-2xl font-serif mb-4">Access Denied</h1>
        <p className="text-gray-500">You must be an administrator to view this page.</p>
        {!user && <p className="mt-4 text-sm font-medium text-[#5A5A40]">Please sign in first.</p>}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-serif mb-12">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatCard icon={<Users />} label="Total Users" value={stats.users} color="bg-blue-50 text-blue-600" />
        <StatCard icon={<ShoppingBag />} label="Products" value={stats.products} color="bg-green-50 text-green-600" />
        <StatCard icon={<BookOpen />} label="Courses" value={stats.courses} color="bg-orange-50 text-orange-600" />
        <StatCard icon={<Mic />} label="Mentors" value={stats.mentors} color="bg-purple-50 text-purple-600" />
      </div>

      <div className="flex gap-8 border-b mb-8 overflow-x-auto whitespace-nowrap">
        {['Overview', 'Orders', 'Users', 'Inventory', 'Settings'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 font-medium transition-colors ${activeTab === tab ? 'border-b-2 border-[#5A5A40] text-[#5A5A40]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border rounded-lg p-8">
        {activeTab === 'Overview' && (
          <div>
            <h3 className="text-xl font-serif mb-6">Recent Activity</h3>
            <p className="text-gray-500 italic">No recent transactions found.</p>
          </div>
        )}
        {activeTab === 'Orders' && (
          <div>
             <h3 className="text-xl font-serif mb-6">Manage Orders</h3>
             <p className="text-gray-500 italic">Payment integration active. Check Razorpay Dashboard for full logs.</p>
          </div>
        )}
        {activeTab === 'Users' && (
          <UsersManagement />
        )}
        {activeTab === 'Settings' && (
          <SiteSettingsManagement />
        )}
      </div>
    </div>
  );
}

function SiteSettingsManagement() {
  const [settings, setSettings] = useState<any>({ siteName: '', tagline: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, 'settings', 'general');
      const snap = await getDocs(query(collection(db, 'settings'))); // Just to keep it consistent
      const generalDoc = snap.docs.find(d => d.id === 'general');
      
      if (generalDoc) {
        setSettings(generalDoc.data());
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleUpdateText = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'settings', 'general');
      await setDoc(docRef, {
        ...settings,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      alert("Settings updated!");
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        let targetWidth = type === 'logo' ? 400 : 64; 
        let targetHeight = (img.height / img.width) * targetWidth;
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        const base64 = canvas.toDataURL('image/png');
        
        const docRef = doc(db, 'settings', 'general');
        setDoc(docRef, {
          [`${type}Base64`]: base64,
          updatedAt: new Date().toISOString()
        }, { merge: true }).then(() => {
          setSettings((prev: any) => ({ ...prev, [`${type}Base64`]: base64 }));
        });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-serif mb-8">Global Site Branding</h3>
      
      <form onSubmit={handleUpdateText} className="space-y-6 mb-12">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Site Name</label>
          <input 
            type="text" 
            className="w-full border p-3 rounded bg-gray-50 focus:bg-white transition-all"
            value={settings.siteName}
            onChange={e => setSettings({...settings, siteName: e.target.value})}
            placeholder="Shringaara House Academy"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Tagline</label>
          <input 
            type="text" 
            className="w-full border p-3 rounded bg-gray-50 focus:bg-white transition-all"
            value={settings.tagline}
            onChange={e => setSettings({...settings, tagline: e.target.value})}
            placeholder="Tradition, retold by hand."
          />
        </div>
        <button type="submit" className="bg-[#306C69] text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-xs">
          Save Text Changes
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-6 border border-dashed rounded-xl bg-gray-50">
          <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Main Logo</h4>
          {settings.logoBase64 && (
            <div className="mb-4 p-4 bg-white rounded border flex justify-center">
              <img src={settings.logoBase64} alt="Current Logo" className="max-h-20 object-contain" />
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={e => handleImageUpload(e, 'logo')}
            className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#5A5A40] file:text-white hover:file:bg-[#306C69]"
          />
          <p className="text-[10px] text-gray-400 mt-2">Recommended: PNG / SVG with transparent background</p>
        </div>

        <div className="p-6 border border-dashed rounded-xl bg-gray-50">
          <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Favicon</h4>
          {settings.faviconBase64 && (
            <div className="mb-4 p-4 bg-white rounded border flex justify-center">
              <img src={settings.faviconBase64} alt="Current Favicon" className="w-8 h-8 object-contain" />
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={e => handleImageUpload(e, 'favicon')}
            className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#5A5A40] file:text-white hover:file:bg-[#306C69]"
          />
          <p className="text-[10px] text-gray-400 mt-2">Recommended: 64x64px square icon</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: any, label: string, value: number, color: string }) {
  return (
    <div className="bg-white border p-6 rounded-lg flex items-center gap-4 shadow-sm">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{label}</p>
        <p className="text-2xl font-bold text-[#333]">{value}</p>
      </div>
    </div>
  );
}

function UsersManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const q = query(collection(db, 'users'));
    const snap = await getDocs(q);
    setUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, this would trigger an email/SMS invite
      const userRef = doc(collection(db, 'users'));
      await setDoc(userRef, {
        ...newUser,
        uid: userRef.id,
        createdAt: new Date().toISOString(),
        status: 'pending_activation'
      });
      alert(`User ${newUser.name} created as ${newUser.role}. Activation link "sent" to ${newUser.email}`);
      setShowAddUser(false);
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-serif text-[#333]">User Management</h3>
        <button 
          onClick={() => setShowAddUser(true)}
          className="bg-[#306C69] text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#204a48] transition-colors"
        >
          Add User
        </button>
      </div>

      {showAddUser && (
        <div className="bg-gray-50 border p-6 rounded-lg mb-8">
          <h4 className="font-bold mb-4">Create New Account (Teacher/Parent/Student)</h4>
          <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="border p-2 rounded" 
              value={newUser.name}
              onChange={e => setNewUser({...newUser, name: e.target.value})}
              required
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="border p-2 rounded" 
              value={newUser.email}
              onChange={e => setNewUser({...newUser, email: e.target.value})}
              required
            />
            <select 
              className="border p-2 rounded"
              value={newUser.role}
              onChange={e => setNewUser({...newUser, role: e.target.value as any})}
            >
              <option value="student">Student/Customer</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="admin">Admin</option>
            </select>
            <div className="md:col-span-3 flex justify-end gap-2 mt-4">
              <button 
                type="button" 
                onClick={() => setShowAddUser(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-[#5A5A40] text-white px-6 py-2 rounded font-bold uppercase tracking-widest text-xs"
              >
                Create Invite
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-sm text-gray-400">
              <th className="pb-4 font-normal">Name</th>
              <th className="pb-4 font-normal">Email</th>
              <th className="pb-4 font-normal">Role</th>
              <th className="pb-4 font-normal">Status</th>
              <th className="pb-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map(u => (
              <tr key={u.id} className="text-sm group">
                <td className="py-4 font-medium text-[#333]">{u.name || 'Anonymous'}</td>
                <td className="py-4 text-gray-500">{u.email}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    u.role === 'admin' ? 'bg-red-50 text-red-600' : 
                    u.role === 'teacher' ? 'bg-blue-50 text-blue-600' :
                    u.role === 'parent' ? 'bg-purple-50 text-purple-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`text-[10px] font-bold uppercase ${u.status === 'pending_activation' ? 'text-orange-500' : 'text-green-500'}`}>
                    {u.status === 'pending_activation' ? 'Invited' : 'Active'}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-gray-400 hover:text-[#333] transition-colors p-2"><Settings size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
