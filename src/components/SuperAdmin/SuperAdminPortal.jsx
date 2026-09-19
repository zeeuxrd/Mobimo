import React, { useState } from 'react';
import styles from './SuperAdminPortal.module.css';

// Mock Initial Data
const INITIAL_HOSPITALS = [
  {
    id: 'ORG-001',
    name: 'Lagos University Teaching Hospital (LUTH)',
    location: 'Lagos, Nigeria',
    type: 'Tertiary Teaching Hospital',
    contactEmail: 'maternal-care@luth.gov.ng',
    phone: '+234 803 123 4567',
    verifiedStatus: 'Verified Partner',
    specialistCount: 14,
    referralCount: 128
  },
  {
    id: 'ORG-002',
    name: 'Adeoyo Maternity Teaching Hospital',
    location: 'Ibadan, Oyo State',
    type: 'Maternity Specialist Hospital',
    contactEmail: 'referrals@adeoyo.org.ng',
    phone: '+234 802 987 6543',
    verifiedStatus: 'Verified Partner',
    specialistCount: 8,
    referralCount: 64
  },
  {
    id: 'ORG-003',
    name: 'National Hospital Abuja - Maternal Wing',
    location: 'Abuja, FCT',
    type: 'Federal Medical Center',
    contactEmail: 'maternal@nationalhospital.gov.ng',
    phone: '+234 805 444 3322',
    verifiedStatus: 'Verified Partner',
    specialistCount: 11,
    referralCount: 92
  }
];

const INITIAL_SPECIALISTS = [
  {
    id: 'SPEC-101',
    name: 'Dr. Amina Bello',
    email: 'draminabello@luth.gov.ng',
    hospital: 'Lagos University Teaching Hospital (LUTH)',
    specialty: 'Obstetrics & Gynecology',
    role: 'Care Coordinator',
    status: 'Active',
    dateOnboarded: '2026-08-10'
  },
  {
    id: 'SPEC-102',
    name: 'Nurse Chioma Okeke',
    email: 'chioma.okeke@luth.gov.ng',
    hospital: 'Lagos University Teaching Hospital (LUTH)',
    specialty: 'Lactation & Postnatal Nursing',
    role: 'Postnatal Nurse',
    status: 'Active',
    dateOnboarded: '2026-08-14'
  },
  {
    id: 'SPEC-103',
    name: 'Dr. Hassan Musa',
    email: 'hassan.musa@nationalhospital.gov.ng',
    hospital: 'National Hospital Abuja - Maternal Wing',
    specialty: 'Maternal-Fetal Medicine',
    role: 'Obstetrician',
    status: 'Active',
    dateOnboarded: '2026-08-20'
  },
  {
    id: 'SPEC-104',
    name: 'Midwife Grace Danjuma',
    email: 'grace.d@adeoyo.org.ng',
    hospital: 'Adeoyo Maternity Teaching Hospital',
    specialty: 'Community Midwifery',
    role: 'Midwife',
    status: 'Active',
    dateOnboarded: '2026-09-01'
  }
];

export default function SuperAdminPortal({ onBackToLanding }) {
  const [activeTab, setActiveTab] = useState('hospitals'); // 'hospitals' | 'specialists'
  const [hospitals, setHospitals] = useState(INITIAL_HOSPITALS);
  const [specialists, setSpecialists] = useState(INITIAL_SPECIALISTS);

  // Modals
  const [isAddHospitalOpen, setIsAddHospitalOpen] = useState(false);
  const [isAddSpecialistOpen, setIsAddSpecialistOpen] = useState(false);

  // New Hospital Form State
  const [newHospitalName, setNewHospitalName] = useState('');
  const [newHospitalLocation, setNewHospitalLocation] = useState('');
  const [newHospitalType, setNewHospitalType] = useState('General Hospital');
  const [newHospitalEmail, setNewHospitalEmail] = useState('');
  const [newHospitalPhone, setNewHospitalPhone] = useState('');

  // New Specialist Form State
  const [newSpecName, setNewSpecName] = useState('');
  const [newSpecEmail, setNewSpecEmail] = useState('');
  const [newSpecHospital, setNewSpecHospital] = useState(INITIAL_HOSPITALS[0].name);
  const [newSpecSpecialty, setNewSpecSpecialty] = useState('Postnatal Nursing');
  const [newSpecRole, setNewSpecRole] = useState('Postnatal Nurse');

  const handleCreateHospital = (e) => {
    e.preventDefault();
    if (!newHospitalName.trim()) return;

    const newOrg = {
      id: `ORG-00${hospitals.length + 1}`,
      name: newHospitalName.trim(),
      location: newHospitalLocation.trim() || 'Nigeria',
      type: newHospitalType,
      contactEmail: newHospitalEmail.trim() || 'contact@hospital.org.ng',
      phone: newHospitalPhone.trim() || '+234 800 000 0000',
      verifiedStatus: 'Verified Partner',
      specialistCount: 0,
      referralCount: 0
    };

    setHospitals(prev => [newOrg, ...prev]);
    setIsAddHospitalOpen(false);
    setNewHospitalName('');
    setNewHospitalLocation('');
    setNewHospitalEmail('');
    setNewHospitalPhone('');
  };

  const handleOnboardSpecialist = (e) => {
    e.preventDefault();
    if (!newSpecName.trim() || !newSpecEmail.trim()) return;

    const newSpec = {
      id: `SPEC-${100 + specialists.length + 1}`,
      name: newSpecName.trim(),
      email: newSpecEmail.trim(),
      hospital: newSpecHospital,
      specialty: newSpecSpecialty,
      role: newSpecRole,
      status: 'Active',
      dateOnboarded: new Date().toISOString().split('T')[0]
    };

    setSpecialists(prev => [newSpec, ...prev]);

    // Update hospital specialist count
    setHospitals(prev => prev.map(h => {
      if (h.name === newSpecHospital) {
        return { ...h, specialistCount: h.specialistCount + 1 };
      }
      return h;
    }));

    setIsAddSpecialistOpen(false);
    setNewSpecName('');
    setNewSpecEmail('');
  };

  const handleToggleSpecialistStatus = (id) => {
    setSpecialists(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return s;
    }));
  };

  return (
    <div className={styles.adminWrapper}>
      {/* Super Admin Top Navigation */}
      <header className={styles.adminHeader}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={onBackToLanding}>
            ← Public Website
          </button>
          <div className={styles.adminBadge}>
            <span className={styles.badgeDot}></span>
            <strong>Mobimo Super Admin Management Portal</strong>
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.adminUser}>
            <div className={styles.avatar}>SA</div>
            <div>
              <div className={styles.adminName}>Super Admin (System Owner)</div>
              <div className={styles.adminRole}>Master Access</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={styles.mainContainer}>
        <div className={styles.titleRow}>
          <div>
            <h1 className={styles.title}>Partner Organizations & Specialist Management</h1>
            <p className={styles.subTitle}>
              Onboard verified hospitals, register maternal health specialists, and manage provider access to the Mobimo referral dashboard.
            </p>
          </div>

          <div className={styles.actionBtns}>
            {activeTab === 'hospitals' ? (
              <button className={styles.primaryAddBtn} onClick={() => setIsAddHospitalOpen(true)}>
                + Create New Partner Hospital
              </button>
            ) : (
              <button className={styles.primaryAddBtn} onClick={() => setIsAddSpecialistOpen(true)}>
                + Onboard New Specialist
              </button>
            )}
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className={styles.tabsBar}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'hospitals' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('hospitals')}
          >
            Partner Hospitals &amp; Facilities ({hospitals.length})
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'specialists' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('specialists')}
          >
            Onboarded Healthcare Specialists ({specialists.length})
          </button>
        </div>

        {/* TAB 1: HOSPITALS LIST */}
        {activeTab === 'hospitals' && (
          <div className={styles.tableCard}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Hospital Name &amp; ID</th>
                  <th>Location &amp; Type</th>
                  <th>Contact Details</th>
                  <th>Status</th>
                  <th>Onboarded Specialists</th>
                  <th>Total Referrals</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((h) => (
                  <tr key={h.id}>
                    <td>
                      <div className={styles.hospName}>{h.name}</div>
                      <div className={styles.hospId}>{h.id}</div>
                    </td>
                    <td>
                      <div className={styles.textMain}>{h.location}</div>
                      <div className={styles.textSub}>{h.type}</div>
                    </td>
                    <td>
                      <div className={styles.textMain}>{h.contactEmail}</div>
                      <div className={styles.textSub}>{h.phone}</div>
                    </td>
                    <td>
                      <span className={styles.verifiedTag}>✓ {h.verifiedStatus}</span>
                    </td>
                    <td>
                      <strong>{h.specialistCount} Specialists</strong>
                    </td>
                    <td>
                      <strong className={styles.countText}>{h.referralCount} Handled</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: SPECIALISTS LIST */}
        {activeTab === 'specialists' && (
          <div className={styles.tableCard}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Specialist Name &amp; ID</th>
                  <th>Assigned Hospital Facility</th>
                  <th>Clinical Specialty &amp; Role</th>
                  <th>Professional Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {specialists.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className={styles.hospName}>{s.name}</div>
                      <div className={styles.hospId}>{s.id} (Added {s.dateOnboarded})</div>
                    </td>
                    <td>
                      <div className={styles.textMain}>{s.hospital}</div>
                    </td>
                    <td>
                      <div className={styles.textMain}>{s.specialty}</div>
                      <div className={styles.textSub}>{s.role}</div>
                    </td>
                    <td>
                      <div className={styles.textMain}>{s.email}</div>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${s.status === 'Active' ? styles.statusActive : styles.statusSuspended}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className={styles.toggleStatusBtn}
                        onClick={() => handleToggleSpecialistStatus(s.id)}
                      >
                        {s.status === 'Active' ? 'Suspend Access' : 'Activate Access'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal 1: Create Hospital */}
      {isAddHospitalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsAddHospitalOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Onboard New Partner Hospital</h2>
              <button className={styles.closeBtn} onClick={() => setIsAddHospitalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateHospital} className={styles.modalForm}>
              <div className={styles.field}>
                <label>Hospital / Facility Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Adeoyo Maternity Teaching Hospital" 
                  value={newHospitalName}
                  onChange={(e) => setNewHospitalName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label>City &amp; State *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ibadan, Oyo State" 
                    value={newHospitalLocation}
                    onChange={(e) => setNewHospitalLocation(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label>Facility Type</label>
                  <select 
                    value={newHospitalType} 
                    onChange={(e) => setNewHospitalType(e.target.value)}
                  >
                    <option value="General Hospital">General Hospital</option>
                    <option value="Teaching Hospital">Teaching Hospital</option>
                    <option value="Maternity Center">Maternity Specialist Center</option>
                    <option value="Primary Healthcare Center (PHC)">Primary Healthcare Center (PHC)</option>
                  </select>
                </div>
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label>Official Email</label>
                  <input 
                    type="email" 
                    placeholder="referrals@hospital.gov.ng" 
                    value={newHospitalEmail}
                    onChange={(e) => setNewHospitalEmail(e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label>Emergency Line / Phone</label>
                  <input 
                    type="text" 
                    placeholder="+234 803 000 0000" 
                    value={newHospitalPhone}
                    onChange={(e) => setNewHospitalPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsAddHospitalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>Create &amp; Verify Hospital</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Onboard Specialist */}
      {isAddSpecialistOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsAddSpecialistOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Onboard Healthcare Specialist</h2>
              <button className={styles.closeBtn} onClick={() => setIsAddSpecialistOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleOnboardSpecialist} className={styles.modalForm}>
              <div className={styles.field}>
                <label>Specialist Full Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Dr. Amina Bello" 
                  value={newSpecName}
                  onChange={(e) => setNewSpecName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Professional Email *</label>
                <input 
                  type="email" 
                  placeholder="name@hospital.gov.ng" 
                  value={newSpecEmail}
                  onChange={(e) => setNewSpecEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Assigned Partner Hospital *</label>
                <select 
                  value={newSpecHospital} 
                  onChange={(e) => setNewSpecHospital(e.target.value)}
                >
                  {hospitals.map(h => (
                    <option key={h.id} value={h.name}>{h.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label>Specialty</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Obstetrics & Gynecology" 
                    value={newSpecSpecialty}
                    onChange={(e) => setNewSpecSpecialty(e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label>Dashboard Role</label>
                  <select 
                    value={newSpecRole} 
                    onChange={(e) => setNewSpecRole(e.target.value)}
                  >
                    <option value="Care Coordinator">Care Coordinator</option>
                    <option value="Obstetrician">Obstetrician / Doctor</option>
                    <option value="Postnatal Nurse">Postnatal Nurse</option>
                    <option value="Midwife">Midwife</option>
                  </select>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsAddSpecialistOpen(false)}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>Onboard &amp; Send Credentials</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
