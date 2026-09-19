import React, { useState } from 'react';
import styles from './WhatsAppSimulator.module.css';

const PRESET_FLOWS = {
  welcome: [
    { sender: 'bot', text: '👋 Welcome to Mobimo! I am your educational WhatsApp companion for postpartum physical recovery and health support.' },
    { sender: 'bot', text: '📌 *Important*: Mobimo provides educational health guidance and does not replace a doctor. In an emergency, please visit the nearest health facility.' },
    { sender: 'bot', text: 'How can Mobimo assist you today?\n\n1. Postpartum recovery check-in\n2. Ask a health question\n3. Red-flag safety demo\n4. Request personal health report' }
  ],
  checkin: [
    { sender: 'user', text: '1. Postpartum recovery check-in' },
    { sender: 'bot', text: '🌸 Let\'s do a quick recovery check-in.\n\nFirst: How is your bleeding today?\n\n1. Normal light pink / brown discharge\n2. Heavy bleeding (soaking 1+ pad an hour)\n3. No bleeding' },
    { sender: 'user', text: '1. Normal light pink discharge' },
    { sender: 'bot', text: 'Thank you for tracking. Next: On a scale of 1 to 10, how is your belly pain today?' },
    { sender: 'user', text: '2 - Mild cramping' },
    { sender: 'bot', text: '✅ Recovery check-in complete!\n\nYour bleeding pattern is normal for your recovery stage. Mild belly cramping during feeding is common as your body heals.\n\nType *REPORT* anytime to generate your recovery summary.' }
  ],
  safety: [
    { sender: 'user', text: 'I have a high fever of 38.6°C and bad shivering' },
    { sender: 'bot', text: '🚨 *SAFETY ALERT - IMMEDIATE ATTENTION NEEDED*\n\nA high fever above 38°C after childbirth is a warning sign that needs a doctor\'s check.' },
    { sender: 'bot', text: '⚠️ *Urgent Guidance*:\n1. Please visit the nearest hospital or health clinic (e.g., LUTH or General Hospital) immediately.\n2. Stay hydrated and rest.\n\nWould you like Mobimo to share a short recovery summary with your registered care provider?' },
    { sender: 'user', text: 'Yes, please share summary' },
    { sender: 'bot', text: '🔒 *Consent Recorded*: A minimum-necessary structured referral has been created for Lagos University Teaching Hospital (Ref ID: #REF-2026-0891). A care coordinator will follow up.' }
  ],
  question: [
    { sender: 'user', text: 'How do I relieve breast swelling and soreness while feeding?' },
    { sender: 'bot', text: '🤱 *Breastfeeding Support*\n\nBreast swelling is common in the first few days as milk comes in. Here are gentle steps to help:\n\n• Apply a warm towel for 2 minutes before feeding.\n• Help baby latch comfortably over the dark part of the breast.\n• Gently express a little milk by hand if your breast is too firm.\n• Use a cool cloth after feeding to reduce soreness.' }
  ]
};

export default function WhatsAppSimulator({ onClose }) {
  const [messages, setMessages] = useState(PRESET_FLOWS.welcome);
  const [userInput, setUserInput] = useState('');

  const handleSelectOption = (flowKey) => {
    if (PRESET_FLOWS[flowKey]) {
      setMessages(prev => [...prev, ...PRESET_FLOWS[flowKey]]);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userText = userInput.trim();
    const newMsg = { sender: 'user', text: userText };
    setUserInput('');

    // Check if red flag text
    if (userText.toLowerCase().includes('fever') || userText.toLowerCase().includes('bleeding') || userText.toLowerCase().includes('pain')) {
      setMessages(prev => [...prev, newMsg, ...PRESET_FLOWS.safety.slice(1)]);
    } else if (userText.includes('1') || userText.toLowerCase().includes('check-in') || userText.toLowerCase().includes('checkin')) {
      setMessages(prev => [...prev, newMsg, ...PRESET_FLOWS.checkin.slice(1)]);
    } else {
      setMessages(prev => [
        ...prev, 
        newMsg, 
        { sender: 'bot', text: `Educational Answer: Mobimo is analyzing your request: "${userText}". Keep tracking your recovery daily!` }
      ]);
    }
  };

  return (
    <div className={styles.simulatorOverlay} onClick={onClose}>
      <div className={styles.phoneFrame} onClick={(e) => e.stopPropagation()}>
        {/* WhatsApp Header */}
        <div className={styles.waHeader}>
          <div className={styles.waProfile}>
            <div className={styles.waAvatar}>M</div>
            <div>
              <div className={styles.waName}>Mobimo Health Companion</div>
              <div className={styles.waStatus}>online • WhatsApp Verified</div>
            </div>
          </div>
          <button className={styles.closePhone} onClick={onClose}>✕</button>
        </div>

        {/* WhatsApp Chat Body */}
        <div className={styles.waBody}>
          <div className={styles.securityNotice}>
            🔒 Messages are end-to-end encrypted. Mobimo provides non-diagnostic health education.
          </div>

          {messages.map((m, idx) => (
            <div key={idx} className={`${styles.bubble} ${styles[m.sender]}`}>
              <div className={styles.bubbleText}>{m.text}</div>
              <div className={styles.bubbleTime}>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
          ))}
        </div>

        {/* Preset Actions Quick Bar */}
        <div className={styles.quickBar}>
          <button onClick={() => handleSelectOption('checkin')}>1. Recovery Check-in</button>
          <button onClick={() => handleSelectOption('safety')}>2. Red-Flag Test</button>
          <button onClick={() => handleSelectOption('question')}>3. Breastfeeding Q&amp;A</button>
        </div>

        {/* WhatsApp Footer Input */}
        <form className={styles.waFooter} onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={userInput} 
            onChange={(e) => setUserInput(e.target.value)}
            className={styles.waInput}
          />
          <button type="submit" className={styles.sendBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
