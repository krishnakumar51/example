import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, X, Zap, Headphones, Database, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UpgradeSection = () => {
  const { toast } = useToast();

  const handleUpgrade = () => {
    toast({
      title: "Upgrade initiated",
      description: "Redirecting to payment processing...",
    });
  };

  const features = [
    {
      category: 'Usage Limits',
      items: [
        { name: 'Monthly Requests', free: '100', pro: 'Unlimited' },
        { name: 'Data Processing', free: '10 MB', pro: 'Unlimited' },
        { name: 'Chat History', free: '30 days', pro: 'Forever' },
        { name: 'API Access', free: false, pro: true },
      ]
    },
    {
      category: 'Features',
      items: [
        { name: 'Priority Processing', free: false, pro: true },
        { name: 'Advanced Analytics', free: false, pro: true },
        { name: 'Custom Integrations', free: false, pro: true },
        { name: 'Batch Processing', free: false, pro: true },
      ]
    },
    {
      category: 'Support',
      items: [
        { name: 'Email Support', free: true, pro: true },
        { name: 'Priority Support', free: false, pro: true },
        { name: 'Phone Support', free: false, pro: true },
        { name: 'Dedicated Account Manager', free: false, pro: true },
      ]
    }
  ];

  const renderFeatureValue = (value: string | boolean, isPro = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-scraper-accent-success" />
      ) : (
        <X className="w-5 h-5 text-scraper-text-muted" />
      );
    }
    return (
      <span className={isPro ? 'text-scraper-accent-primary font-medium' : 'text-scraper-text-secondary'}>
        {value}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-scraper-text-primary mb-1">Upgrade to Pro</h2>
        <p className="text-scraper-text-secondary">Unlock unlimited potential with our Pro plan</p>
      </div>

      {/* Upgrade Banner */}
      <Card className="bg-scraper-gradient-primary border-0 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl">
              <Crown className="w-8 h-8" />
            </div>
            <div>
              <CardTitle className="text-2xl">Pro Plan</CardTitle>
              <CardDescription className="text-white/80 text-lg">
                Everything you need to scale your operations
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative">
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold">$25</span>
            <span className="text-white/80">/month</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm">Unlimited Requests</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              <span className="text-sm">No Data Limits</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5" />
              <span className="text-sm">Priority Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Faster Processing</span>
            </div>
          </div>
          
          <Button 
            onClick={handleUpgrade}
            className="bg-white text-scraper-accent-primary hover:bg-white/90 font-semibold px-8 py-3 text-lg"
          >
            Upgrade Now
          </Button>
        </CardContent>
      </Card>

      {/* Feature Comparison */}
      <Card className="bg-scraper-bg-secondary border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary">Feature Comparison</CardTitle>
          <CardDescription className="text-scraper-text-secondary">
            See what's included in each plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {features.map((category) => (
              <div key={category.category}>
                <h4 className="text-lg font-semibold text-scraper-text-primary mb-4 flex items-center gap-2">
                  {category.category}
                </h4>
                
                <div className="space-y-3">
                  <div className="grid gap-4 pb-2 border-b border-scraper-border grid-cols-[1fr_200px_200px] md:grid-cols-[1fr_240px_240px]">
                    <div className="text-scraper-text-secondary font-medium">Feature</div>
                    <div className="text-center">
                      <Badge variant="outline" className="border-scraper-border text-scraper-text-secondary">
                        Free Plan
                      </Badge>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-scraper-accent-primary text-white">
                        Pro Plan
                      </Badge>
                    </div>
                  </div>
                  
                  {category.items.map((item) => (
                    <div key={item.name} className="grid gap-4 py-2 items-center grid-cols-[1fr_200px_200px] md:grid-cols-[1fr_240px_240px]">
                      <div className="text-scraper-text-primary">{item.name}</div>
                      <div className="text-center">
                        {renderFeatureValue(item.free)}
                      </div>
                      <div className="text-center">
                        {renderFeatureValue(item.pro, true)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="bg-scraper-bg-secondary border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary">Why Upgrade?</CardTitle>
          <CardDescription className="text-scraper-text-secondary">
            Benefits you'll get with Pro plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-scraper-accent-primary/20 rounded-lg mt-0.5">
                  <Zap className="w-5 h-5 text-scraper-accent-primary" />
                </div>
                <div>
                  <h5 className="font-medium text-scraper-text-primary">Unlimited Processing</h5>
                  <p className="text-sm text-scraper-text-muted">No more monthly limits. Process as much data as you need.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-scraper-accent-success/20 rounded-lg mt-0.5">
                  <Clock className="w-5 h-5 text-scraper-accent-success" />
                </div>
                <div>
                  <h5 className="font-medium text-scraper-text-primary">Priority Processing</h5>
                  <p className="text-sm text-scraper-text-muted">Your requests get processed faster with priority queue access.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-scraper-accent-secondary/20 rounded-lg mt-0.5">
                  <Headphones className="w-5 h-5 text-scraper-accent-secondary" />
                </div>
                <div>
                  <h5 className="font-medium text-scraper-text-primary">Premium Support</h5>
                  <p className="text-sm text-scraper-text-muted">Get priority email, phone, and chat support from our team.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-scraper-accent-primary/20 rounded-lg mt-0.5">
                  <Database className="w-5 h-5 text-scraper-accent-primary" />
                </div>
                <div>
                  <h5 className="font-medium text-scraper-text-primary">Advanced Features</h5>
                  <p className="text-sm text-scraper-text-muted">Access to API, batch processing, and advanced analytics.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpgradeSection;