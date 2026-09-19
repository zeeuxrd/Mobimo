import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ activeView, setActiveView, onOpenSimulator }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand} onClick={() => setActiveView('landing')}>
          <div className={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
              <path d="M12 6C9.24 6 7 8.24 7 11C7 13.76 9.24 16 12 16C14.76 16 17 13.76 17 11C17 8.24 14.76 6 12 6ZM12 14C10.34 14 9 12.66 9 11C9 9.34 10.34 8 12 8C13.66 8 15 9.34 15 11C15 12.66 13.66 14 12 14Z" fill="currentColor"/>
            </svg>
          </div>
          <span className={styles.brandName}>Mobimo</span>
        </div>

        <nav className={styles.navLinks}>
          <a 
            href="#how-it-works" 
            className={`${styles.link} ${activeView === 'landing' ? styles.active : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveView('landing'); }}
          >
            How It Works
          </a>
          <a 
            href="#safety" 
            className={styles.link}
            onClick={(e) => { e.preventDefault(); setActiveView('landing'); }}
          >
            Safety Triage
          </a>
          <a 
            href="#reports" 
            className={styles.link}
            onClick={(e) => { e.preventDefault(); setActiveView('landing'); }}
          >
            Health Summaries
          </a>
        </nav>

        <div className={styles.actions}>
          <a 
            href="https://wa.me/message/4I3EH4FD2ZS5C1" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.whatsappBtn}
          >
            <span>Chat on WhatsApp</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2zm.01 16.59c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.22 8.24z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
