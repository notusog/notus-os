export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar_url?: string
  created_at: string
  updated_at: string
  preferences: UserPreferences
}

export type UserRole = 'content_strategist' | 'client' | 'gtm_team' | 'leadership'

export interface UserPreferences {
  theme: 'light' | 'dark'
  notifications: boolean
  modules: {
    insight_extractor: boolean
    content_engine: boolean
    pipeline_generator: boolean
    client_roi: boolean
  }
}

export interface Workspace {
  id: string
  name: string
  description?: string
  owner_id: string
  created_at: string
  updated_at: string
  members: WorkspaceMember[]
}

export interface WorkspaceMember {
  user_id: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  joined_at: string
}

export interface Content {
  id: string
  title: string
  content: string
  type: ContentType
  status: ContentStatus
  channel: Channel
  workspace_id: string
  created_by: string
  created_at: string
  updated_at: string
  scheduled_for?: string
  published_at?: string
  metadata: ContentMetadata
}

export type ContentType = 'post' | 'article' | 'newsletter' | 'video' | 'lead_magnet'
export type ContentStatus = 'draft' | 'review' | 'approved' | 'scheduled' | 'published' | 'archived'
export type Channel = 'linkedin' | 'newsletter' | 'youtube' | 'lead_magnet'

export interface ContentMetadata {
  tags: string[]
  voiceprint?: Voiceprint
  ai_generated: boolean
  word_count: number
  read_time?: number
  engagement_metrics?: EngagementMetrics
}

export interface Voiceprint {
  tone: string
  style: string
  topics: string[]
  keywords: string[]
  brand_voice: string
}

export interface EngagementMetrics {
  views: number
  likes: number
  shares: number
  comments: number
  clicks: number
  conversions: number
}

export interface Insight {
  id: string
  title: string
  content: string
  type: 'topic' | 'nugget' | 'voiceprint'
  source_file: string
  workspace_id: string
  created_by: string
  created_at: string
  tags: string[]
  confidence_score: number
}

export interface Lead {
  id: string
  name: string
  email: string
  company?: string
  source: string
  status: LeadStatus
  score: number
  workspace_id: string
  created_at: string
  updated_at: string
  notes: string[]
  interactions: LeadInteraction[]
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'

export interface LeadInteraction {
  id: string
  type: 'email' | 'call' | 'meeting' | 'content_engagement'
  description: string
  date: string
  outcome?: string
}

export interface Task {
  id: string
  title: string
  description: string
  type: TaskType
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: TaskStatus
  assigned_to?: string
  workspace_id: string
  created_by: string
  created_at: string
  due_date?: string
  completed_at?: string
  tags: string[]
}

export type TaskType = 'content_creation' | 'lead_follow_up' | 'client_approval' | 'research' | 'strategy'
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed' | 'cancelled'

export interface Analytics {
  period: string
  metrics: {
    content_published: number
    engagement_rate: number
    lead_generated: number
    conversion_rate: number
    revenue_generated: number
  }
  channel_breakdown: Record<Channel, {
    posts: number
    engagement: number
    reach: number
  }>
  top_content: Content[]
  lead_sources: Record<string, number>
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  user_id: string
  read: boolean
  created_at: string
  action_url?: string
}

export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
} 