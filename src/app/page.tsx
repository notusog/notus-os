import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Zap, Shield } from "lucide-react";

export default function Home() { 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center text-white p-8 max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-4">Notus OS</h1>
        <p className="text-xl mb-8">Personal Branding & Content Distribution Platform</p>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 mb-8">
          <p className="text-lg mb-6">🚀 Your complete personal branding operating system</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-300" />
              <h3 className="font-semibold">User Management</h3>
              <p className="text-sm opacity-75">Secure authentication & profiles</p>
            </div>
            <div className="text-center">
              <Zap className="h-8 w-8 mx-auto mb-2 text-purple-300" />
              <h3 className="font-semibold">AI-Powered</h3>
              <p className="text-sm opacity-75">Smart content generation</p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-green-300" />
              <h3 className="font-semibold">Enterprise Ready</h3>
              <p className="text-sm opacity-75">Scalable & secure</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-900 hover:bg-gray-100"
              onClick={() => window.location.href = '/auth/sign-up'}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-900"
              onClick={() => window.location.href = '/auth/sign-in'}
            >
              Sign In
            </Button>
          </div>
        </div>
        
        <p className="text-sm opacity-75">Built by Marvin</p>
      </div>
    </div>
  )
}
