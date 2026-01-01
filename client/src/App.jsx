import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Animation library
import Countdown from './components/Countdown'; // Our new timer

function App() {
  const [capsules, setCapsules] = useState([]);
  // Form State
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [unlockDate, setUnlockDate] = useState('');

  // 1. FETCH CAPSULES
  const fetchCapsules = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/capsules');
      setCapsules(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchCapsules(); }, []);

  // 2. HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title || !message || !unlockDate) return alert("Fill all fields");
    
    await axios.post('http://localhost:5000/api/capsules', {
      title, message, unlockDate
    });
    
    // Reset form and refresh list
    setTitle(''); setMessage(''); setUnlockDate('');
    fetchCapsules();
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem' }}>CHRONOS</h1>
        <p>Time is the only currency.</p>
      </header>

      {/* CREATE FORM */}
      <div style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid #333' }}>
        <h2>+ Encapsulate a Memory</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Title (e.g., Graduation Day)" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder="Write your future message..." rows="4" value={message} onChange={e => setMessage(e.target.value)} />
          <p style={{marginBottom: '5px'}}>Unlock Date:</p>
          <input type="datetime-local" value={unlockDate} onChange={e => setUnlockDate(e.target.value)} />
          <button type="submit">SEAL CAPSULE</button>
        </form>
      </div>

      {/* VAULT DISPLAY */}
      <main>
        <h2>Your Vault</h2>
        {capsules.length === 0 ? <p>The vault is empty.</p> : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {capsules.map(cap => (
  <motion.div 
    key={cap._id}
    initial={{ opacity: 0, y: 20 }}     // Start invisible and slightly down
    animate={{ opacity: 1, y: 0 }}      // Fade in and slide up
    transition={{ duration: 0.5 }}      // Take 0.5 seconds
    style={{ background: 'var(--card-bg)', padding: '20px', border: '1px solid #333' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{cap.title}</h3>
                {/* If message is locked, show padlock icon */}
                {cap.message.includes('🔒') && <span style={{fontSize: '1.5rem'}}>🔒</span>}
              </div>

              {/* LOGIC: If locked, show Countdown. If unlocked, show Date. */}
              {cap.message.includes('🔒') ? (
                <Countdown targetDate={cap.unlockDate} />
              ) : (
                <small style={{color: '#888'}}>Unlocked on {new Date(cap.unlockDate).toLocaleDateString()}</small>
              )}
              
              <div style={{ marginTop: '15px', padding: '10px', background: cap.message.includes('🔒') ? '#1a1a1a' : 'rgba(212, 175, 55, 0.1)' }}>
                {cap.message}
              </div>
            </motion.div>
          ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;