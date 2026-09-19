import React, { useState } from 'react';
import styles from './LandingPage.module.css';

export default function LandingPage({ onOpenSimulator, onOpenDashboard }) {
  const [activeTab, setActiveTab] = useState('checkin');

  return (
    <div className={styles.landingWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Mobimo</h1>

        <p className={styles.heroDescription}>
          Understand your physical recovery after childbirth through automated WhatsApp check-ins, 
          educational AI health answers, red-flag warning triage, and seamless connection to verified local healthcare providers.
        </p>

        <div className={styles.heroCtas}>
          <a 
            href="https://wa.me/message/4I3EH4FD2ZS5C1" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.primaryCta}
          >
            <span>Start Mobimo on WhatsApp</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2zm.01 16.59c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.22 8.24z"/>
            </svg>
          </a>
          
          <button className={styles.secondaryCta} onClick={onOpenDashboard}>
            <span>Healthcare Provider Portal</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Hero Image - Black Mother & Sleeping Newborn */}
        <div className={styles.heroImageContainer}>
          <img 
            src="/images/assets/image-reference.png" 
            alt="Mobimo Postpartum Care - Nigerian Mother & Baby" 
            className={styles.heroImage} 
          />
        </div>
      </section>

      {/* Editorial Section 2: Split Diagram Feature - "Your Body Tells a Complete Story" */}
      <section className={styles.storySection} id="how-it-works">
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            {/* Left Content */}
            <div className={styles.storyContent}>
              <h2 className={styles.storyTitle}>Your recovery tells a complete story</h2>
              <div className={styles.emblemIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#F4E89B"/>
                </svg>
              </div>
              <p className={styles.storyText}>
                The first weeks postpartum can be overwhelming. Mobimo breaks down health monitoring into quiet, zero-friction WhatsApp check-ins. We combine symptom tracking, localized maternal knowledge, and emergency red-flag safeguards into one accessible mobile experience.
              </p>

              <div className={styles.pillBadges}>
                <span className={styles.pill}>✓ No App Download Needed</span>
                <span className={styles.pill}>✓ Direct WhatsApp Messaging</span>
                <span className={styles.pill}>✓ Free Educational Support</span>
              </div>
            </div>

            {/* Right Interactive Diagram Card */}
            <div className={styles.diagramCard}>
              <div className={styles.diagramHeader}>
                <h3>Interactive Recovery Blueprint</h3>
                <p>Click nodes to see how Mobimo tracks each vital recovery indicator</p>
              </div>

              <div className={styles.nodeGrid}>
                <div className={`${styles.nodeItem} ${activeTab === 'checkin' ? styles.activeNode : ''}`} onClick={() => setActiveTab('checkin')}>
                  <div className={styles.nodeBadge}>01</div>
                  <div>
                    <h4>Physical Recovery & Healing</h4>
                    <p>Track lochia/bleeding, uterine cramping, and perineal or C-section wound recovery.</p>
                  </div>
                </div>

                <div className={`${styles.nodeItem} ${activeTab === 'safety' ? styles.activeNode : ''}`} onClick={() => setActiveTab('safety')}>
                  <div className={styles.nodeBadge}>02</div>
                  <div>
                    <h4>Warning-Sign Triage (Red Flags)</h4>
                    <p>Instant safety check before AI guidance for fever, heavy bleeding, or high blood pressure.</p>
                  </div>
                </div>

                <div className={`${styles.nodeItem} ${activeTab === 'lactation' ? styles.activeNode : ''}`} onClick={() => setActiveTab('lactation')}>
                  <div className={styles.nodeBadge}>03</div>
                  <div>
                    <h4>Lactation & Newborn Care</h4>
                    <p>Practical guidance on latching, engorgement relief, and mastitis warning signs.</p>
                  </div>
                </div>

                <div className={`${styles.nodeItem} ${activeTab === 'reports' ? styles.activeNode : ''}`} onClick={() => setActiveTab('reports')}>
                  <div className={styles.nodeBadge}>04</div>
                  <div>
                    <h4>Structured Health Summaries</h4>
                    <p>Generate non-diagnostic PDF recovery reports to share with your nurse or doctor.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Yellow Highlight Banner */}
      <section className={styles.yellowBanner} id="features">
        <div className={styles.container}>
          <div className={styles.yellowGrid}>
            <div className={styles.yellowLeft}>
              <span className={styles.kicker}>WHY MOBIMO</span>
              <h2 className={styles.yellowTitle}>
                Dedicated postpartum depth for sustained recovery
              </h2>
              <p className={styles.yellowSub}>
                In Nigeria, postnatal follow-up can be difficult to access regularly. Mobimo bridges the gap with continuous, culturally contextualized educational support.
              </p>
            </div>

            <div className={styles.yellowRight}>
              <div className={styles.featureBox}>
                <div className={styles.featureIcon}>🛡️</div>
                <h3>Safety First Evaluation</h3>
                <p>Every message undergoes automated safety evaluation before answering. Red-flag symptoms trigger immediate urgent care guidance.</p>
              </div>

              <div className={styles.featureBox}>
                <div className={styles.featureIcon}>📋</div>
                <h3>Consented Provider Referral</h3>
                <p>When care beyond Mobimo is required, users can share a minimum-necessary health summary directly with authorized partner clinics.</p>
              </div>

              <div className={styles.featureBox}>
                <div className={styles.featureIcon}>🌙</div>
                <h3>Rest & Check-up Reminders</h3>
                <p>Automated reminders for postnatal check-ups, hydration, hydration, and maternal rest intervals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Triage Feature Section */}
      <section className={styles.safetySection} id="safety">
        <div className={styles.container}>
          <div className={styles.safetyHeader}>
            <span className={styles.safetyTag}>CLINICAL GROUNDING & SAFETY</span>
            <h2>How Mobimo Ensures Postpartum Safety</h2>
            <p>Mobimo is educational and non-diagnostic, strictly enforcing safety-critical routing before conversational AI handling.</p>
          </div>

          <div className={styles.triageCards}>
            <div className={styles.triageCard}>
              <div className={styles.cardHeaderUrgent}>
                <span>🚨 URGENT</span>
              </div>
              <h3>Red Flag Detection</h3>
              <p>Triggers on heavy soaking bleeding (&gt;1 pad/hr), fever &gt;38°C, severe chest pain, or visual disturbances.</p>
              <div className={styles.actionOutcome}>
                <strong>Outcome:</strong> Stops routine bot flow immediately and displays emergency care instructions + local emergency directory.
              </div>
            </div>

            <div className={styles.triageCard}>
              <div className={styles.cardHeaderPriority}>
                <span>⚠️ PRIORITY</span>
              </div>
              <h3>Provider Escalation</h3>
              <p>For symptoms needing professional evaluation (e.g. painful breastfeeding, persistent mood sadness, persistent wound pain).</p>
              <div className={styles.actionOutcome}>
                <strong>Outcome:</strong> Asks user consent to share a short structured referral summary with partner clinics.
              </div>
            </div>

            <div className={styles.triageCard}>
              <div className={styles.cardHeaderRoutine}>
                <span>💬 ROUTINE</span>
              </div>
              <h3>Supported Health Q&amp;A</h3>
              <p>Plain-language answers for normal lochia progression, nutrition, infant rest patterns, and postpartum self-care.</p>
              <div className={styles.actionOutcome}>
                <strong>Outcome:</strong> Concise, educational responses formatted cleanly for WhatsApp screen sizes.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider & Report Section */}
      <section className={styles.reportSection} id="reports">
        <div className={styles.container}>
          <div className={styles.reportGrid}>
            <div className={styles.reportText}>
              <h2>On-Demand Personal Health Reports</h2>
              <p>
                Mothers can request a clean, non-diagnostic PDF summary of their recovery check-ins at any time. 
                Whether preparing for a 6-week postnatal hospital visit or consulting a community midwife, 
                Mobimo summarizes symptom trends without exposing raw chat logs.
              </p>
              <div className={styles.reportFeatures}>
                <div className={styles.rfItem}>📄 Structured Symptom Trends</div>
                <div className={styles.rfItem}>🔒 Privacy-First Data Retention</div>
                <div className={styles.rfItem}>🏥 Ready for Doctor Review</div>
              </div>
              <button className={styles.reportBtn} onClick={onOpenDashboard}>
                Explore Provider Dashboard Handoff
              </button>
            </div>

            <div className={styles.reportMockup}>
              <div className={styles.pdfCard}>
                <div className={styles.pdfHeader}>
                  <div className={styles.pdfLogo}>Mobimo Health Report</div>
                  <div className={styles.pdfDate}>Postpartum Week 3</div>
                </div>
                <div className={styles.pdfBody}>
                  <div className={styles.pdfRow}>
                    <span>User Context:</span> <strong>3 Weeks Postpartum (Vaginal Delivery)</strong>
                  </div>
                  <div className={styles.pdfRow}>
                    <span>Bleeding Trend:</span> <strong className={styles.statusNormal}>Normal Lochia Serosa (Light Pink)</strong>
                  </div>
                  <div className={styles.pdfRow}>
                    <span>Pain Score:</span> <strong>Mild Uterine Cramping (2/10)</strong>
                  </div>
                  <div className={styles.pdfRow}>
                    <span>Mood Check:</span> <strong>Good / Supported</strong>
                  </div>
                  <div className={styles.pdfDisclaimer}>
                    * This summary is user-recorded and non-diagnostic. Always verify clinically during postnatal appointments.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerCTA}>
            <h2>Ready to experience Mobimo?</h2>
            <p>Start a simulated WhatsApp conversation or log into the Healthcare Provider Portal.</p>
            <div className={styles.footerBtns}>
              <a 
                href="https://wa.me/message/4I3EH4FD2ZS5C1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.whatsappBtnLarge}
              >
                Chat on WhatsApp Now
              </a>
              <button className={styles.portalBtnLarge} onClick={onOpenDashboard}>
                Access Healthcare Dashboard
              </button>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.footerLegal}>
              <p>© 2026 Mobimo Health. Built for Nigerian Postpartum Care.</p>
              <p className={styles.disclaimerText}>
                Disclaimer: Mobimo is an educational AI health companion and does not replace medical advice, clinical diagnosis, or hospital emergency services.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
