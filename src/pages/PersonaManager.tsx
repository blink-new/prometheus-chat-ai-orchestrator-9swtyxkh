import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Bot,
  Code,
  Lightbulb,
  MessageCircle,
  Zap,
  Settings,
  Play,
  Copy,
  Star,
  TrendingUp
} from 'lucide-react'

interface Persona {
  id: string
  name: string
  provider: string
  model: string
  specialty: string
  description: string
  color: string
  performance: {
    speed: number
    accuracy: number
    creativity: number
    cost: number
  }
  categories: string[]
  isCustom?: boolean
}

const personas: Persona[] = [
  {
    id: 'gpt4',
    name: 'GPT-4',
    provider: 'OpenAI',
    model: 'gpt-4-turbo',
    specialty: 'General Intelligence',
    description: 'Advanced reasoning, creative writing, and complex problem-solving. Excellent for open-ended tasks and nuanced conversations.',
    color: 'emerald',
    performance: { speed: 85, accuracy: 95, creativity: 90, cost: 80 },
    categories: ['Chat', 'Writing', 'Analysis']
  },
  {
    id: 'claude',
    name: 'Claude',
    provider: 'Anthropic',
    model: 'claude-3-opus',
    specialty: 'Reasoning & Analysis',
    description: 'Exceptional analytical thinking and ethical reasoning. Perfect for research, data analysis, and thoughtful discussions.',
    color: 'orange',
    performance: { speed: 80, accuracy: 98, creativity: 85, cost: 85 },
    categories: ['Analysis', 'Research', 'Ethics']
  },
  {
    id: 'mistral',
    name: 'Mistral',
    provider: 'Mistral AI',
    model: 'mistral-large',
    specialty: 'Code & Logic',
    description: 'Optimized for programming, mathematics, and logical reasoning. Fast and efficient for technical tasks.',
    color: 'blue',
    performance: { speed: 95, accuracy: 90, creativity: 75, cost: 70 },
    categories: ['Code', 'Math', 'Logic']
  },
  {
    id: 'custom1',
    name: 'Marketing Expert',
    provider: 'Custom',
    model: 'fine-tuned-gpt4',
    specialty: 'Marketing Strategy',
    description: 'Specialized in marketing campaigns, brand strategy, and consumer psychology. Trained on marketing best practices.',
    color: 'purple',
    performance: { speed: 80, accuracy: 85, creativity: 95, cost: 75 },
    categories: ['Strategy', 'Marketing', 'Business'],
    isCustom: true
  }
]

const taskCategories = [
  { id: 'chat', label: 'Chat', icon: MessageCircle, description: 'General conversation and questions' },
  { id: 'code', label: 'Code', icon: Code, description: 'Programming and technical tasks' },
  { id: 'strategy', label: 'Strategy', icon: Lightbulb, description: 'Planning and strategic thinking' },
  { id: 'writing', label: 'Writing', icon: Bot, description: 'Content creation and editing' },
  { id: 'analysis', label: 'Analysis', icon: TrendingUp, description: 'Data analysis and research' }
]

export default function PersonaManager() {
  const [selectedPersona, setSelectedPersona] = useState(personas[0])
  const [activeTab, setActiveTab] = useState('overview')
  const [testPrompt, setTestPrompt] = useState('')
  const [comparisonPersonas, setComparisonPersonas] = useState([personas[0], personas[1]])
  const [categoryAssignments, setCategoryAssignments] = useState<{[key: string]: string}>({
    chat: 'gpt4',
    code: 'mistral',
    strategy: 'claude',
    writing: 'gpt4',
    analysis: 'claude'
  })

  const getColorClass = (color: string) => {
    const colorMap = {
      emerald: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
      orange: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
      blue: 'border-blue-500/50 bg-blue-500/10 text-blue-400',
      purple: 'border-purple-500/50 bg-purple-500/10 text-purple-400',
      violet: 'border-violet-500/50 bg-violet-500/10 text-violet-400'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.violet
  }

  const PerformanceBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`h-full bg-${color}-500 rounded-full`}
        />
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
            Persona Manager
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage AI personalities and assign them to specific tasks
          </p>
        </div>
        <Button className="bg-violet-500 hover:bg-violet-600">
          <Bot className="h-4 w-4 mr-2" />
          Create Custom Persona
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
          <TabsTrigger value="assignments">Task Assignment</TabsTrigger>
          <TabsTrigger value="test">Test & Optimize</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Persona List */}
            <div className="lg:col-span-1">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Available Personas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {personas.map((persona) => (
                    <motion.div
                      key={persona.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPersona(persona)}
                      className={`p-4 rounded-lg cursor-pointer transition-all border ${
                        selectedPersona.id === persona.id
                          ? 'border-violet-500/50 bg-violet-500/10'
                          : 'border-border/50 hover:border-violet-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{persona.name}</h4>
                        {persona.isCustom && (
                          <Badge variant="outline" className="text-xs">Custom</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{persona.provider}</p>
                      <p className="text-sm text-muted-foreground">{persona.specialty}</p>
                      
                      <div className="flex gap-1 mt-3">
                        {persona.categories.map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Persona Details */}
            <div className="lg:col-span-2">
              <Card className="glass h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedPersona.name}</CardTitle>
                      <p className="text-muted-foreground">{selectedPersona.provider} • {selectedPersona.model}</p>
                    </div>
                    <Badge className={getColorClass(selectedPersona.color)}>
                      {selectedPersona.specialty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{selectedPersona.description}</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Performance Metrics
                      </h4>
                      <PerformanceBar label="Speed" value={selectedPersona.performance.speed} color={selectedPersona.color} />
                      <PerformanceBar label="Accuracy" value={selectedPersona.performance.accuracy} color={selectedPersona.color} />
                      <PerformanceBar label="Creativity" value={selectedPersona.performance.creativity} color={selectedPersona.color} />
                      <PerformanceBar label="Cost Efficiency" value={selectedPersona.performance.cost} color={selectedPersona.color} />
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Specializations</h4>
                      <div className="space-y-2">
                        {selectedPersona.categories.map((category) => (
                          <div key={category} className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-violet-400" />
                            <span className="text-sm">{category}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4">
                        <Button variant="outline" className="w-full mb-2">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compare" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {comparisonPersonas.map((persona, index) => (
              <Card key={persona.id} className="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{persona.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">{persona.provider}</p>
                    </div>
                    <Select 
                      value={persona.id} 
                      onValueChange={(value) => {
                        const newPersona = personas.find(p => p.id === value)
                        if (newPersona) {
                          const newComparison = [...comparisonPersonas]
                          newComparison[index] = newPersona
                          setComparisonPersonas(newComparison)
                        }
                      }}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {personas.map((p) => (
                          <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{persona.description}</p>
                  
                  <div className="space-y-3">
                    <PerformanceBar label="Speed" value={persona.performance.speed} color={persona.color} />
                    <PerformanceBar label="Accuracy" value={persona.performance.accuracy} color={persona.color} />
                    <PerformanceBar label="Creativity" value={persona.performance.creativity} color={persona.color} />
                    <PerformanceBar label="Cost" value={persona.performance.cost} color={persona.color} />
                  </div>
                  
                  <div className="pt-4">
                    <h5 className="font-medium mb-2">Best For:</h5>
                    <div className="flex gap-1 flex-wrap">
                      {persona.categories.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="glass">
            <CardHeader>
              <CardTitle>Side-by-Side Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter a prompt to test both personas..."
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button className="bg-violet-500 hover:bg-violet-600">
                  <Play className="h-4 w-4 mr-2" />
                  Run Comparison Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Task Category Assignments</CardTitle>
              <p className="text-muted-foreground">
                Assign specific personas to handle different types of tasks automatically
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {taskCategories.map((category) => {
                  const Icon = category.icon
                  const assignedPersona = personas.find(p => p.id === categoryAssignments[category.id])
                  
                  return (
                    <Card key={category.id} className="border border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="h-5 w-5 text-violet-400" />
                          <h4 className="font-medium">{category.label}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                        
                        <Select
                          value={categoryAssignments[category.id]}
                          onValueChange={(value) => 
                            setCategoryAssignments(prev => ({ ...prev, [category.id]: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {personas.map((persona) => (
                              <SelectItem key={persona.id} value={persona.id}>
                                {persona.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {assignedPersona && (
                          <div className="mt-3 p-2 rounded bg-muted/30">
                            <p className="text-xs text-muted-foreground">
                              {assignedPersona.specialty}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
              
              <div className="flex justify-end mt-6">
                <Button className="bg-violet-500 hover:bg-violet-600">
                  Save Assignments
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Persona Testing & Optimization</CardTitle>
              <p className="text-muted-foreground">
                Test different personas and optimize their performance for your specific use cases
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Test Prompt</label>
                  <Textarea
                    placeholder="Enter a test prompt to evaluate persona performance..."
                    value={testPrompt}
                    onChange={(e) => setTestPrompt(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Personas to Test</label>
                  <div className="space-y-2">
                    {personas.map((persona) => (
                      <label key={persona.id} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{persona.name}</span>
                        <Badge variant="outline" className="text-xs ml-auto">
                          {persona.specialty}
                        </Badge>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="bg-violet-500 hover:bg-violet-600">
                  <Play className="h-4 w-4 mr-2" />
                  Run Test
                </Button>
                <Button variant="outline">
                  <Zap className="h-4 w-4 mr-2" />
                  Optimize Parameters
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}