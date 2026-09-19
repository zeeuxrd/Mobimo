import React, { useState } from 'react';
import styles from './ProviderLogin.module.css';

export default function ProviderLogin({ onLoginSuccess, onOpenSuperAdmin, onBackToLanding }) {
  const [step, setStep] = useState(1); // Step 1 or Step 2
  const [hospitalOrg, setHospitalOrg] = useState('Lagos University Teaching Hospital (LUTH)');
  const [email, setEmail] = useState('draminabello@luth.gov.ng');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('Care Coordinator');
  const [error, setError] = useState('');

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your professional email or staff ID');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter your password or security verification code');
      return;
    }

    const userObj = {
      name: email.includes('amina') ? 'Dr. Amina Bello' : 'Authorized Provider',
      email,
      organization: hospitalOrg,
      role
    };

    onLoginSuccess(userObj);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.container}>
        {/* Top Header Navigation */}
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onBackToLanding}>
            ← Back to Public Website
          </button>

          {/* Stepper Indicator */}
          <div className={styles.stepper}>
            <span className={`${styles.stepBadge} ${step === 1 ? styles.stepActive : styles.stepDone}`}>
              1. Identity
            </span>
            <span className={styles.stepDivider}>→</span>
            <span className={`${styles.stepBadge} ${step === 2 ? styles.stepActive : ''}`}>
              2. Clinical Auth
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className={styles.loginCard}>
          <div className={styles.cardHeader}>
            <div className={styles.logoBadge}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
              </svg>
            </div>
            <h1>Healthcare Provider Sign In</h1>
            <p>
              {step === 1 
                ? 'Step 1 of 2: Select your partner organization and professional email.'
                : 'Step 2 of 2: Select your clinical role and enter security credentials.'}
            </p>
          </div>

          {error && <div className={styles.errorAlert}>{error}</div>}

          {step === 1 ? (
            /* STEP 1: 2 Input Fields */
            <form onSubmit={handleNextStep} className={styles.form}>
              <div className={styles.fieldGroup}>
                <label>1. Partner Hospital / Organization</label>
                <select 
                  value={hospitalOrg} 
                  onChange={(e) => setHospitalOrg(e.target.value)}
                  className={styles.select}
                >
                  <option value="Lagos University Teaching Hospital (LUTH)">Lagos University Teaching Hospital (LUTH)</option>
                  <option value="Adeoyo Maternity Teaching Hospital (Ibadan)">Adeoyo Maternity Teaching Hospital (Ibadan)</option>
                  <option value="National Hospital Abuja - Maternal Wing">National Hospital Abuja - Maternal Wing</option>
                  <option value="University of Port Harcourt Teaching Hospital">University of Port Harcourt Teaching Hospital</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>2. Professional Email or Staff ID</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@hospital.gov.ng" 
                  required
                  className={styles.input}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Continue to Clinical Authentication →
              </button>
            </form>
          ) : (
            /* STEP 2: 2 Input Fields */
            <form onSubmit={handleFinalSubmit} className={styles.form}>
              <div className={styles.fieldGroup}>
                <label>1. Clinical Role</label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className={styles.select}
                >
                  <option value="Care Coordinator">Care Coordinator</option>
                  <option value="Obstetrician / Gynecologist">Obstetrician / Gynecologist</option>
                  <option value="Postnatal Nurse / Midwife">Postnatal Nurse / Midwife</option>
                  <option value="Organization Administrator">Organization Administrator</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>2. Password or Security Verification Code</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.securityBanner}>
                🔒 User Consent Verified. Data transmission uses 256-bit encryption.
              </div>

              <div className={styles.btnRow}>
                <button type="button" className={styles.backStepBtn} onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button type="submit" className={styles.submitBtnFlex}>
                  Sign In to Dashboard
                </button>
              </div>
            </form>
          )}

          {/* Quick Instant Demo Sign-In */}
          <div className={styles.demoBox}>
            <span>Demo Modes:</span>
            <div className={styles.demoBtnGroup}>
              <button 
                type="button" 
                className={styles.demoBtn}
                onClick={() => onLoginSuccess({
                  name: 'Dr. Amina Bello',
                  email: 'draminabello@luth.gov.ng',
                  organization: 'Lagos University Teaching Hospital (LUTH)',
                  role: 'Care Coordinator'
                })}
              >
                ⚡ Provider Demo (Dr. Amina Bello)
              </button>

              <button 
                type="button" 
                className={styles.adminDemoBtn}
                onClick={() => {
                  if (onOpenSuperAdmin) {
                    onOpenSuperAdmin();
                  } else {
                    onLoginSuccess({
                      name: 'System Super Admin',
                      email: 'admin@mobimo.health',
                      organization: 'Mobimo HQ Platform',
                      role: 'Super Admin'
                    });
                  }
                }}
              >
                🔑 Super Admin Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
