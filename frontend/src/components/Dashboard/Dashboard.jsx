import React, { useState, useEffect } from 'react';
import { CheckSquare, Clock, Target, TrendingUp, AlertCircle, Plus, RefreshCw } from 'lucide-react';
import { tasksAPI } from '../../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    tasksByPriority: [],
    tasksByStatus: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tasksAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to fetch statistics. Trying alternative method...');
      
      // Fallback: fetch tasks and calculate stats manually
      try {
        const tasksResponse = await tasksAPI.getTasks();
        const tasks = tasksResponse.data.data || [];
        
        // Calculate stats manually
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.status === 'Completed').length;
        const pendingTasks = tasks.filter(task => task.status !== 'Completed').length;
        
        // Calculate tasks by priority
        const tasksByPriority = tasks.reduce((acc, task) => {
          const priority = task.priority;
          const existing = acc.find(item => item._id === priority);
          if (existing) {
            existing.count++;
          } else {
            acc.push({ _id: priority, count: 1 });
          }
          return acc;
        }, []);
        
        // Calculate tasks by status
        const tasksByStatus = tasks.reduce((acc, task) => {
          const status = task.status;
          const existing = acc.find(item => item._id === status);
          if (existing) {
            existing.count++;
          } else {
            acc.push({ _id: status, count: 1 });
          }
          return acc;
        }, []);
        
        const calculatedStats = {
          totalTasks,
          completedTasks,
          pendingTasks,
          tasksByPriority,
          tasksByStatus,
        };
        
        setStats(calculatedStats);
        setError(null); // Clear error since fallback worked
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        setError('Unable to fetch task data. Please check your connection and try again.');
        // Set default stats if both fail
        setStats({
          totalTasks: 0,
          completedTasks: 0,
          pendingTasks: 0,
          tasksByPriority: [],
          tasksByStatus: [],
        });
      }
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse">
            <CheckSquare className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="text-lg font-medium">Loading your tasks...</div>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Removed debug logging and debug panel for production

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">Overview of your task management</p>
          </div>
          <Button 
            variant="outline" 
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-2 h-12 px-6 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Error</span>
            </div>
            <p className="text-sm text-destructive mt-1">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-l-primary group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="h-4 w-4" />
                Total Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stats.totalTasks}
                </span>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-l-blue-500 group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Todo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-blue-600">{stats.pendingTasks}</span>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-l-orange-500 group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-orange-600">{stats.tasksByStatus?.find(s => s._id === 'In Progress')?.count || 0}</span>
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-l-green-500 group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-green-600">{stats.completedTasks}</span>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckSquare className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-l-red-500 group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-red-600">{stats.tasksByPriority?.find(p => p._id === 'High')?.count || 0}</span>
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Completion Rate or Welcome Message */}
        {stats.totalTasks > 0 ? (
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50">
              <CardTitle className="flex items-center text-lg">
                <CheckSquare className="h-5 w-5 mr-2 text-green-600" />
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="flex-1 bg-muted rounded-full h-6 mr-4 shadow-inner">
                  <div
                    className="h-6 rounded-full transition-all duration-500 bg-gradient-to-r from-green-500 to-green-600"
                    style={{ 
                      width: `${(stats.completedTasks / stats.totalTasks) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {Math.round((stats.completedTasks / stats.totalTasks) * 100)}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {stats.completedTasks} of {stats.totalTasks} tasks completed
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-dashed border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
            <CardContent className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse">
                <CheckSquare className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Welcome to your Task Manager!
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
                Start organizing your tasks and boost your productivity. Create your first task to get started.
              </p>
              <Button 
                onClick={() => window.location.href = '/tasks'}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-8 text-lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Your First Task
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
