#!/bin/bash

echo "🚀 Setting up notus OS for GitHub..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   Visit: https://git-scm.com/downloads"
    exit 1
fi

# Initialize git repository
echo "📁 Initializing git repository..."
git init

# Add all files
echo "📦 Adding all files to git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: notus OS - Personal Branding SaaS Platform"

# Ask for GitHub repository URL
echo ""
echo "🔗 Please provide your GitHub repository URL:"
echo "   (e.g., https://github.com/yourusername/notus-os.git)"
echo "   Or just press Enter to skip this step and do it manually later."
read -p "GitHub URL: " github_url

if [ ! -z "$github_url" ]; then
    echo "🌐 Adding GitHub remote..."
    git remote add origin "$github_url"
    
    echo "📤 Pushing to GitHub..."
    git branch -M main
    git push -u origin main
    
    echo "✅ Successfully pushed to GitHub!"
    echo "🌍 Your repository is now available at: $github_url"
else
    echo "⏭️  Skipping GitHub push. You can do this manually later:"
    echo "   1. Create a new repository on GitHub"
    echo "   2. Run: git remote add origin YOUR_REPO_URL"
    echo "   3. Run: git push -u origin main"
fi

echo ""
echo "🎉 Setup complete! Your notus OS project is ready for deployment."
echo ""
echo "📋 Next steps:"
echo "   1. Follow the DEPLOYMENT_GUIDE.md for Vercel deployment"
echo "   2. Set up Supabase following the guide"
echo "   3. Configure environment variables"
echo ""
echo "📚 Check these files for detailed instructions:"
echo "   - DEPLOYMENT_GUIDE.md"
echo "   - QUICK_START.md"
echo "   - SETUP_CHECKLIST.md"
echo "   - GETTING_STARTED.md" 