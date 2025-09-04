import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Calendar, Crown, BarChart3, Database, Download, Trash2, Key, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProcessingHistoryItem {
  id: string;
  type: string;
  date: string;
  size: string;
  status: 'completed' | 'processing' | 'failed';
}

const ProfileSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dataRetentionDays, setDataRetentionDays] = useState(() => {
    return parseInt(localStorage.getItem('dataRetentionDays') || '30');
  });
  const [shareAnalytics, setShareAnalytics] = useState(() => {
    return localStorage.getItem('shareAnalytics') !== 'false';
  });
  const [apiKey] = useState('sk-1234567890abcdef');
  
  // Mock data for demonstration - could be 'Free Plan' or 'Pro Plan'
  const currentPlan: 'Free Plan' | 'Pro Plan' = 'Free Plan';
  const accountCreated = 'January 15, 2024';
  const requestsUsed = 45;
  const requestsLimit = 100;
  const usagePercentage = (requestsUsed / requestsLimit) * 100;
  const resetDate = 'March 1, 2024';

  const [processingHistory] = useState<ProcessingHistoryItem[]>([
    {
      id: '1',
      type: 'Website Scraping',
      date: '2024-02-28 14:30',
      size: '2.3 MB',
      status: 'completed'
    },
    {
      id: '2',
      type: 'Data Analysis',
      date: '2024-02-27 09:15',
      size: '1.8 MB',
      status: 'completed'
    },
    {
      id: '3',
      type: 'Text Processing',
      date: '2024-02-26 16:45',
      size: '0.9 MB',
      status: 'failed'
    }
  ]);

  const handleDeleteData = (id: string) => {
    toast({
      title: "Data deleted",
      description: "The selected data entry has been deleted successfully.",
    });
  };

  const handleBulkDelete = () => {
    toast({
      title: "Bulk delete",
      description: "All selected data entries have been deleted.",
    });
  };

  const handleExportData = (type: string) => {
    toast({
      title: "Export started",
      description: `Your ${type} export is being prepared and will be available shortly.`,
    });
  };

  const handleGenerateApiKey = () => {
    toast({
      title: "API Key generated",
      description: "A new API key has been generated successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-scraper-accent-success';
      case 'processing':
        return 'bg-scraper-accent-secondary';
      case 'failed':
        return 'bg-destructive';
      default:
        return 'bg-scraper-accent-primary';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-scraper-text-primary mb-1">Profile Settings</h2>
        <p className="text-scraper-text-secondary">Manage your account information and data</p>
      </div>

      {/* Account Information */}
      <Card className="bg-scraper-bg-secondary border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary flex items-center gap-2">
            <User className="w-5 h-5 text-scraper-accent-primary" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-scraper-text-secondary">Email</Label>
              <p className="text-scraper-text-primary font-medium">{user?.email}</p>
            </div>
            <div>
              <Label className="text-scraper-text-secondary">Full Name</Label>
              <p className="text-scraper-text-primary font-medium">{user?.fullName}</p>
            </div>
            <div>
              <Label className="text-scraper-text-secondary">Current Plan</Label>
              <div className="flex items-center gap-2">
                <p className="text-scraper-text-primary font-medium">{currentPlan}</p>
                <Badge className="bg-scraper-bg-primary text-scraper-text-secondary">
                  {currentPlan === 'Free Plan' ? 'Free' : 'Pro'}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-scraper-text-secondary">Member Since</Label>
              <p className="text-scraper-text-primary font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {accountCreated}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage & Limits */}
      <Card className="bg-scraper-bg-secondary border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-scraper-accent-primary" />
            Usage & Limits
          </CardTitle>
          <CardDescription className="text-scraper-text-secondary">
            Track your current usage and limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-scraper-text-primary">Requests This Month</Label>
              <span className="text-scraper-text-secondary text-sm">
                {requestsUsed} / {requestsLimit}
              </span>
            </div>
            <Progress 
              value={usagePercentage} 
              className="h-3 bg-scraper-bg-primary"
            />
            <p className="text-sm text-scraper-text-muted mt-2">
              Resets on {resetDate}
            </p>
          </div>

          {currentPlan === 'Free Plan' && (
            <div className="p-4 bg-scraper-accent-secondary/10 border border-scraper-accent-secondary/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-scraper-accent-secondary" />
                <div>
                  <p className="text-scraper-text-primary font-medium">Upgrade to Pro</p>
                  <p className="text-sm text-scraper-text-muted">Get unlimited requests and priority support</p>
                </div>
                <Button 
                  className="ml-auto bg-scraper-accent-secondary hover:bg-scraper-accent-secondary/90 text-white"
                >
                  Upgrade Now
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-scraper-bg-secondary border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary flex items-center gap-2">
            <Database className="w-5 h-5 text-scraper-accent-primary" />
            Data Management
          </CardTitle>
          <CardDescription className="text-scraper-text-secondary">
            View and manage your processing history
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium text-scraper-text-primary">Processing History</h4>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBulkDelete}
                className="border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-card-hover"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Bulk Delete
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {processingHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-scraper-bg-primary rounded-lg border border-scraper-border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-scraper-text-primary">{item.type}</p>
                    <Badge className={`${getStatusColor(item.status)} text-white text-xs`}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-scraper-text-muted mt-1">
                    {item.date} • {item.size}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteData(item.id)}
                  className="border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-card-hover"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="bg-scraper-bg-secondary border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary flex items-center gap-2">
            <Download className="w-5 h-5 text-scraper-accent-primary" />
            Export Options
          </CardTitle>
          <CardDescription className="text-scraper-text-secondary">
            Download your data and chat history
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline"
              onClick={() => handleExportData('chat history')}
              className="border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-card-hover"
            >
              <Download className="w-4 h-4 mr-2" />
              Chat History
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleExportData('processed data')}
              className="border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-card-hover"
            >
              <Download className="w-4 h-4 mr-2" />
              Processed Data
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleExportData('account data')}
              className="border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-card-hover"
            >
              <Download className="w-4 h-4 mr-2" />
              Account Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="bg-scraper-bg-secondary border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary flex items-center gap-2">
            <Shield className="w-5 h-5 text-scraper-accent-primary" />
            Privacy Settings
          </CardTitle>
          <CardDescription className="text-scraper-text-secondary">
            Control your privacy and data sharing preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-scraper-text-primary">Share Usage Analytics</Label>
              <p className="text-sm text-scraper-text-muted">Help us improve by sharing anonymous usage data</p>
            </div>
            <Switch
              checked={shareAnalytics}
              onCheckedChange={(checked) => {
                setShareAnalytics(checked);
                localStorage.setItem('shareAnalytics', checked.toString());
              }}
              className="data-[state=checked]:bg-scraper-accent-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* API Access - Only show for Pro Plan users */}
      {currentPlan !== 'Free Plan' && (
        <Card className="bg-scraper-bg-secondary border-scraper-border">
          <CardHeader>
            <CardTitle className="text-scraper-text-primary flex items-center gap-2">
              <Key className="w-5 h-5 text-scraper-accent-primary" />
              API Access
            </CardTitle>
            <CardDescription className="text-scraper-text-secondary">
              Manage your API keys and access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-scraper-text-primary">API Key</Label>
              <div className="flex items-center gap-3 mt-2">
                <code className="bg-scraper-bg-primary p-2 rounded border border-scraper-border text-scraper-text-secondary flex-1">
                  {apiKey}
                </code>
                <Button 
                  variant="outline"
                  onClick={handleGenerateApiKey}
                  className="border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-card-hover"
                >
                  Regenerate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileSettings;