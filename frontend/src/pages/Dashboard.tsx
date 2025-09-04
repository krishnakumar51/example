import { BarChart3, TrendingUp, Globe, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const [user, setUser] = useState(null)

  const navigate = useNavigate();

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
    fetch_user()
  }, [])

  // Mock data for demonstration
  const stats = {
    totalScrapes: 1247,
    successRate: 94.5,
    averageSpeed: 3.2,
    sitesMonitored: 28,
  };

  const recentActivity = [
    { id: 1, action: 'Price comparison', site: 'amazon.com', time: '2 min ago', status: 'success' },
    { id: 2, action: 'Product scraping', site: 'flipkart.com', time: '5 min ago', status: 'success' },
    { id: 3, action: 'Review extraction', site: 'ebay.com', time: '12 min ago', status: 'error' },
    { id: 4, action: 'Inventory check', site: 'walmart.com', time: '18 min ago', status: 'success' },
    { id: 5, action: 'Price monitoring', site: 'bestbuy.com', time: '25 min ago', status: 'success' },
  ];

  const performanceMetrics = [
    { name: 'Data Accuracy', value: 96, target: 95, status: 'good' },
    { name: 'Response Time', value: 88, target: 90, status: 'warning' },
    { name: 'Uptime', value: 99.2, target: 99, status: 'good' },
    { name: 'Error Rate', value: 2.1, target: 5, status: 'good' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-scraper-accent-success" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-scraper-accent-primary" />;
      default:
        return <Clock className="w-4 h-4 text-scraper-accent-warning" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-scraper-accent-success';
      case 'warning':
        return 'text-scraper-accent-warning';
      case 'error':
        return 'text-scraper-accent-primary';
      default:
        return 'text-scraper-text-muted';
    }
  };

  if (!user) {
    return (<div></div>)
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-scraper-text-primary">Dashboard</h1>
        <p className="text-scraper-text-secondary">
          Monitor your web scraping activities and system performance
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-scraper-bg-card border-scraper-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-scraper-text-secondary">
              Total Scrapes
            </CardTitle>
            <Globe className="h-4 w-4 text-scraper-accent-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-scraper-text-primary">{stats.totalScrapes.toLocaleString()}</div>
            <p className="text-xs text-scraper-accent-success">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-scraper-bg-card border-scraper-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-scraper-text-secondary">
              Success Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-scraper-accent-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-scraper-text-primary">{stats.successRate}%</div>
            <p className="text-xs text-scraper-accent-success">
              +2.1% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-scraper-bg-card border-scraper-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-scraper-text-secondary">
              Avg Speed (sec)
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-scraper-accent-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-scraper-text-primary">{stats.averageSpeed}</div>
            <p className="text-xs text-scraper-text-muted">
              -0.3s faster than average
            </p>
          </CardContent>
        </Card>

        <Card className="bg-scraper-bg-card border-scraper-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-scraper-text-secondary">
              Sites Monitored
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-scraper-accent-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-scraper-text-primary">{stats.sitesMonitored}</div>
            <p className="text-xs text-scraper-accent-success">
              +5 new this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="bg-scraper-bg-card border-scraper-border">
          <CardHeader>
            <CardTitle className="text-scraper-text-primary">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceMetrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-scraper-text-primary">{metric.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                      {metric.value}%
                    </span>
                    <Badge
                      variant={metric.status === 'good' ? 'default' : 'secondary'}
                      className={`text-xs ${metric.status === 'good'
                        ? 'bg-scraper-accent-success/20 text-scraper-accent-success'
                        : 'bg-scraper-accent-warning/20 text-scraper-accent-warning'
                        }`}
                    >
                      Target: {metric.target}%
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={metric.value}
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-scraper-bg-card border-scraper-border">
          <CardHeader>
            <CardTitle className="text-scraper-text-primary">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-scraper-text-primary">
                      {activity.action}
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-scraper-text-muted">{activity.site}</p>
                      <span className="text-xs text-scraper-text-muted">•</span>
                      <p className="text-xs text-scraper-text-muted">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card className="bg-scraper-bg-card border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary">System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-scraper-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <Globe className="w-8 h-8 text-scraper-text-primary" />
              </div>
              <p className="text-2xl font-bold text-scraper-text-primary">24/7</p>
              <p className="text-sm text-scraper-text-muted">Monitoring Active</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-scraper-accent-success/20 border border-scraper-accent-success rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-8 h-8 text-scraper-accent-success" />
              </div>
              <p className="text-2xl font-bold text-scraper-text-primary">99.9%</p>
              <p className="text-sm text-scraper-text-muted">System Uptime</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-scraper-accent-warning/20 border border-scraper-accent-warning rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-8 h-8 text-scraper-accent-warning" />
              </div>
              <p className="text-2xl font-bold text-scraper-text-primary">Fast</p>
              <p className="text-sm text-scraper-text-muted">Response Times</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;