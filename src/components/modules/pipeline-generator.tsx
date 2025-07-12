'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  company: string
  score: number
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal'
  lastActivity: string
}

interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in_progress' | 'completed'
  assignedTo: string
  dueDate: string
}

export default function PipelineGenerator() {
  const [leads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@techcorp.com',
      company: 'TechCorp Inc',
      score: 85,
      source: 'LinkedIn',
      status: 'qualified',
      lastActivity: '2024-01-15T14:30:00Z'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@startup.io',
      company: 'Startup.io',
      score: 72,
      source: 'Website',
      status: 'contacted',
      lastActivity: '2024-01-14T09:15:00Z'
    }
  ])

  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Follow up with Sarah Johnson',
      description: 'Schedule discovery call to discuss personal branding strategy',
      priority: 'high',
      status: 'todo',
      assignedTo: 'Content Team',
      dueDate: '2024-01-18T17:00:00Z'
    },
    {
      id: '2',
      title: 'Create proposal for TechCorp',
      description: 'Develop comprehensive personal branding proposal',
      priority: 'medium',
      status: 'in_progress',
      assignedTo: 'Strategy Team',
      dueDate: '2024-01-20T17:00:00Z'
    }
  ])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Pipeline Generator</h2>
        <p className="text-muted-foreground">
          Monitor lead signals and automatically generate tasks for your team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Scoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Lead Scoring
            </CardTitle>
            <CardDescription>
              AI-powered lead scoring based on engagement signals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{lead.name}</h4>
                      <p className="text-sm text-muted-foreground">{lead.company}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(lead.score)}`}>
                        {lead.score}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {lead.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{lead.source}</span>
                    <span>{new Date(lead.lastActivity).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Create Task</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Generated Tasks
            </CardTitle>
            <CardDescription>
              Automated tasks created from lead signals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                    <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {task.assignedTo}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {task.status}
                    </Badge>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="sm">Start</Button>
                    <Button variant="outline" size="sm">Complete</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Analytics</CardTitle>
          <CardDescription>
            Performance metrics and conversion rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Total Leads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">23</div>
              <div className="text-sm text-muted-foreground">Qualified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-muted-foreground">Proposals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-sm text-muted-foreground">Closed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 