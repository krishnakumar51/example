import { Settings, Shield, User, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SettingsSection } from '@/pages/Settings';

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

const SettingsSidebar = ({ activeSection, onSectionChange }: SettingsSidebarProps) => {
  const sections = [
    {
      id: 'general' as SettingsSection,
      label: 'General',
      icon: Settings,
      description: 'Theme, notifications, and personalization'
    },
    {
      id: 'security' as SettingsSection,
      label: 'Security',
      icon: Shield,
      description: 'Authentication and device management'
    },
    {
      id: 'profile' as SettingsSection,
      label: 'Profile',
      icon: User,
      description: 'Account information and data management'
    },
    {
      id: 'upgrade' as SettingsSection,
      label: 'Upgrade',
      icon: Crown,
      description: 'Pro features and billing'
    }
  ];

  return (
    <div className="bg-scraper-bg-card rounded-xl border border-scraper-border p-4 shadow-scraper-md">
      <nav className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200",
                isActive
                  ? "bg-scraper-accent-primary text-white shadow-scraper-glow"
                  : "text-scraper-text-secondary hover:text-scraper-text-primary hover:bg-scraper-bg-card-hover"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 mt-0.5 flex-shrink-0",
                isActive ? "text-white" : "text-scraper-accent-primary"
              )} />
              <div className="min-w-0">
                <div className={cn(
                  "font-medium text-sm",
                  isActive ? "text-white" : "text-scraper-text-primary"
                )}>
                  {section.label}
                </div>
                <div className={cn(
                  "text-xs mt-0.5",
                  isActive ? "text-white/80" : "text-scraper-text-muted"
                )}>
                  {section.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SettingsSidebar;