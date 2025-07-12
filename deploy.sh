#!/bin/bash

echo "🚀 notus OS Deployment Script"
echo "=============================="
echo ""
echo "This script will help you deploy notus OS to Vercel"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "Visit: https://git-scm.com/downloads"
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Prerequisites check passed!"
echo ""

# Initialize git repository if not already done
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: notus OS platform"
    echo "✅ Git repository initialized"
    echo ""
fi

echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Create a GitHub repository:"
echo "   - Go to https://github.com/new"
echo "   - Name it: notus-os"
echo "   - Make it Public"
echo "   - Click 'Create repository'"
echo ""
echo "2. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/notus-os.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Sign up with GitHub"
echo "   - Click 'New Project'"
echo "   - Import your notus-os repository"
echo "   - Click 'Deploy'"
echo ""
echo "4. Set up Supabase:"
echo "   - Go to https://supabase.com"
echo "   - Create new project"
echo "   - Copy API keys to Vercel environment variables"
echo ""
echo "📖 For detailed instructions, see: DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 Your notus OS platform will be live in minutes!" 