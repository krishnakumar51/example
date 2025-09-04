import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User as UserIcon, Mail, Calendar, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const User = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(null)

  const navigate = useNavigate();

  async function handleLogout() {
    logout()

    navigate('/')

    await fetch("http://localhost:8000/api/auth/logout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  }

  async function fetch_user() {

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
      console.log('failed to fetch user')
      navigate("/")
    }
  }

  useEffect(() => {
    fetch_user()
  }, [])

  if (!user) {
    return (
      <div></div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-scraper-text-primary mb-2">
            User Profile
          </h1>
          <p className="text-scraper-text-muted">
            Manage your account information and preferences
          </p>
        </div>

        {/* Top banner with avatar */}
        <Card className="bg-scraper-bg-card border-scraper-border mb-6">
          <CardContent className="py-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-scraper-bg-secondary flex items-center justify-center text-scraper-text-primary text-xl font-semibold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-xl font-semibold text-scraper-text-primary">{user?.email}</div>
                <div className="text-sm text-scraper-text-muted">Member since {new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Information */}
          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-scraper-text-primary">
                <UserIcon className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription className="text-scraper-text-muted">
                Your basic account details
              </CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-scraper-text-muted" />
                <div>
                  <p className="text-sm font-medium text-scraper-text-primary">
                    Email
                  </p>
                  <p className="text-sm text-scraper-text-muted">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-scraper-text-muted" />
                <div>
                  <p className="text-sm font-medium text-scraper-text-primary">
                    Member Since
                  </p>
                  <p className="text-sm text-scraper-text-muted">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-scraper-text-muted" />
                <div>
                  <p className="text-sm font-medium text-scraper-text-primary">
                    Account Status
                  </p>
                  <p className="text-sm text-green-400">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader>
              <CardTitle className="text-scraper-text-primary">Account Actions</CardTitle>
              <CardDescription className="text-scraper-text-muted">
                Manage your account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-secondary"
              >
                Change Password
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-secondary"
              >
                Update Profile
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-scraper-border text-scraper-text-primary hover:bg-scraper-bg-secondary"
              >
                Privacy Settings
              </Button>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full justify-start"
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <Card className="bg-scraper-bg-card border-scraper-border">
            <CardHeader>
              <CardTitle className="text-scraper-text-primary">Usage Statistics</CardTitle>
              <CardDescription className="text-scraper-text-muted">
                Your activity overview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-scraper-text-muted">Scraping Sessions</span>
                <span className="text-sm font-medium text-scraper-text-primary">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-scraper-text-muted">Data Points Collected</span>
                <span className="text-sm font-medium text-scraper-text-primary">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-scraper-text-muted">Last Activity</span>
                <span className="text-sm font-medium text-scraper-text-primary">2 hours ago</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default User;