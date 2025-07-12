# notus OS - Personal Branding & Content Management Platform

A premium SaaS platform for managing personal branding, content creation, and multi-channel distribution in B2B agencies. Built with Next.js 14, React, Supabase, and OpenAI.

## 🚀 Features

### Core Modules

#### 1. **Insight Extractor**
- Upload audio, video, or text content
- AI-powered transcription and analysis
- Extract topics, nuggets, and voiceprint analysis
- Export insights in JSON format
- Confidence scoring for extracted insights

#### 2. **Content Engine**
- Multi-channel content creation (LinkedIn, Newsletter, YouTube, Lead Magnets)
- AI-powered content drafting and optimization
- Drag-and-drop scheduling calendar
- Content pipeline management
- Preview and editing capabilities

#### 3. **Pipeline Generator**
- Automated lead scoring based on engagement signals
- Task generation from lead interactions
- Performance analytics and conversion tracking
- Integration with LinkedIn and YouTube APIs

#### 4. **Client ROI Cockpit**
- Client performance tracking
- Revenue and engagement metrics
- Automated reporting and analytics
- Client portal for approvals and feedback

### Additional Features

- **Role-based Access Control**: Content Strategist, Client, GTM Team, Leadership
- **AI Integrations**: OpenAI for content generation and analysis
- **Multi-channel Distribution**: LinkedIn, YouTube, Email, Lead Magnets
- **Analytics Dashboard**: Real-time performance metrics
- **Mobile Responsive**: Optimized for all devices
- **Modular Architecture**: Toggleable features for phased adoption

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI components
- **Backend**: Supabase (Auth, Database, Storage)
- **AI**: OpenAI API (GPT-4, Whisper)
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Forms**: React Hook Form, Zod validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm or yarn
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd notus-os
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Optional: Email Service (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key

# Optional: LinkedIn API
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Optional: YouTube API
YOUTUBE_API_KEY=your_youtube_api_key
```

### 4. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and API keys from the project settings
3. Run the database migrations (see Database Schema section below)

### 5. OpenAI Setup

1. Create an account at [openai.com](https://openai.com)
2. Generate an API key from your dashboard
3. Add the key to your `.env.local` file

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'content_strategist',
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Workspaces Table
```sql
CREATE TABLE workspaces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Content Table
```sql
CREATE TABLE content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  channel TEXT NOT NULL,
  workspace_id UUID REFERENCES workspaces(id),
  created_by UUID REFERENCES users(id),
  scheduled_for TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Insights Table
```sql
CREATE TABLE insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  type TEXT NOT NULL,
  source_file TEXT,
  workspace_id UUID REFERENCES workspaces(id),
  created_by UUID REFERENCES users(id),
  tags TEXT[],
  confidence_score DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Leads Table
```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  source TEXT,
  status TEXT DEFAULT 'new',
  score INTEGER DEFAULT 0,
  workspace_id UUID REFERENCES workspaces(id),
  notes TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔧 Configuration

### Supabase Row Level Security (RLS)

Enable RLS on all tables and create policies:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Example policy for workspaces
CREATE POLICY "Users can view their own workspaces" ON workspaces
  FOR SELECT USING (auth.uid() = owner_id);
```

### API Routes

The application includes the following API routes:

- `/api/auth/*` - Authentication endpoints
- `/api/content/*` - Content management
- `/api/insights/*` - Insight extraction
- `/api/leads/*` - Lead management
- `/api/analytics/*` - Analytics and reporting

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Ensure all environment variables are set in your production environment:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

## 📱 Usage

### Getting Started

1. **Sign Up**: Create a new account or sign in
2. **Create Workspace**: Set up your first workspace
3. **Upload Content**: Use the Insight Extractor to analyze your content
4. **Create Content**: Use the Content Engine to create and schedule posts
5. **Monitor Performance**: Track metrics in the Client ROI Cockpit

### User Roles

- **Content Strategist**: Full access to all features
- **Client**: Read-only dashboard with approval capabilities
- **GTM Team**: Lead management and task generation
- **Leadership**: Admin oversight and module management

## 🔒 Security

- Row Level Security (RLS) enabled on all database tables
- JWT-based authentication via Supabase Auth
- API rate limiting and validation
- Secure environment variable handling
- HTTPS enforcement in production

## 🧪 Testing

```bash
# Run tests
npm run test

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 📈 Performance

- Optimized for <2s load times
- Image optimization with Next.js
- Code splitting and lazy loading
- CDN integration via Vercel
- Database query optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Contact the development team

## 🔄 Updates

Stay updated with the latest features and improvements:

- Follow the GitHub repository
- Check the releases page for updates
- Subscribe to the newsletter for announcements

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core modules implementation
- ✅ Authentication and user management
- ✅ Basic AI integration
- ✅ Multi-channel content management

### Phase 2 (Next)
- 🔄 Advanced analytics dashboard
- 🔄 AI-powered content optimization
- 🔄 Advanced lead scoring algorithms
- 🔄 Mobile app development

### Phase 3 (Future)
- 📋 Advanced integrations (CRM, Marketing tools)
- 📋 White-label solutions
- 📋 Advanced reporting and insights
- 📋 Enterprise features

---

**Built with ❤️ by the notus team** 