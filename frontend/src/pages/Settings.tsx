import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import GeneralSettings from '@/components/settings/GeneralSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import ProfileSettings from '@/components/settings/ProfileSettings';
import UpgradeSection from '@/components/settings/UpgradeSection';
import { useNavigate } from 'react-router-dom';

export type SettingsSection = 'general' | 'security' | 'profile' | 'upgrade';

const Settings = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<SettingsSection>('general');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Centralized section change handler that also syncs URL
  const handleSectionChange = (section: SettingsSection) => {
    setActiveSection(section);
    // Keep URL in sync for better UX (back/forward support and deep links)
    const hash = section === 'profile' || section === 'upgrade' ? `#${section}` : '';
    const newUrl = `/settings${hash}`;
    // Use replaceState to avoid cluttering history when switching sections
    window.history.replaceState({}, document.title, newUrl);
  };

  // Handle navigation from other parts of the app (like UserMenu and upgrade banner)
  useEffect(() => {
    if (location.state?.section) {
      handleSectionChange(location.state.section as SettingsSection);
      // Clear the navigation state to prevent issues on refresh
      window.history.replaceState({}, document.title, location.pathname + location.hash);
    } else if (location.hash === '#upgrade') {
      handleSectionChange('upgrade');
    } else if (location.hash === '#profile') {
      handleSectionChange('profile');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, location.hash]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'profile':
        return <ProfileSettings />;
      case 'upgrade':
        return <UpgradeSection />;
      default:
        return <GeneralSettings />;
    }
  };

  async function fetch_user() {

    console.log("hello")
    try {
      const response = await fetch("http://localhost:8000/api/users/me", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (response.status !== 200) {
        navigate("/")
        return
      }

      const current_user = await response.json()

      setUser(current_user)

    } catch (e) {
      console.log('Error fetching user')
      navigate("/")
    }
  }

  useEffect(() => {
    fetch_user();
  }, [])

  if(!user) {
    return (
      <div></div>
    )
  }

  return (
    <div className="min-h-screen bg-scraper-bg-primary">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-scraper-text-primary mb-2">Settings</h1>
          <p className="text-scraper-text-secondary">Manage your account and preferences</p>
        </div>

        <div className="flex gap-8 items-stretch">
          {/* Sidebar */}
          <div className="w-72 flex-shrink-0 self-start h-[calc(100vh-10rem)]">
            <SettingsSidebar
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-scraper-bg-card rounded-xl border border-scraper-border shadow-scraper-md transition-all duration-200 hover:shadow-scraper-lg min-h-[calc(100vh-10rem)]">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
