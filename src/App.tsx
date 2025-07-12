import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OnboardingPage from './pages/OnboardingPage'
import Dashboard from './pages/Dashboard'
import PersonaManager from './pages/PersonaManager'
import MemoryConsole from './pages/MemoryConsole'
import TokenTracker from './pages/TokenTracker'
import SafetyFilters from './pages/SafetyFilters'
import Navigation from './components/Navigation'

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingStatus = localStorage.getItem('prometheus-onboarded')
    if (onboardingStatus === 'true') {
      setIsOnboarded(true)
      // Mock user data - in real app this would come from auth
      setCurrentUser({
        id: '1',
        name: 'Alex Chen',
        email: 'alex@prometheus.ai',
        mode: 'Pro',
        powerTokens: 1247
      })
    }
  }, [])

  const handleOnboardingComplete = (userData: any) => {
    localStorage.setItem('prometheus-onboarded', 'true')
    setCurrentUser(userData)
    setIsOnboarded(true)
  }

  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-violet-950/20">
        <OnboardingPage onComplete={handleOnboardingComplete} />
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-violet-950/20">
        <Navigation currentUser={currentUser} />
        
        <div className="pt-16">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route 
                path="/dashboard" 
                element={
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Dashboard currentUser={currentUser} />
                  </motion.div>
                } 
              />
              <Route 
                path="/personas" 
                element={
                  <motion.div
                    key="personas"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PersonaManager />
                  </motion.div>
                } 
              />
              <Route 
                path="/memory" 
                element={
                  <motion.div
                    key="memory"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MemoryConsole />
                  </motion.div>
                } 
              />
              <Route 
                path="/tokens" 
                element={
                  <motion.div
                    key="tokens"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TokenTracker currentUser={currentUser} />
                  </motion.div>
                } 
              />
              <Route 
                path="/safety" 
                element={
                  <motion.div
                    key="safety"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SafetyFilters />
                  </motion.div>
                } 
              />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  )
}

export default App