import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Zap, Shield, Sparkles } from 'lucide-react'

interface OnboardingPageProps {
  onComplete: (userData: any) => void
}

const usageModes = [
  {
    id: 'personal',
    title: 'Personal',
    description: 'For individual productivity and learning',
    icon: Brain,
    features: ['Basic AI models', 'Personal chat history', 'Standard safety filters']
  },
  {
    id: 'research',
    title: 'Research',
    description: 'Advanced analysis and research tools',
    icon: Sparkles,
    features: ['Advanced models', 'Data analysis', 'Research memory clusters']
  },
  {
    id: 'robotics',
    title: 'Robotics',
    description: 'Multi-agent coordination and control',
    icon: Zap,
    features: ['Multi-agent orchestration', 'Real-time coordination', 'Hardware integration']
  },
  {
    id: 'pro',
    title: 'Pro',
    description: 'Full access to all features',
    icon: Shield,
    features: ['All AI models', 'Custom personas', 'Advanced safety controls', 'API access'],
    badge: 'Popular'
  }
]

const personas = [
  { id: 'gpt', name: 'GPT-4', type: 'OpenAI', specialty: 'General Intelligence' },
  { id: 'claude', name: 'Claude', type: 'Anthropic', specialty: 'Reasoning & Analysis' },
  { id: 'mistral', name: 'Mistral', type: 'Mistral AI', specialty: 'Code & Logic' },
  { id: 'smart-router', name: 'Smart Router', type: 'Prometheus', specialty: 'Adaptive Routing' }
]

export default function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [step, setStep] = useState(1)
  const [selectedMode, setSelectedMode] = useState<string>('')
  const [selectedPersona, setSelectedPersona] = useState<string>('smart-router')
  const [walletConnected, setWalletConnected] = useState(false)

  const handleComplete = () => {
    const userData = {
      id: '1',
      name: 'Alex Chen',
      email: 'alex@prometheus.ai',
      mode: selectedMode,
      defaultPersona: selectedPersona,
      powerTokens: 1000,
      walletConnected
    }
    onComplete(userData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-500 flex items-center justify-center violet-glow">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
              Prometheus Chat
            </h1>
          </motion.div>
          <p className="text-muted-foreground text-lg">AI Orchestrator Platform</p>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass p-8">
              <CardContent className="p-0">
                <h2 className="text-2xl font-semibold mb-6 text-center">Select Your Usage Mode</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {usageModes.map((mode) => {
                    const Icon = mode.icon
                    return (
                      <motion.div
                        key={mode.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedMode(mode.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all relative ${
                          selectedMode === mode.id
                            ? 'border-violet-500 bg-violet-500/10 violet-glow'
                            : 'border-border/50 hover:border-violet-500/50'
                        }`}
                      >
                        {mode.badge && (
                          <Badge className="absolute -top-2 -right-2 bg-violet-500 text-white">
                            {mode.badge}
                          </Badge>
                        )}
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="h-8 w-8 text-violet-400" />
                          <h3 className="text-xl font-semibold">{mode.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">{mode.description}</p>
                        <ul className="space-y-1">
                          {mode.features.map((feature, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-violet-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )
                  })}
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedMode}
                    className="bg-violet-500 hover:bg-violet-600 text-white px-8"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass p-8">
              <CardContent className="p-0">
                <h2 className="text-2xl font-semibold mb-6 text-center">Connect Your Wallet</h2>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-10 w-10 text-violet-400" />
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Connect your wallet to manage Power Tokens (PPT) for AI interactions
                  </p>
                  <Button
                    onClick={() => setWalletConnected(true)}
                    className="bg-violet-500 hover:bg-violet-600 text-white px-8 mb-4"
                  >
                    {walletConnected ? 'Wallet Connected ✓' : 'Connect Wallet'}
                  </Button>
                  {walletConnected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mt-4"
                    >
                      <p className="text-green-400">
                        Wallet connected! You have been granted 1,000 PPT to get started.
                      </p>
                    </motion.div>
                  )}
                </div>
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="px-8"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="bg-violet-500 hover:bg-violet-600 text-white px-8"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass p-8">
              <CardContent className="p-0">
                <h2 className="text-2xl font-semibold mb-6 text-center">Choose Your Default Persona</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {personas.map((persona) => (
                    <motion.div
                      key={persona.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPersona(persona.id)}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPersona === persona.id
                          ? 'border-violet-500 bg-violet-500/10 violet-glow'
                          : 'border-border/50 hover:border-violet-500/50'
                      }`}
                    >
                      <h3 className="text-xl font-semibold mb-2">{persona.name}</h3>
                      <p className="text-sm text-violet-400 mb-2">{persona.type}</p>
                      <p className="text-muted-foreground">{persona.specialty}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                  <p className="text-sm text-violet-400 mb-2">💡 Smart Router Recommended</p>
                  <p className="text-sm text-muted-foreground">
                    The Smart Router automatically selects the best AI model for each task, ensuring optimal responses.
                  </p>
                </div>
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="px-8"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleComplete}
                    className="bg-violet-500 hover:bg-violet-600 text-white px-8"
                  >
                    Complete Setup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}