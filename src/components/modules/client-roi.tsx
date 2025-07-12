'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, TrendingUp, DollarSign, Calendar, BarChart3, Download } from 'lucide-react'

interface Client {
  id: string
  name: string
  company: string
  status: 'active' | 'paused' | 'completed'
  engagement: number
  revenue: number
  startDate: string
  lastActivity: string
}

interface Metric {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
}

export default function ClientROI() {
  const [clients] = useState<Client[]>([
    {
      id: '1',
      name: 'TechCorp Inc',
      company: 'Technology',
      status: 'active',
      engagement: 87,
      revenue: 25000,
      startDate: '2024-01-01',
      lastActivity: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Startup.io',
      company: 'SaaS',
      status: 'active',
      engagement: 92,
      revenue: 18000,
      startDate: '2024-01-05',
      lastActivity: '2024-01-14T15:45:00Z'
    }
  ])

  const [metrics] = useState<Metric[]>([
    {
      label: 'Total Revenue',
      value: '$43,000',
      change: '+12%',
      trend: 'up'
    },
    {
      label: 'Active Clients',
      value: '12',
      change: '+2',
      trend: 'up'
    },
    {
      label: 'Avg Engagement',
      value: '89%',
      change: '+5%',
      trend: 'up'
    },
    {
      label: 'Client Retention',
      value: '95%',
      change: '+2%',
      trend: 'up'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Client ROI Cockpit</h2>
        <p className="text-muted-foreground">
          Track client performance, engagement metrics, and revenue generation.
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              {getTrendIcon(metric.trend)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Active Clients
              </span>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardTitle>
            <CardDescription>
              Client performance and engagement overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.map((client) => (
                <div key={client.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{client.name}</h4>
                      <p className="text-sm text-muted-foreground">{client.company}</p>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(client.status)}`}>
                      {client.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Engagement</div>
                      <div className="font-medium">{client.engagement}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Revenue</div>
                      <div className="font-medium">${client.revenue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Last Activity</div>
                      <div className="font-medium">
                        {new Date(client.lastActivity).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Generate Report</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Trends
            </CardTitle>
            <CardDescription>
              Monthly performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Revenue Growth</span>
                <span className="text-sm text-green-600">+15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Client Engagement</span>
                <span className="text-sm text-blue-600">+8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Content Performance</span>
                <span className="text-sm text-purple-600">+12%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Lead Conversion</span>
                <span className="text-sm text-orange-600">+5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common client management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Schedule Review
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              Generate Invoice
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              Performance Report
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Add Client
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 