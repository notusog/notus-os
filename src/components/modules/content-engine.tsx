'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Calendar, Linkedin, Mail, Youtube, FileText, Clock, CheckCircle } from 'lucide-react'

interface Content {
  id: string
  title: string
  content: string
  channel: 'linkedin' | 'newsletter' | 'youtube' | 'lead_magnet'
  status: 'draft' | 'scheduled' | 'published'
  scheduledFor?: string
  publishedAt?: string
}

export default function ContentEngine() {
  const [contents, setContents] = useState<Content[]>([
    {
      id: '1',
      title: 'Personal Branding Tips for B2B Leaders',
      content: 'Building a strong personal brand in the B2B space requires consistency, authenticity, and strategic content distribution...',
      channel: 'linkedin',
      status: 'published',
      publishedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Weekly Industry Insights',
      content: 'This week we explore the latest trends in B2B marketing and how they impact personal branding strategies...',
      channel: 'newsletter',
      status: 'scheduled',
      scheduledFor: '2024-01-20T09:00:00Z'
    }
  ])
  const [activeChannel, setActiveChannel] = useState<'linkedin' | 'newsletter' | 'youtube' | 'lead_magnet'>('linkedin')

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'linkedin': return <Linkedin className="h-4 w-4" />
      case 'newsletter': return <Mail className="h-4 w-4" />
      case 'youtube': return <Youtube className="h-4 w-4" />
      case 'lead_magnet': return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Draft</Badge>
      case 'scheduled':
        return <Badge variant="secondary">Scheduled</Badge>
      case 'published':
        return <Badge variant="default">Published</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Content Engine</h2>
        <p className="text-muted-foreground">
          Create, schedule, and manage content across multiple channels with AI-powered assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Creation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create Content
              </CardTitle>
              <CardDescription>
                Generate new content for your channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="channel">Channel</Label>
                <select
                  id="channel"
                  className="w-full p-2 border rounded-md"
                  value={activeChannel}
                  onChange={(e) => setActiveChannel(e.target.value as any)}
                >
                  <option value="linkedin">LinkedIn</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="youtube">YouTube</option>
                  <option value="lead_magnet">Lead Magnet</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter content title..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your content here..."
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule (Optional)</Label>
                <Input
                  id="schedule"
                  type="datetime-local"
                />
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Draft
                </Button>
                <Button variant="outline" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Content Pipeline</CardTitle>
              <CardDescription>
                Manage your content across all channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="draft">Drafts</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="published">Published</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {contents.map((content) => (
                    <div key={content.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getChannelIcon(content.channel)}
                          <h4 className="font-medium">{content.title}</h4>
                        </div>
                        {getStatusBadge(content.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {content.content}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span className="capitalize">{content.channel}</span>
                          {content.scheduledFor && (
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(content.scheduledFor).toLocaleDateString()}
                            </span>
                          )}
                          {content.publishedAt && (
                            <span className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {new Date(content.publishedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 