import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Database,
  Archive,
  Download,
  Snowflake,
  Brain,
  Clock,
  MessageSquare,
  Tag,
  Search,
  Filter,
  MoreVertical,
  Star,
  Trash2
} from 'lucide-react'

interface MemoryBlock {
  id: string
  title: string
  content: string
  timestamp: Date
  type: 'conversation' | 'knowledge' | 'insight' | 'code'
  tags: string[]
  importance: 'low' | 'medium' | 'high'
  frozen: boolean
  messageCount?: number
  aiModel?: string
}

const mockMemoryBlocks: MemoryBlock[] = [
  {
    id: '1',
    title: 'React Performance Optimization Discussion',
    content: 'Detailed conversation about React memo, useMemo, and useCallback optimization strategies for large scale applications...',
    timestamp: new Date(Date.now() - 3600000),
    type: 'conversation',
    tags: ['React', 'Performance', 'Frontend'],
    importance: 'high',
    frozen: true,
    messageCount: 15,
    aiModel: 'GPT-4'
  },
  {
    id: '2',
    title: 'AI Model Comparison Analysis',
    content: 'Comprehensive analysis of different AI models including GPT-4, Claude, and Mistral for various use cases...',
    timestamp: new Date(Date.now() - 7200000),
    type: 'insight',
    tags: ['AI', 'Analysis', 'Comparison'],
    importance: 'high',
    frozen: false,
    messageCount: 8,
    aiModel: 'Claude'
  },
  {
    id: '3',
    title: 'Database Schema Design Patterns',
    content: 'Best practices for designing scalable database schemas, including normalization, indexing strategies...',
    timestamp: new Date(Date.now() - 86400000),
    type: 'knowledge',
    tags: ['Database', 'Design', 'Backend'],
    importance: 'medium',
    frozen: false,
    messageCount: 12,
    aiModel: 'Mistral'
  },
  {
    id: '4',
    title: 'TypeScript Advanced Patterns',
    content: 'Implementation of advanced TypeScript patterns including conditional types, mapped types, and template literals...',
    timestamp: new Date(Date.now() - 172800000),
    type: 'code',
    tags: ['TypeScript', 'Patterns', 'Advanced'],
    importance: 'medium',
    frozen: true,
    messageCount: 6,
    aiModel: 'GPT-4'
  },
  {
    id: '5',
    title: 'Product Strategy Discussion',
    content: 'Strategic planning session for product roadmap, market analysis, and competitive positioning...',
    timestamp: new Date(Date.now() - 259200000),
    type: 'conversation',
    tags: ['Strategy', 'Product', 'Business'],
    importance: 'high',
    frozen: false,
    messageCount: 20,
    aiModel: 'Claude'
  }
]

const memoryTypes = [
  { id: 'all', label: 'All Types', icon: Database },
  { id: 'conversation', label: 'Conversations', icon: MessageSquare },
  { id: 'knowledge', label: 'Knowledge', icon: Brain },
  { id: 'insight', label: 'Insights', icon: Star },
  { id: 'code', label: 'Code', icon: Database }
]

export default function MemoryConsole() {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedMemory, setSelectedMemory] = useState<MemoryBlock | null>(mockMemoryBlocks[0])
  const [searchQuery, setSearchQuery] = useState('')

  const getTypeColor = (type: string) => {
    const colors = {
      conversation: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      knowledge: 'bg-green-500/10 text-green-400 border-green-500/20',
      insight: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      code: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    }
    return colors[type as keyof typeof colors] || colors.conversation
  }

  const getImportanceColor = (importance: string) => {
    const colors = {
      low: 'text-muted-foreground',
      medium: 'text-yellow-400',
      high: 'text-red-400'
    }
    return colors[importance as keyof typeof colors] || colors.medium
  }

  const filteredMemories = mockMemoryBlocks.filter(memory => {
    const matchesType = selectedType === 'all' || memory.type === selectedType
    const matchesSearch = memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         memory.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesType && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
            Memory Console
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage conversation history and knowledge clusters
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search Memories
          </Button>
          <Button className="bg-violet-500 hover:bg-violet-600">
            <Archive className="h-4 w-4 mr-2" />
            Create Cluster
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        {/* Memory Filter Sidebar */}
        <div className="lg:col-span-1">
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle className="text-lg">Memory Types</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {memoryTypes.map((type) => {
                  const Icon = type.icon
                  const count = type.id === 'all' 
                    ? mockMemoryBlocks.length 
                    : mockMemoryBlocks.filter(m => m.type === type.id).length
                  
                  return (
                    <motion.div
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all flex items-center justify-between ${
                        selectedType === type.id
                          ? 'bg-violet-500/20 border border-violet-500/50'
                          : 'hover:bg-muted/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-violet-400" />
                        <span className="font-medium text-sm">{type.label}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {count}
                      </Badge>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-6 space-y-3">
                <h4 className="font-medium text-sm">Quick Actions</h4>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Snowflake className="h-4 w-4 mr-2" />
                  Freeze Selected
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Archive Old
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Memory List */}
        <div className="lg:col-span-1">
          <Card className="glass h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Memory Blocks</CardTitle>
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search memories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border/50 rounded-lg text-sm focus:outline-none focus:border-violet-500/50"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-18rem)]">
                <div className="p-4 space-y-3">
                  {filteredMemories.map((memory) => (
                    <motion.div
                      key={memory.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMemory(memory)}
                      className={`p-4 rounded-lg cursor-pointer transition-all border ${
                        selectedMemory?.id === memory.id
                          ? 'border-violet-500/50 bg-violet-500/10'
                          : 'border-border/50 hover:border-violet-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">
                            {memory.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs ${getTypeColor(memory.type)}`}>
                              {memory.type}
                            </Badge>
                            {memory.frozen && (
                              <Snowflake className="h-3 w-3 text-blue-400" />
                            )}
                            <Star className={`h-3 w-3 ${getImportanceColor(memory.importance)}`} />
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {memory.content}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{memory.timestamp.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {memory.messageCount && (
                            <>
                              <MessageSquare className="h-3 w-3" />
                              <span>{memory.messageCount}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-1 mt-2">
                        {memory.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {memory.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{memory.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Memory Details */}
        <div className="lg:col-span-2">
          {selectedMemory ? (
            <Card className="glass h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedMemory.title}</CardTitle>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge className={getTypeColor(selectedMemory.type)}>
                        {selectedMemory.type}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{selectedMemory.timestamp.toLocaleString()}</span>
                      </div>
                      {selectedMemory.aiModel && (
                        <Badge variant="outline">
                          {selectedMemory.aiModel}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className={selectedMemory.frozen ? 'bg-blue-500/20 border-blue-500/50' : ''}
                    >
                      <Snowflake className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Content</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedMemory.content}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex gap-2 flex-wrap">
                        {selectedMemory.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-sm">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Memory Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Importance:</span>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className={`h-4 w-4 ${getImportanceColor(selectedMemory.importance)}`} />
                            <span className="capitalize">{selectedMemory.importance}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <div className="flex items-center gap-2 mt-1">
                            {selectedMemory.frozen ? (
                              <>
                                <Snowflake className="h-4 w-4 text-blue-400" />
                                <span>Frozen</span>
                              </>
                            ) : (
                              <>
                                <Database className="h-4 w-4 text-green-400" />
                                <span>Active</span>
                              </>
                            )}
                          </div>
                        </div>
                        {selectedMemory.messageCount && (
                          <div>
                            <span className="text-muted-foreground">Messages:</span>
                            <div className="flex items-center gap-2 mt-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{selectedMemory.messageCount}</span>
                            </div>
                          </div>
                        )}
                        {selectedMemory.aiModel && (
                          <div>
                            <span className="text-muted-foreground">AI Model:</span>
                            <div className="flex items-center gap-2 mt-1">
                              <Brain className="h-4 w-4" />
                              <span>{selectedMemory.aiModel}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/50">
                      <h4 className="font-medium mb-3">Actions</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="justify-start">
                          <Brain className="h-4 w-4 mr-2" />
                          Train Agent
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Archive className="h-4 w-4 mr-2" />
                          Create Cluster
                        </Button>
                        <Button variant="outline" className="justify-start text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass h-full">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Memory Selected</h3>
                  <p className="text-muted-foreground">
                    Select a memory block from the list to view its details
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}