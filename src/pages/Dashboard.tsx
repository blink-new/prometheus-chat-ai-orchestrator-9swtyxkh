import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  MessageSquare,
  Clock,
  RotateCcw
} from 'lucide-react'

interface DashboardProps {
  currentUser: any
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  model?: string
  tokens?: number
}

interface ChatSession {
  id: string
  title: string
  lastMessage: Date
  messageCount: number
}

const mockSessions: ChatSession[] = [
  { id: '1', title: 'Code Review Discussion', lastMessage: new Date(), messageCount: 12 },
  { id: '2', title: 'Strategic Planning', lastMessage: new Date(Date.now() - 3600000), messageCount: 8 },
  { id: '3', title: 'Technical Architecture', lastMessage: new Date(Date.now() - 7200000), messageCount: 15 },
  { id: '4', title: 'Data Analysis Query', lastMessage: new Date(Date.now() - 86400000), messageCount: 6 }
]

const personas = [
  { id: 'gpt', name: 'GPT-4', provider: 'OpenAI', color: 'emerald' },
  { id: 'claude', name: 'Claude', provider: 'Anthropic', color: 'orange' },
  { id: 'mistral', name: 'Mistral', provider: 'Mistral AI', color: 'blue' },
  { id: 'router', name: 'Smart Router', provider: 'Prometheus', color: 'violet' }
]

export default function Dashboard({ currentUser }: DashboardProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI orchestrator. I can route your queries to the best available AI model or you can choose a specific persona. How can I help you today?',
      timestamp: new Date(),
      model: 'Smart Router'
    }
  ])
  const [input, setInput] = useState('')
  const [currentPersona, setCurrentPersona] = useState(personas[3])
  const [smartRouterEnabled, setSmartRouterEnabled] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedSession, setSelectedSession] = useState(mockSessions[0].id)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const selectedModel = smartRouterEnabled 
        ? personas[Math.floor(Math.random() * personas.length)]
        : currentPersona

      const responses = [
        "I understand your query. Let me analyze this from multiple perspectives...",
        "Based on the context, here's my comprehensive analysis...",
        "That's an interesting question. Let me break this down for you...",
        "I can help you with that. Here's what I recommend...",
        "Great question! Let me provide you with detailed insights..."
      ]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        model: selectedModel.name,
        tokens: Math.floor(Math.random() * 500) + 100
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getPersonaColorClass = (color: string) => {
    const colorMap = {
      emerald: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
      orange: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
      blue: 'border-blue-500/50 bg-blue-500/10 text-blue-400',
      violet: 'border-violet-500/50 bg-violet-500/10 text-violet-400'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.violet
  }

  return (
    <div className="max-w-7xl mx-auto p-4 h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Left Sidebar - Recent Sessions */}
        <div className="lg:col-span-1">
          <Card className="glass h-full">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Sessions</h3>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
              
              <ScrollArea className="h-[calc(100%-3rem)]">
                <div className="space-y-2">
                  {mockSessions.map((session) => (
                    <motion.div
                      key={session.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSession(session.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedSession === session.id
                          ? 'bg-violet-500/20 border border-violet-500/50'
                          : 'hover:bg-muted/50 border border-transparent'
                      }`}
                    >
                      <h4 className="font-medium text-sm mb-1 line-clamp-2">{session.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{session.lastMessage.toLocaleTimeString()}</span>
                        <span>•</span>
                        <span>{session.messageCount} msgs</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Card className="glass h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={`px-3 py-1 ${getPersonaColorClass(currentPersona.color)}`}>
                    <Bot className="h-4 w-4 mr-2" />
                    {smartRouterEnabled ? 'Smart Router' : currentPersona.name}
                  </Badge>
                  {!smartRouterEnabled && (
                    <span className="text-sm text-muted-foreground">
                      {currentPersona.provider}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label htmlFor="smart-router" className="text-sm font-medium">
                      Smart Router
                    </label>
                    <Switch
                      id="smart-router"
                      checked={smartRouterEnabled}
                      onCheckedChange={setSmartRouterEnabled}
                    />
                  </div>
                  
                  <Button size="sm" variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    New Chat
                  </Button>
                </div>
              </div>
              
              {smartRouterEnabled && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm text-muted-foreground mt-2"
                >
                  <Sparkles className="h-4 w-4 inline mr-1" />
                  Automatically selecting the best AI model for each response
                </motion.p>
              )}
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-violet-500 text-white'
                            : 'glass border border-border/50'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="h-4 w-4 text-violet-400" />
                            <span className="text-xs font-medium text-violet-400">
                              {message.model}
                            </span>
                            {message.tokens && (
                              <Badge variant="outline" className="text-xs">
                                {message.tokens} tokens
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        
                        <div className={`flex items-center gap-2 mt-2 text-xs ${
                          message.role === 'user' ? 'text-violet-100' : 'text-muted-foreground'
                        }`}>
                          {message.role === 'user' && <User className="h-3 w-3" />}
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="glass border border-border/50 rounded-2xl px-4 py-3 max-w-[80%]">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="h-4 w-4 text-violet-400" />
                        <span className="text-xs font-medium text-violet-400">
                          {smartRouterEnabled ? 'Smart Router' : currentPersona.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="min-h-[50px] max-h-[150px] resize-none bg-muted/30"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping}
                  className="bg-violet-500 hover:bg-violet-600 h-[50px] px-6"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>Press Shift + Enter for new line</span>
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3" />
                  <span>Est. 50-200 PPT per message</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}