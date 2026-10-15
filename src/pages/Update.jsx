import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { DEFAULT_TOPICS } from '../data/defaultTopics';
import { Lock, Save, HelpCircle } from 'lucide-react';

export default function Update() {
  const [code, setCode] = useState('');
  const [topics, setTopics] = useState(DEFAULT_TOPICS);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch('/api/topics')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTopics(data);
        }
      })
      .catch(() => setTopics(DEFAULT_TOPICS));
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (code === '3054') {
      setIsAuthorized(true);
    } else {
      alert('Invalid Access Code');
    }
  };

  const updateTopic = (index, field, value) => {
    setTopics((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, topics }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors || {});
        alert(data.errors?.code || 'Failed to save settings.');
        return;
      }
      alert('Settings updated successfully!');
    } catch {
      alert('Failed to save settings.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Update | MPL Battle Trips</title>
      </Helmet>
      <Layout>
        <div
          className="relative z-50 min-h-screen flex flex-col items-center justify-center text-white p-4 pt-5 font-['Montserrat'] bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: 'url(/BTMPLS17-BG.png)', backgroundAttachment: 'fixed' }}
        >
          <img src="/BTLogo.png" alt="Battle Trips Logo" className="w-48 mb-6" />
          <div className="w-full max-w-3xl">
            {!isAuthorized ? (
              <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border-2 border-[#e59639] text-black">
                <div className="flex items-center justify-center w-16 h-16 bg-[#e59639]/10 rounded-full mx-auto mb-6">
                  <Lock className="text-[#e59639]" size={32} />
                </div>
                <h1 className="text-2xl font-bold text-center mb-2">Restricted Access</h1>
                <p className="text-gray-500 text-center mb-8 text-sm px-2">Please enter the security code to update event settings.</p>
                <form onSubmit={handleAuth} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-gray-700">Security Code</label>
                    <input
                      type="password"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter 4-digit code"
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-[#e59639] outline-none text-center text-2xl tracking-[1em] font-mono"
                      maxLength={4}
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#e59639] hover:bg-[#d47f20] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#e59639]/20 transition-all active:scale-95">
                    Authorize Access
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border-2 border-[#e59639] text-black">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-bold">Update Content</h1>
                  <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">Authorized</div>
                </div>
                <form onSubmit={submit} className="space-y-6">
                  <div className="text-center mb-6 px-2">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <HelpCircle size={18} className="text-[#e59639]" />
                      <h2 className="text-lg font-bold uppercase tracking-widest">Topics Configuration</h2>
                    </div>
                    <p className="text-sm text-gray-500">Manage the topic dropdown options and status for the public registration form.</p>
                  </div>
                  {topics.map((topic, index) => (
                    <div key={`${topic.name}-${index}`} className="border border-solid border-[#e59639] rounded-2xl p-5 sm:p-6 bg-gray-50">
                      <div className="grid gap-5 sm:grid-cols-[1fr_150px] mb-5">
                        <div>
                          <label className="text-sm font-bold uppercase tracking-wider text-gray-700">Topic Name</label>
                          <input type="text" value={topic.name} onChange={(e) => updateTopic(index, 'name', e.target.value)} className="w-full mt-2 px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#e59639] outline-none" />
                        </div>
                        <div>
                          <label className="text-sm font-bold uppercase tracking-wider text-gray-700">Status</label>
                          <select value={topic.status} onChange={(e) => updateTopic(index, 'status', e.target.value)} className="w-full mt-2 px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#e59639] outline-none bg-white">
                            <option value="OPEN">OPEN</option>
                            <option value="FULL">FULL</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-bold uppercase tracking-wider text-gray-700">Description</label>
                        <textarea value={topic.description} onChange={(e) => updateTopic(index, 'description', e.target.value)} rows={4} className="w-full mt-2 px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#e59639] outline-none resize-none" />
                      </div>
                    </div>
                  ))}
                  {errors.topics && <p className="text-red-500 text-sm">{errors.topics}</p>}
                  <button type="submit" disabled={processing} className="w-full bg-[#e59639] hover:bg-[#d47f20] disabled:bg-gray-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                    <Save size={20} />
                    {processing ? 'Saving Changes...' : 'Publish Updates'}
                  </button>
                  <button type="button" onClick={() => setIsAuthorized(false)} className="w-full text-gray-400 text-sm hover:text-gray-600">
                    Log Out from Editor
                  </button>
                </form>
              </div>
            )}
          </div>
          <Link to="/" className="mt-8 text-black/60 hover:text-black text-sm font-medium border-b border-transparent hover:border-black/30">
            View Public Page
          </Link>
        </div>
      </Layout>
    </>
  );
}
