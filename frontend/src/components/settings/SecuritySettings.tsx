import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Smartphone, Monitor, MapPin, Clock, LogOut, Key, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface LoginSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

const SecuritySettings = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [mfaEnabled, setMfaEnabled] = useState(false);
  
  const [loginSessions] = useState<LoginSession[]>([
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'New York, US',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'New York, US',
      lastActive: '2 hours ago',
      current: false
    },
    {
      id: '3',
      device: 'Firefox on macOS',
      location: 'San Francisco, US',
      lastActive: '1 day ago',
      current: false
    }
  ]);

  const handleLogoutDevice = (sessionId: string) => {
    toast({
      title: "Device logged out",
      description: "The selected device has been logged out successfully.",
    });
  };

  const handleLogoutAllDevices = () => {
    toast({
      title: "All devices logged out",
      description: "You have been logged out from all devices except this one.",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Password change",
      description: "Password change functionality would be implemented here.",
    });
  };

  const handleSetupMFA = () => {
    toast({
      title: "MFA Setup",
      description: "Multi-factor authentication setup would be implemented here.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-scraper-text-primary mb-1">Security Settings</h2>
        <p className="text-scraper-text-secondary">Manage your authentication and device security</p>
      </div>

      {/* Authentication */}
      <Card className="bg-scraper-bg-secondary border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary flex items-center gap-2">
            <Shield className="w-5 h-5 text-scraper-accent-primary" />
            Authentication
          </CardTitle>
          <CardDescription className="text-scraper-text-secondary">
            Secure your account with additional protection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-scraper-text-primary">Multi-Factor Authentication</Label>
              <p className="text-sm text-scraper-text-muted">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={mfaEnabled}
                onCheckedChange={setMfaEnabled}
                className="data-[state=checked]:bg-scraper-accent-primary"
              />
              {!mfaEnabled && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSetupMFA}
                  className="border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-card-hover"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Setup
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-scraper-text-primary">Change Password</Label>
              <p className="text-sm text-scraper-text-muted">Update your account password</p>
            </div>
            <Button 
              variant="outline"
              onClick={handleChangePassword}
              className="border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-card-hover"
            >
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Device Management */}
      <Card className="bg-scraper-bg-secondary border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary flex items-center gap-2">
            <Monitor className="w-5 h-5 text-scraper-accent-primary" />
            Device Management
          </CardTitle>
          <CardDescription className="text-scraper-text-secondary">
            View and manage devices that have access to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button 
              variant="outline"
              onClick={() => logout()}
              className="border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-card-hover"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out from this device
            </Button>
            <Button 
              variant="destructive"
              onClick={handleLogoutAllDevices}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out of all devices
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-scraper-text-primary flex items-center gap-2">
              <Activity className="w-5 h-5 text-scraper-accent-primary" />
              Active Sessions
            </h4>
            
            {loginSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-scraper-bg-primary rounded-lg border border-scraper-border"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-scraper-bg-card rounded-lg">
                    {session.device.includes('iPhone') ? (
                      <Smartphone className="w-5 h-5 text-scraper-accent-primary" />
                    ) : (
                      <Monitor className="w-5 h-5 text-scraper-accent-primary" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-scraper-text-primary">{session.device}</p>
                      {session.current && (
                        <Badge className="bg-scraper-accent-success text-white">Current</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-scraper-text-muted">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {session.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.lastActive}
                      </span>
                    </div>
                  </div>
                </div>
                
                {!session.current && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLogoutDevice(session.id)}
                    className="border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-card-hover"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Log out
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;