'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Upload, FileText, Video, Mic, Brain, Download } from 'lucide-react'

interface Insight {
  id: string
  title: string
  content: string
  type: 'topic' | 'nugget' | 'voiceprint'
  confidence_score: number
  tags: string[]
}

export default function InsightExtractor() {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [insights, setInsights] = useState<Insight[]>([])
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // toast({
      //   title: "File uploaded",
      //   description: `${selectedFile.name} has been selected for processing.`,
      // })
    }
  }

  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const processContent = async () => {
    if (!file && !text.trim()) {
      // toast({
      //   title: "No content",
      //   description: "Please upload a file or enter text to process.",
      //   variant: "destructive",
      // })
      return
    }

    setIsProcessing(true)

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Mock insights
      const mockInsights: Insight[] = [
        {
          id: '1',
          title: 'Personal Branding Strategy',
          content: 'The speaker emphasizes the importance of consistent personal branding across all channels.',
          type: 'topic',
          confidence_score: 0.95,
          tags: ['personal branding', 'strategy', 'consistency']
        },
        {
          id: '2',
          title: 'Content Creation Process',
          content: 'A systematic approach to content creation that involves research, creation, and distribution phases.',
          type: 'nugget',
          confidence_score: 0.88,
          tags: ['content creation', 'process', 'workflow']
        },
        {
          id: '3',
          title: 'Voice Analysis',
          content: 'Professional yet conversational tone, uses storytelling techniques, focuses on actionable insights.',
          type: 'voiceprint',
          confidence_score: 0.92,
          tags: ['tone', 'storytelling', 'actionable']
        }
      ]

      setInsights(mockInsights)
      // toast({
      //   title: "Insights extracted!",
      //   description: `Found ${mockInsights.length} valuable insights from your content.`,
      // })
    } catch (error) {
      // toast({
      //   title: "Processing failed",
      //   description: "There was an error processing your content. Please try again.",
      //   variant: "destructive",
      // })
    } finally {
      setIsProcessing(false)
    }
  }

  const exportInsights = () => {
    const dataStr = JSON.stringify(insights, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'insights.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Insight Extractor</h2>
        <p className="text-muted-foreground">
          Upload audio, video, or text content to extract valuable insights and voiceprint analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Content Input
            </CardTitle>
            <CardDescription>
              Upload files or paste text to extract insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'upload' ? 'default' : 'outline'}
                onClick={() => setActiveTab('upload')}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
              <Button
                variant={activeTab === 'text' ? 'default' : 'outline'}
                onClick={() => setActiveTab('text')}
                className="flex-1"
              >
                <FileText className="h-4 w-4 mr-2" />
                Paste Text
              </Button>
            </div>

            {activeTab === 'upload' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </span>
                    <br />
                    <span className="text-xs text-muted-foreground">
                      Audio, video, or text files up to 100MB
                    </span>
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept="audio/*,video/*,.txt,.doc,.docx,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                {file && (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      {file.type.startsWith('audio') && <Mic className="h-4 w-4" />}
                      {file.type.startsWith('video') && <Video className="h-4 w-4" />}
                      {file.type.includes('text') && <FileText className="h-4 w-4" />}
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'text' && (
              <div className="space-y-2">
                <Label htmlFor="text-input">Content Text</Label>
                <Textarea
                  id="text-input"
                  placeholder="Paste your content here..."
                  value={text}
                  onChange={handleTextInput}
                  rows={8}
                />
              </div>
            )}

            <Button
              onClick={processContent}
              disabled={isProcessing || (!file && !text.trim())}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Extract Insights
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Extracted Insights</span>
              {insights.length > 0 && (
                <Button variant="outline" size="sm" onClick={exportInsights}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              )}
            </CardTitle>
            <CardDescription>
              AI-generated insights from your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {insights.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No insights yet. Upload content to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div key={insight.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{insight.title}</h4>
                      <Badge variant="secondary">
                        {insight.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {insight.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {insight.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(insight.confidence_score * 100)}% confidence
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 