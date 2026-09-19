import React, { useState } from 'react';
import styles from './ProviderDashboard.module.css';

// Mock initial referrals adhering to Mobimo data-reporting.md schema
const INITIAL_REFERRALS = [
  {
    id: 'REF-2026-0891',
    userPseudonym: 'Mother #891 (Age 26)',
    postpartumStage: '2 Weeks Postpartum',
    deliveryType: 'Natural Birth',
    referralReason: 'Severe belly pain and high fever (38.4°C)',
    redirectedQuestion: 'Doctor, I am 2 weeks postpartum and having severe belly pain with a high fever this morning. Is this normal, or should I come to the hospital right away?',
    doctorAnswer: 'Patient reviewed by Dr. Amina Bello. High fever and belly pain require physical check-up. Patient advised to come directly to LUTH Maternal Ward 2 for examination.',
    triageCategory: 'Urgent',
    urgencyLevel: 'urgent',
    consentVerified: true,
    consentTimestamp: '2026-09-19 09:15 AM',
    organization: 'Lagos University Teaching Hospital (LUTH)',
    status: 'Awaiting Response',
    symptomSummary: [
      { label: 'Belly Pain', value: 'Severe cramping (7/10)' },
      { label: 'Bleeding', value: 'Heavy dark red bleeding' },
      { label: 'Fever', value: '38.4°C recorded this morning' },
      { label: 'Mood / Energy', value: 'Feeling tired and anxious' }
    ],
    notes: 'Safety check triggered urgent care advice to user. Patient consented to share summary for clinical follow-up.'
  },
  {
    id: 'REF-2026-0874',
    userPseudonym: 'Mother #874 (Age 31)',
    postpartumStage: '4 Weeks Postpartum',
    deliveryType: 'C-Section',
    referralReason: 'Swollen, sore breast and feeding pain',
    redirectedQuestion: 'My left breast feels swollen, red, and very sore when feeding my baby. How can I clear this blockage and get relief?',
    doctorAnswer: 'Lactation advice sent: Apply a warm towel before feeding, nurse frequently starting on the sore breast, and gently massage the area. Watch out for fever.',
    triageCategory: 'Priority',
    urgencyLevel: 'priority',
    consentVerified: true,
    consentTimestamp: '2026-09-18 04:30 PM',
    organization: 'Lagos University Teaching Hospital (LUTH)',
    status: 'Accepted',
    symptomSummary: [
      { label: 'Breast Health', value: 'Redness on left breast, painful to touch' },
      { label: 'Bleeding', value: 'Light pink spotting' },
      { label: 'C-Section Wound', value: 'Healed, dry, clean' },
      { label: 'Mood / Energy', value: 'Overwhelmed with feeding pain' }
    ],
    notes: 'User requested breastfeeding support. Consent recorded on WhatsApp.'
  },
  {
    id: 'REF-2026-0862',
    userPseudonym: 'Mother #862 (Age 22)',
    postpartumStage: '6 Weeks Postpartum',
    deliveryType: 'Natural Birth',
    referralReason: '6-week check-up and safe birth control options',
    redirectedQuestion: 'I am ready for my 6-week check-up. What birth control options are safe for me while breastfeeding?',
    doctorAnswer: 'Progestin-only pills or IUD recommended as safe options during breastfeeding. Appointment booked for Thursday 10:00 AM.',
    triageCategory: 'Routine',
    urgencyLevel: 'routine',
    consentVerified: true,
    consentTimestamp: '2026-09-17 11:00 AM',
    organization: 'Lagos University Teaching Hospital (LUTH)',
    status: 'In Progress',
    symptomSummary: [
      { label: 'General Recovery', value: 'Full physical strength restored' },
      { label: 'Bleeding', value: 'Stopped completely' },
      { label: 'Mental Health', value: 'Good family support' }
    ],
    notes: 'Postnatal check-up reminder confirmed.'
  },
  {
    id: 'REF-2026-0840',
    userPseudonym: 'Mother #840 (Age 29)',
    postpartumStage: '3 Weeks Postpartum',
    deliveryType: 'Emergency C-Section',
    referralReason: 'C-section stitch check - mild redness',
    redirectedQuestion: 'My C-section stitch line looks a bit pink near the center. Is it healing properly, or should a nurse take a look?',
    doctorAnswer: 'Stitch line examined in clinic. Normal healing with mild skin friction redness, no fluid leaking. Clean dressing applied.',
    triageCategory: 'Priority',
    urgencyLevel: 'priority',
    consentVerified: true,
    consentTimestamp: '2026-09-16 02:15 PM',
    organization: 'Lagos University Teaching Hospital (LUTH)',
    status: 'Resolved',
    symptomSummary: [
      { label: 'Wound Condition', value: 'Redness cleared after nurse check' },
      { label: 'Pain Score', value: 'Mild (1/10)' }
    ],
    notes: 'In-person clinic review completed. Patient resting well at home.'
  }
];

export default function ProviderDashboard({ authenticatedUser, onSignOut, onBackToLanding }) {
  const [referrals, setReferrals] = useState(INITIAL_REFERRALS);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [doctorAnswerInput, setDoctorAnswerInput] = useState('');

  const currentUser = authenticatedUser || {
    name: 'Dr. Amina Bello',
    email: 'draminabello@luth.gov.ng',
    organization: 'Lagos University Teaching Hospital (LUTH)',
    role: 'Care Coordinator'
  };

  const handleOpenReviewModal = (referral) => {
    setSelectedReferral(referral);
    setDoctorAnswerInput(referral.doctorAnswer || '');
  };

  // Metrics calculation
  const totalReferrals = referrals.length;
  const awaitingCount = referrals.filter(r => r.status === 'Awaiting Response' || r.status === 'Awaiting Provider Response').length;
  const acceptedCount = referrals.filter(r => r.status === 'Accepted' || r.status === 'Assigned').length;
  const inProgressCount = referrals.filter(r => r.status === 'In Progress').length;
  const resolvedCount = referrals.filter(r => r.status === 'Resolved').length;

  const filteredReferrals = statusFilter === 'ALL'
    ? referrals
    : referrals.filter(r => r.status === statusFilter);

  const handleUpdateStatus = (id, newStatus) => {
    setReferrals(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    }));
    if (selectedReferral && selectedReferral.id === id) {
      setSelectedReferral(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleSaveDoctorAnswer = (e) => {
    if (e) e.preventDefault();
    if (!selectedReferral || !doctorAnswerInput.trim()) return;

    const updatedAnswer = doctorAnswerInput.trim();

    setReferrals(prev => prev.map(item => {
      if (item.id === selectedReferral.id) {
        return {
          ...item,
          doctorAnswer: updatedAnswer,
          status: item.status === 'Awaiting Response' ? 'In Progress' : item.status,
          notes: `${item.notes}\n[Doctor Answer Saved]: ${updatedAnswer}`
        };
      }
      return item;
    }));

    setSelectedReferral(prev => ({
      ...prev,
      doctorAnswer: updatedAnswer,
      status: prev.status === 'Awaiting Response' ? 'In Progress' : prev.status
    }));
  };

  return (
    <div className={styles.dashboardWrapper}>
      {/* Top Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={onBackToLanding}>
            ← Public Website
          </button>
          <div className={styles.brandBadge}>
            <span className={styles.pulseDot}></span>
            <strong>Mobimo Provider Care Dashboard</strong>
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>AB</div>
            <div>
              <div className={styles.userName}>{currentUser.name}</div>
              <div className={styles.userOrg}>{currentUser.organization}</div>
            </div>
          </div>
          <button className={styles.signOutBtn} onClick={onSignOut}>Sign Out</button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className={styles.mainContainer}>
        {/* Title Bar & Filter Row */}
        <div className={styles.titleRow}>
          <div>
            <h1 className={styles.title}>Postpartum Care &amp; Referral Queue</h1>
            <p className={styles.subTitle}>
              Review patient questions escalated from WhatsApp, answer inquiries, and manage care referrals.
            </p>
          </div>

          <div className={styles.filterGroup}>
            <button 
              className={`${styles.filterBtn} ${statusFilter === 'ALL' ? styles.filterActive : ''}`}
              onClick={() => setStatusFilter('ALL')}
            >
              All ({totalReferrals})
            </button>
            <button 
              className={`${styles.filterBtn} ${statusFilter === 'Awaiting Response' ? styles.filterActive : ''}`}
              onClick={() => setStatusFilter('Awaiting Response')}
            >
              Awaiting ({awaitingCount})
            </button>
            <button 
              className={`${styles.filterBtn} ${statusFilter === 'In Progress' ? styles.filterActive : ''}`}
              onClick={() => setStatusFilter('In Progress')}
            >
              In Progress ({inProgressCount})
            </button>
            <button 
              className={`${styles.filterBtn} ${statusFilter === 'Resolved' ? styles.filterActive : ''}`}
              onClick={() => setStatusFilter('Resolved')}
            >
              Resolved ({resolvedCount})
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>New Awaiting Referrals</div>
            <div className={styles.metricValueUrgent}>{awaitingCount}</div>
            <div className={styles.metricSub}>Requires provider response</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Accepted &amp; Active</div>
            <div className={styles.metricValue}>{acceptedCount}</div>
            <div className={styles.metricSub}>Under clinical care</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Active Consultations</div>
            <div className={styles.metricValue}>{inProgressCount}</div>
            <div className={styles.metricSub}>Ongoing follow-up</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Resolved Referrals</div>
            <div className={styles.metricValueSuccess}>{resolvedCount}</div>
            <div className={styles.metricSub}>Completed handoffs</div>
          </div>
        </div>

        {/* Referral Queue Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2>Active Patient Referral Queue</h2>
            <span className={styles.privacyNotice}>
              🔒 Minimum Necessary Sharing (User Consent Verified)
            </span>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Referral ID / Patient</th>
                  <th>Postpartum Stage</th>
                  <th>Triage Category</th>
                  <th>Reason for Handoff</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReferrals.map((item) => (
                  <tr key={item.id} className={selectedReferral?.id === item.id ? styles.selectedRow : ''}>
                    <td>
                      <div className={styles.patientName}>{item.userPseudonym}</div>
                      <div className={styles.refId}>{item.id}</div>
                    </td>

                    <td>
                      <span className={styles.stageTag}>{item.postpartumStage}</span>
                      <div className={styles.subText}>{item.deliveryType}</div>
                    </td>

                    <td>
                      <span className={`${styles.triageTag} ${styles[item.urgencyLevel]}`}>
                        {item.triageCategory}
                      </span>
                    </td>

                    <td className={styles.reasonCell}>
                      <div className={styles.reasonText}>{item.referralReason}</div>
                      <div className={styles.consentTag}>✓ Consented {item.consentTimestamp}</div>
                    </td>

                    <td>
                      <span className={`${styles.statusBadge} ${styles[item.status.replace(/\s+/g, '')]}`}>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <button 
                        className={styles.reviewBtn}
                        onClick={() => handleOpenReviewModal(item)}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Streamlined Review Card Modal */}
      {selectedReferral && (
        <div className={styles.modalOverlay} onClick={() => setSelectedReferral(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <div className={styles.modalId}>{selectedReferral.id} • {selectedReferral.postpartumStage}</div>
                <h2 className={styles.modalTitle}>{selectedReferral.userPseudonym}</h2>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelectedReferral(null)}>✕</button>
            </div>

            <div className={styles.modalBody}>
              {/* Meta Status Badges */}
              <div className={styles.modalMetaRow}>
                <span className={`${styles.triageTag} ${styles[selectedReferral.urgencyLevel]}`}>
                  {selectedReferral.triageCategory} Priority
                </span>
                <span className={styles.metaText}>
                  Delivery: <strong>{selectedReferral.deliveryType}</strong>
                </span>
                <span className={styles.consentBadge}>
                  🔒 Consented {selectedReferral.consentTimestamp}
                </span>
              </div>

              {/* 1. Featured Patient Question Redirected from WhatsApp to Doctor */}
              <div className={styles.questionCard}>
                <div className={styles.cardKicker}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2zm.01 16.59c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.22 8.24z"/>
                  </svg>
                  <span>WhatsApp Question Redirected to Doctor</span>
                </div>
                <div className={styles.questionText}>
                  "{selectedReferral.redirectedQuestion || selectedReferral.referralReason}"
                </div>
              </div>

              {/* 2. Doctor Detailed Clinical Response & Answer Form */}
              <div className={styles.doctorAnswerCard}>
                <div className={styles.doctorHeader}>
                  <h3>🩺 Doctor's Response &amp; Detailed Clinical Summary</h3>
                  <span className={styles.clinicianName}>Assigned: {selectedReferral.assignedClinician}</span>
                </div>

                <form onSubmit={handleSaveDoctorAnswer} className={styles.answerForm}>
                  <textarea 
                    className={styles.doctorTextarea}
                    rows="4"
                    placeholder="Type detailed medical answer, prescription/triage advice, or clinical summary..."
                    value={doctorAnswerInput}
                    onChange={(e) => setDoctorAnswerInput(e.target.value)}
                  />

                  <div className={styles.answerBtnRow}>
                    <button type="submit" className={styles.saveAnswerBtn}>
                      Save Response &amp; Summary
                    </button>

                    <button 
                      type="button" 
                      className={styles.resolveInlineBtn}
                      onClick={(e) => {
                        handleSaveDoctorAnswer(e);
                        handleUpdateStatus(selectedReferral.id, 'Resolved');
                      }}
                    >
                      ✓ Save &amp; Mark Resolved
                    </button>
                  </div>
                </form>

                {selectedReferral.doctorAnswer && (
                  <div className={styles.previousAnswerBox}>
                    <div className={styles.prevLabel}>Saved Clinical Summary:</div>
                    <p>{selectedReferral.doctorAnswer}</p>
                  </div>
                )}
              </div>

              {/* 3. Lifecycle Status Row */}
              <div className={styles.lifecycleSection}>
                <label>Status Lifecycle:</label>
                <div className={styles.statusGroup}>
                  {['Awaiting Response', 'Accepted', 'In Progress', 'Resolved'].map((st) => (
                    <button 
                      key={st}
                      className={`${styles.statusOption} ${selectedReferral.status === st ? styles.statusActive : ''}`}
                      onClick={() => handleUpdateStatus(selectedReferral.id, st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.closeModalBtn} onClick={() => setSelectedReferral(null)}>
                Close Review Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
