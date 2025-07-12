import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Brain,
  MessageSquare,
  Users,
  Database,
  Coins,
  Shield,
  Menu,
  X,
  Zap
} from 'lucide-react'

interface NavigationProps {
  currentUser: any
}

const navigationItems = [
  { path: '/dashboard', label: 'Dashboard', icon: MessageSquare },
  { path: '/personas', label: 'Personas', icon: Users },
  { path: '/memory', label: 'Memory', icon: Database },
  { path: '/tokens', label: 'Tokens', icon: Coins },
  { path: '/safety', label: 'Safety', icon: Shield }
]

export default function Navigation({ currentUser }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500 flex items-center justify-center violet-glow">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
              Prometheus
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors relative ${
                      isActive
                        ? 'bg-violet-500/20 text-violet-400'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-lg border border-violet-500/50 violet-glow"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* User Info & Power Tokens */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <Zap className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-400">
                {currentUser?.powerTokens || 0} PPT
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">{currentUser?.name}</p>
                <Badge variant="outline" className="text-xs border-violet-500/20 text-violet-400">
                  {currentUser?.mode} Mode
                </Badge>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-sm font-medium">
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-border/50 glass-strong"
        >
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-violet-500/20 text-violet-400'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
            
            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center justify-between px-4 py-2">
                <div>
                  <p className="font-medium">{currentUser?.name}</p>
                  <Badge variant="outline" className="text-xs border-violet-500/20 text-violet-400">
                    {currentUser?.mode} Mode
                  </Badge>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <Zap className="h-4 w-4 text-violet-400" />
                  <span className="text-sm font-medium text-violet-400">
                    {currentUser?.powerTokens || 0} PPT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}