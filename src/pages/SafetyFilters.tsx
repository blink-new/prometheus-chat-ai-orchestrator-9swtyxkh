import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Shield,
  Eye,
  Lock,
  Users,
  AlertTriangle,
  CheckCircle,
  Settings,
  Globe,
  Database,
  MessageSquare,
  FileText,
  Image,
  Mic,
  Video
} from 'lucide-react'

const safetyModels = [
  {
    id: 'default',
    name: 'Default Safety',
    description: 'Balanced safety and functionality for general use',
    level: 'Medium',
    color: 'blue',
    features: ['Basic content filtering', 'Standard privacy protection', 'General safety guidelines']
  },
  {
    id: 'developer',
    name: 'Developer Mode',
    description: 'Reduced restrictions for development and testing',
    level: 'Low',
    color: 'orange',
    features: ['Minimal content filtering', 'Technical context awareness', 'Code-focused safety']
  },
  {
    id: 'community',
    name: 'Community Rated',
    description: 'Community-driven safety standards',
    level: 'High',
    color: 'green',
    features: ['Community moderation', 'Collaborative filtering', 'Transparent guidelines']
  },
  {
    id: 'enterprise',
    name: 'Enterprise Security',
    description: 'Maximum security for business environments',
    level: 'Maximum',
    color: 'red',
    features: ['Advanced threat detection', 'Compliance monitoring', 'Audit logging']
  }
]

const visibilityScopes = [
  {
    id: 'conversation',
    name: 'Conversation History',
    description: 'What the AI can see from your chat history',
    icon: MessageSquare,
    enabled: true,
    details: 'Last 50 messages, excluding sensitive data'
  },
  {
    id: 'documents',
    name: 'Uploaded Documents',
    description: 'Access to documents you\'ve shared',
    icon: FileText,
    enabled: true,
    details: 'PDFs, text files, and presentations'
  },
  {
    id: 'images',
    name: 'Image Content',
    description: 'Analysis of uploaded images',
    icon: Image,
    enabled: false,
    details: 'EXIF data stripped, content analysis only'
  },
  {
    id: 'audio',
    name: 'Audio Transcripts',
    description: 'Transcribed audio content',
    icon: Mic,
    enabled: false,
    details: 'Voice data not stored, transcripts only'
  },
  {
    id: 'video',
    name: 'Video Analysis',
    description: 'Video content understanding',
    icon: Video,
    enabled: false,
    details: 'Frame analysis, no video storage'
  },
  {
    id: 'external',
    name: 'External Data',
    description: 'Web search and external APIs',
    icon: Globe,
    enabled: true,
    details: 'Search results and public data only'
  }
]

export default function SafetyFilters() {
  const [selectedSafetyModel, setSelectedSafetyModel] = useState('default')
  const [privacyLevel, setPrivacyLevel] = useState([75])
  const [dataRetention, setDataRetention] = useState('30-days')
  const [enableAuditLog, setEnableAuditLog] = useState(true)
  const [enableEncryption, setEnableEncryption] = useState(true)
  const [scopeSettings, setScopeSettings] = useState(
    visibilityScopes.reduce((acc, scope) => ({
      ...acc,
      [scope.id]: scope.enabled
    }), {})
  )

  const getSafetyModelColor = (color: string) => {
    const colors = {
      blue: 'border-blue-500/50 bg-blue-500/10 text-blue-400',
      orange: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
      green: 'border-green-500/50 bg-green-500/10 text-green-400',
      red: 'border-red-500/50 bg-red-500/10 text-red-400'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-orange-400'
      case 'Medium': return 'text-blue-400'
      case 'High': return 'text-green-400'
      case 'Maximum': return 'text-red-400'
      default: return 'text-muted-foreground'
    }
  }

  const getPrivacyDescription = (level: number) => {
    if (level < 25) return 'Minimal - Basic privacy protection'
    if (level < 50) return 'Standard - Balanced privacy and functionality'
    if (level < 75) return 'Enhanced - Strong privacy controls'
    return 'Maximum - Strictest privacy settings'
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
            Safety & Filters
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure safety models, privacy controls, and AI visibility settings
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Advanced Settings
          </Button>
          <Button className="bg-violet-500 hover:bg-violet-600">
            <Shield className="h-4 w-4 mr-2" />
            Export Config
          </Button>
        </div>
      </div>

      <Tabs defaultValue="safety" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="safety">Safety Models</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Controls</TabsTrigger>
          <TabsTrigger value="visibility">AI Visibility</TabsTrigger>
          <TabsTrigger value="audit">Audit & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="safety" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Safety Models Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Choose Safety Model</h3>
              {safetyModels.map((model) => (
                <motion.div
                  key={model.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSafetyModel(model.id)}
                  className={`p-6 rounded-xl cursor-pointer transition-all border-2 ${
                    selectedSafetyModel === model.id
                      ? 'border-violet-500/50 bg-violet-500/10'
                      : 'border-border/50 hover:border-violet-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold">{model.name}</h4>
                    <Badge className={getSafetyModelColor(model.color)}>
                      {model.level}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{model.description}</p>
                  <div className="space-y-2">
                    {model.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Current Settings Overview */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Current Safety Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Active Model</span>
                    <Badge className="bg-violet-500 text-white">
                      {safetyModels.find(m => m.id === selectedSafetyModel)?.name}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {safetyModels.find(m => m.id === selectedSafetyModel)?.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Content Filtering</span>
                    </div>
                    <span className={`text-sm font-medium ${getLevelColor(safetyModels.find(m => m.id === selectedSafetyModel)?.level || 'Medium')}`}>
                      {safetyModels.find(m => m.id === selectedSafetyModel)?.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">Data Protection</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-violet-400" />
                      <span className="text-sm">Privacy Mode</span>
                    </div>
                    <span className="text-sm text-green-400">Enhanced</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-orange-400" />
                      <span className="text-sm">Audit Logging</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h5 className="font-medium mb-2">Safety Recommendations</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Consider enabling maximum encryption for sensitive data
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Current settings meet industry standards
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Privacy Level
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Privacy Protection</span>
                    <Badge variant="outline">{privacyLevel[0]}%</Badge>
                  </div>
                  
                  <Slider
                    value={privacyLevel}
                    onValueChange={setPrivacyLevel}
                    max={100}
                    step={25}
                    className="w-full"
                  />
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Minimal</span>
                    <span>Standard</span>
                    <span>Enhanced</span>
                    <span>Maximum</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {getPrivacyDescription(privacyLevel[0])}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Data Controls</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">End-to-End Encryption</p>
                        <p className="text-xs text-muted-foreground">Encrypt all data in transit and at rest</p>
                      </div>
                      <Switch
                        checked={enableEncryption}
                        onCheckedChange={setEnableEncryption}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Audit Logging</p>
                        <p className="text-xs text-muted-foreground">Track all AI interactions and data access</p>
                      </div>
                      <Switch
                        checked={enableAuditLog}
                        onCheckedChange={setEnableAuditLog}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-medium text-sm">Data Retention</label>
                      <Select value={dataRetention} onValueChange={setDataRetention}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7-days">7 Days</SelectItem>
                          <SelectItem value="30-days">30 Days</SelectItem>
                          <SelectItem value="90-days">90 Days</SelectItem>
                          <SelectItem value="1-year">1 Year</SelectItem>
                          <SelectItem value="forever">Forever</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Processing Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h4 className="font-medium text-green-400 mb-2">Data Minimization</h4>
                    <p className="text-sm text-muted-foreground">
                      Only essential data is processed. Personal identifiers are automatically redacted.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium text-blue-400 mb-2">Anonymization</h4>
                    <p className="text-sm text-muted-foreground">
                      All data is anonymized before AI processing. No personal information is stored with conversations.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <h4 className="font-medium text-violet-400 mb-2">Local Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Sensitive operations are processed locally when possible. External API calls are minimized.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h5 className="font-medium mb-3">Compliance Standards</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="outline" className="justify-center">GDPR</Badge>
                    <Badge variant="outline" className="justify-center">CCPA</Badge>
                    <Badge variant="outline" className="justify-center">SOC 2</Badge>
                    <Badge variant="outline" className="justify-center">HIPAA</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visibility" className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                AI Visibility Scopes
              </CardTitle>
              <p className="text-muted-foreground">
                Control what information AI models can access and analyze
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibilityScopes.map((scope) => {
                  const Icon = scope.icon
                  return (
                    <div
                      key={scope.id}
                      className="p-4 rounded-lg border border-border/50 hover:border-violet-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-violet-400" />
                          <h4 className="font-medium">{scope.name}</h4>
                        </div>
                        <Switch
                          checked={scopeSettings[scope.id] || false}
                          onCheckedChange={(checked) =>
                            setScopeSettings(prev => ({ ...prev, [scope.id]: checked }))
                          }
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{scope.description}</p>
                      <p className="text-xs text-violet-300">{scope.details}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/30">
                <h4 className="font-medium mb-2">Summary</h4>
                <p className="text-sm text-muted-foreground">
                  AI models can access{' '}
                  <span className="text-violet-400 font-medium">
                    {Object.values(scopeSettings).filter(Boolean).length}
                  </span>{' '}
                  out of {visibilityScopes.length} data types. This affects AI performance and context understanding.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Audit Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: '14:23:15', action: 'Safety model changed to Enterprise', level: 'INFO' },
                    { time: '14:20:32', action: 'Privacy level increased to 90%', level: 'INFO' },
                    { time: '14:18:44', action: 'Attempted access to restricted content', level: 'WARN' },
                    { time: '14:15:12', action: 'Encryption enabled for all data', level: 'INFO' },
                    { time: '14:12:05', action: 'User authentication verified', level: 'INFO' }
                  ].map((log, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className={`w-2 h-2 rounded-full ${
                        log.level === 'WARN' ? 'bg-yellow-400' : 'bg-green-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground">{log.time}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {log.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Compliance Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Protection Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-green-500" />
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Compliance</span>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Privacy Compliance</span>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Audit Trail</span>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h5 className="font-medium mb-3">Export Options</h5>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Export Audit Log
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Generate Compliance Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Export Configuration
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}