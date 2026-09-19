import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import ProviderLogin from './components/ProviderLogin/ProviderLogin';
import ProviderDashboard from './components/ProviderDashboard/ProviderDashboard';
import WhatsAppSimulator from './components/WhatsAppSimulator/WhatsAppSimulator';
import SuperAdminPortal from './components/SuperAdmin/SuperAdminPortal';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'provider-login' | 'provider-dashboard' | 'super-admin'
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  const handleOpenProviderPortal = () => {
    if (authenticatedUser) {
      setActiveView('provider-dashboard');
    } else {
      setActiveView('provider-login');
    }
  };

  const handleLoginSuccess = (userObj) => {
    setAuthenticatedUser(userObj);
    if (userObj.role === 'Super Admin') {
      setActiveView('super-admin');
    } else {
      setActiveView('provider-dashboard');
    }
  };

  const handleSignOut = () => {
    setAuthenticatedUser(null);
    setActiveView('provider-login');
  };

  return (
    <div className="app-root">
      {activeView === 'landing' && (
        <>
          <Navbar 
            activeView={activeView} 
            setActiveView={(view) => {
              if (view === 'dashboard') {
                handleOpenProviderPortal();
              } else if (view === 'super-admin') {
                setActiveView('super-admin');
              } else {
                setActiveView(view);
              }
            }} 
            onOpenSimulator={() => setIsSimulatorOpen(true)} 
          />
          <LandingPage 
            onOpenSimulator={() => setIsSimulatorOpen(true)} 
            onOpenDashboard={handleOpenProviderPortal}
          />
        </>
      )}

      {activeView === 'provider-login' && (
        <ProviderLogin 
          onLoginSuccess={handleLoginSuccess}
          onOpenSuperAdmin={() => setActiveView('super-admin')}
          onBackToLanding={() => setActiveView('landing')}
        />
      )}

      {activeView === 'provider-dashboard' && (
        <ProviderDashboard 
          authenticatedUser={authenticatedUser}
          onSignOut={handleSignOut}
          onBackToLanding={() => setActiveView('landing')} 
        />
      )}

      {activeView === 'super-admin' && (
        <SuperAdminPortal 
          onBackToLanding={() => setActiveView('landing')} 
        />
      )}

      {/* Floating Interactive WhatsApp Simulator Modal */}
      {isSimulatorOpen && (
        <WhatsAppSimulator onClose={() => setIsSimulatorOpen(false)} />
      )}
    </div>
  );
}
