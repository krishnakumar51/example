import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Moon, Sun, Monitor, Bell, BellOff, Brain, History } from 'lucide-react';

const GeneralSettings = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [emailNotifications, setEmailNotifications] = useState(() => {
    return localStorage.getItem('emailNotifications') !== 'false';
  });
  const [browserNotifications, setBrowserNotifications] = useState(() => {
    return localStorage.getItem('browserNotifications') === 'true';
  });
  const [notificationFrequency, setNotificationFrequency] = useState(() => {
    return localStorage.getItem('notificationFrequency') || 'daily';
  });
  const [memoryEnabled, setMemoryEnabled] = useState(() => {
    return localStorage.getItem('memoryEnabled') !== 'false';
  });
  const [chatHistoryEnabled, setChatHistoryEnabled] = useState(() => {
    return localStorage.getItem('chatHistoryEnabled') !== 'false';
  });

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'auto', label: 'Auto', icon: Monitor }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-scraper-text-primary mb-1">General Settings</h2>
        <p className="text-scraper-text-secondary">Customize your experience and preferences</p>
      </div>

      {/* Theme Settings */}
      <Card className="bg-scraper-bg-secondary border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary flex items-center gap-2">
            <Moon className="w-5 h-5 text-scraper-accent-primary" />
            Theme Options
          </CardTitle>
          <CardDescription className="text-scraper-text-secondary">
            Choose your preferred color scheme
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={theme} onValueChange={(value) => {
            setTheme(value);
            localStorage.setItem('theme', value);
          }} className="grid grid-cols-3 gap-4">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value}
                    className="border-scraper-border data-[state=checked]:bg-scraper-accent-primary data-[state=checked]:border-scraper-accent-primary"
                  />
                  <Label 
                    htmlFor={option.value} 
                    className="flex items-center gap-2 text-scraper-text-primary cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                    {option.label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-scraper-bg-secondary border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary flex items-center gap-2">
            <Bell className="w-5 h-5 text-scraper-accent-primary" />
            Notifications
          </CardTitle>
          <CardDescription className="text-scraper-text-secondary">
            Manage how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-scraper-text-primary">Email Notifications</Label>
              <p className="text-sm text-scraper-text-muted">Receive updates via email</p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={(checked) => {
                setEmailNotifications(checked);
                localStorage.setItem('emailNotifications', checked.toString());
              }}
              className="data-[state=checked]:bg-scraper-accent-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-scraper-text-primary">Browser Notifications</Label>
              <p className="text-sm text-scraper-text-muted">Get notified in your browser</p>
            </div>
            <Switch
              checked={browserNotifications}
              onCheckedChange={(checked) => {
                setBrowserNotifications(checked);
                localStorage.setItem('browserNotifications', checked.toString());
              }}
              className="data-[state=checked]:bg-scraper-accent-primary"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-scraper-text-primary">Notification Frequency</Label>
            <Select value={notificationFrequency} onValueChange={(value) => {
              setNotificationFrequency(value);
              localStorage.setItem('notificationFrequency', value);
            }}>
              <SelectTrigger className="bg-scraper-input-bg border-scraper-border text-scraper-text-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-scraper-bg-card border-scraper-border">
                <SelectItem value="instant" className="text-scraper-text-primary hover:bg-scraper-bg-card-hover">Instant</SelectItem>
                <SelectItem value="daily" className="text-scraper-text-primary hover:bg-scraper-bg-card-hover">Daily Digest</SelectItem>
                <SelectItem value="weekly" className="text-scraper-text-primary hover:bg-scraper-bg-card-hover">Weekly Summary</SelectItem>
                <SelectItem value="never" className="text-scraper-text-primary hover:bg-scraper-bg-card-hover">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Personalization */}
      <Card className="bg-scraper-bg-secondary border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary flex items-center gap-2">
            <Brain className="w-5 h-5 text-scraper-accent-primary" />
            Personalization
          </CardTitle>
          <CardDescription className="text-scraper-text-secondary">
            Control how the AI learns and remembers your preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-scraper-text-primary">Memory Settings</Label>
              <p className="text-sm text-scraper-text-muted">Allow AI to remember your preferences across sessions</p>
            </div>
            <Switch
              checked={memoryEnabled}
              onCheckedChange={(checked) => {
                setMemoryEnabled(checked);
                localStorage.setItem('memoryEnabled', checked.toString());
              }}
              className="data-[state=checked]:bg-scraper-accent-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-scraper-text-primary">Chat History</Label>
              <p className="text-sm text-scraper-text-muted">Save and display your conversation history</p>
            </div>
            <Switch
              checked={chatHistoryEnabled}
              onCheckedChange={(checked) => {
                setChatHistoryEnabled(checked);
                localStorage.setItem('chatHistoryEnabled', checked.toString());
              }}
              className="data-[state=checked]:bg-scraper-accent-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-scraper-accent-primary hover:bg-scraper-button-hover text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettings;