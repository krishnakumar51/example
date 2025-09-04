import { Target, TrendingUp, Shield, Clock, Database, Zap, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Metrics = () => {

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Mock data quality metrics
  const qualityMetrics = [
    {
      id: 'accuracy',
      name: 'Data Accuracy',
      description: 'Precision of extracted information',
      value: 96.8,
      target: 95,
      status: 'excellent',
      icon: Target,
      trend: '+2.3%',
      details: 'Field validation success rate',
    },
    {
      id: 'completeness',
      name: 'Data Completeness',
      description: 'Coverage of required data fields',
      value: 92.4,
      target: 90,
      status: 'good',
      icon: Database,
      trend: '+1.8%',
      details: 'Missing data identification',
    },
    {
      id: 'validity',
      name: 'Data Validity',
      description: 'Format compliance and structure',
      value: 98.1,
      target: 95,
      status: 'excellent',
      icon: CheckCircle2,
      trend: '+0.5%',
      details: 'Schema validation success',
    },
    {
      id: 'timeliness',
      name: 'Data Timeliness',
      description: 'Speed of data extraction and processing',
      value: 88.7,
      target: 85,
      status: 'good',
      icon: Clock,
      trend: '-0.3%',
      details: 'Real-time processing efficiency',
    },
    {
      id: 'uniqueness',
      name: 'Data Uniqueness',
      description: 'Duplicate detection and prevention',
      value: 94.2,
      target: 92,
      status: 'good',
      icon: Shield,
      trend: '+3.1%',
      details: 'Deduplication accuracy',
    },
    {
      id: 'consistency',
      name: 'Data Consistency',
      description: 'Standardization across sources',
      value: 91.5,
      target: 88,
      status: 'good',
      icon: TrendingUp,
      trend: '+1.2%',
      details: 'Cross-platform normalization',
    },
  ];

  const systemMetrics = [
    { name: 'API Response Time', value: '234ms', status: 'good' },
    { name: 'Data Processing Rate', value: '15.2k/hr', status: 'excellent' },
    { name: 'Error Rate', value: '0.8%', status: 'good' },
    { name: 'Throughput', value: '2.3GB/hr', status: 'excellent' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-scraper-accent-success';
      case 'good':
        return 'text-scraper-accent-secondary';
      case 'warning':
        return 'text-scraper-accent-warning';
      case 'error':
        return 'text-scraper-accent-primary';
      default:
        return 'text-scraper-text-muted';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-scraper-accent-success/20 text-scraper-accent-success border-scraper-accent-success';
      case 'good':
        return 'bg-scraper-accent-secondary/20 text-scraper-accent-secondary border-scraper-accent-secondary';
      case 'warning':
        return 'bg-scraper-accent-warning/20 text-scraper-accent-warning border-scraper-accent-warning';
      case 'error':
        return 'bg-scraper-accent-primary/20 text-scraper-accent-primary border-scraper-accent-primary';
      default:
        return 'bg-scraper-bg-secondary text-scraper-text-muted border-scraper-border';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-scraper-accent-success';
      case 'good':
        return 'bg-scraper-accent-secondary';
      case 'warning':
        return 'bg-scraper-accent-warning';
      case 'error':
        return 'bg-scraper-accent-primary';
      default:
        return 'bg-scraper-text-muted';
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
    fetch_user()
  }, [])

  if(!user) {
    return (
      <div></div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-scraper-text-primary">Metrics Center</h1>
        <p className="text-scraper-text-secondary">
          Comprehensive data quality and AI agent performance analytics
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemMetrics.map((metric) => (
          <Card key={metric.name} className="bg-scraper-bg-card border-scraper-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-scraper-text-muted">{metric.name}</p>
                  <p className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}
                  </p>
                </div>
                <div className={`w-2 h-8 rounded-full ${getProgressColor(metric.status)}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Quality Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {qualityMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.id} className="bg-scraper-bg-card border-scraper-border hover:bg-scraper-bg-card-hover transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${metric.status === 'excellent' ? 'bg-scraper-accent-success/20' : 'bg-scraper-accent-secondary/20'
                      }`}>
                      <Icon className={`w-5 h-5 ${getStatusColor(metric.status)}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-scraper-text-primary">{metric.name}</CardTitle>
                      <p className="text-sm text-scraper-text-muted mt-1">{metric.description}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusBadge(metric.status)} border`}>
                    {metric.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-scraper-text-primary">
                      {metric.value}%
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-scraper-text-muted">Target: {metric.target}%</span>
                      <span className={`text-sm font-medium ${metric.trend.startsWith('+') ? 'text-scraper-accent-success' : 'text-scraper-accent-primary'
                        }`}>
                        {metric.trend}
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <Progress value={metric.value} className="h-3" />
                    <div
                      className="absolute top-0 h-3 w-1 bg-scraper-text-muted rounded-sm opacity-60"
                      style={{ left: `${metric.target}%` }}
                    />
                  </div>

                  <p className="text-xs text-scraper-text-muted">{metric.details}</p>
                </div>

                {/* Performance Indicator */}
                <div className="flex items-center justify-between pt-2 border-t border-scraper-border">
                  <span className="text-xs text-scraper-text-muted">Performance</span>
                  <div className="flex items-center space-x-2">
                    {metric.value >= metric.target ? (
                      <CheckCircle2 className="w-4 h-4 text-scraper-accent-success" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-scraper-accent-warning" />
                    )}
                    <span className={`text-sm font-medium ${metric.value >= metric.target ? 'text-scraper-accent-success' : 'text-scraper-accent-warning'
                      }`}>
                      {metric.value >= metric.target ? 'Above Target' : 'Below Target'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Agent Performance Summary */}
      <Card className="bg-scraper-bg-card border-scraper-border">
        <CardHeader>
          <CardTitle className="text-scraper-text-primary flex items-center space-x-2">
            <Zap className="w-5 h-5 text-scraper-accent-primary" />
            <span>AI Agent Performance Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-scraper-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-scraper-glow">
                <Target className="w-10 h-10 text-scraper-text-primary" />
              </div>
              <p className="text-3xl font-bold text-scraper-text-primary mb-2">94.7%</p>
              <p className="text-sm text-scraper-text-secondary font-medium">Overall Quality Score</p>
              <p className="text-xs text-scraper-text-muted mt-1">Weighted average across all metrics</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-scraper-accent-success/20 border-2 border-scraper-accent-success rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-scraper-accent-success" />
              </div>
              <p className="text-3xl font-bold text-scraper-text-primary mb-2">+12%</p>
              <p className="text-sm text-scraper-text-secondary font-medium">Month-over-Month Growth</p>
              <p className="text-xs text-scraper-text-muted mt-1">Continuous improvement trend</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-scraper-accent-secondary/20 border-2 border-scraper-accent-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-10 h-10 text-scraper-accent-secondary" />
              </div>
              <p className="text-3xl font-bold text-scraper-text-primary mb-2">2.8M</p>
              <p className="text-sm text-scraper-text-secondary font-medium">Data Points Processed</p>
              <p className="text-xs text-scraper-text-muted mt-1">Across all quality dimensions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Metrics;