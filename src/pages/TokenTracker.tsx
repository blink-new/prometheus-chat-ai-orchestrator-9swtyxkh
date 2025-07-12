import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Zap,
  TrendingUp,
  DollarSign,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Gift,
  Target,
  BarChart3,
  Clock,
  MessageSquare
} from 'lucide-react'

interface TokenTrackerProps {
  currentUser: any
}

interface Transaction {
  id: string
  type: 'spend' | 'earn' | 'purchase' | 'stake'
  amount: number
  description: string
  timestamp: Date
  aiModel?: string
  cost?: number
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'spend',
    amount: -150,
    description: 'GPT-4 conversation analysis',
    timestamp: new Date(Date.now() - 300000),
    aiModel: 'GPT-4',
    cost: 0.15
  },
  {
    id: '2',
    type: 'spend',
    amount: -80,
    description: 'Claude code review',
    timestamp: new Date(Date.now() - 1800000),
    aiModel: 'Claude',
    cost: 0.08
  },
  {
    id: '3',
    type: 'earn',
    amount: +500,
    description: 'Daily login bonus',
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: '4',
    type: 'purchase',
    amount: +1000,
    description: 'Token top-up',
    timestamp: new Date(Date.now() - 86400000),
    cost: 10.00
  },
  {
    id: '5',
    type: 'stake',
    amount: -200,
    description: 'Staked for premium features',
    timestamp: new Date(Date.now() - 172800000)
  }
]

const usageStats = [
  { model: 'GPT-4', tokens: 2340, cost: 2.34, percentage: 45 },
  { model: 'Claude', tokens: 1820, cost: 1.82, percentage: 35 },
  { model: 'Mistral', tokens: 1040, cost: 0.52, percentage: 20 }
]

export default function TokenTracker({ currentUser }: TokenTrackerProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const totalBalance = currentUser?.powerTokens || 1247
  const dailyLimit = 2000
  const dailyUsed = 753
  const weeklySpent = 3240
  const monthlySpent = 12800

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'spend': return <ArrowDownLeft className="h-4 w-4 text-red-400" />
      case 'earn': return <ArrowUpRight className="h-4 w-4 text-green-400" />
      case 'purchase': return <Plus className="h-4 w-4 text-blue-400" />
      case 'stake': return <Target className="h-4 w-4 text-violet-400" />
      default: return <Zap className="h-4 w-4" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'spend': return 'text-red-400'
      case 'earn': return 'text-green-400'
      case 'purchase': return 'text-blue-400'
      case 'stake': return 'text-violet-400'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
            Token & Access Tracker
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor your Power Token usage and manage your balance
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Wallet className="h-4 w-4 mr-2" />
            Transfer PPT
          </Button>
          <Button className="bg-violet-500 hover:bg-violet-600">
            <Plus className="h-4 w-4 mr-2" />
            Top Up
          </Button>
        </div>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass violet-glow-strong">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-3xl font-bold text-violet-400">{totalBalance.toLocaleString()}</p>
                <p className="text-sm text-violet-300">PPT</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-violet-500 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Usage</p>
                <p className="text-2xl font-bold">{dailyUsed}</p>
                <p className="text-sm text-muted-foreground">/ {dailyLimit} PPT</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
            <Progress value={(dailyUsed / dailyLimit) * 100} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weekly Spent</p>
                <p className="text-2xl font-bold">{weeklySpent.toLocaleString()}</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% vs last week
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Est. Monthly Cost</p>
                <p className="text-2xl font-bold">${(monthlySpent * 0.001).toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{monthlySpent} PPT</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="manage">Manage Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Usage by Model */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Usage by AI Model
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {usageStats.map((stat) => (
                  <div key={stat.model} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{stat.model}</span>
                      <span className="text-muted-foreground">{stat.tokens} tokens</span>
                    </div>
                    <Progress value={stat.percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{stat.percentage}% of total usage</span>
                      <span>${stat.cost.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${getTransactionColor(transaction.type)}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount} PPT
                        </p>
                        {transaction.cost && (
                          <p className="text-xs text-muted-foreground">
                            ${transaction.cost.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass lg:col-span-2">
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                    <p>Usage analytics chart would be displayed here</p>
                    <p className="text-sm">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg">Usage Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <h4 className="font-medium text-violet-400 mb-2">Peak Usage</h4>
                  <p className="text-sm text-muted-foreground">
                    Most active between 2-4 PM with an average of 45 PPT per hour
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-medium text-blue-400 mb-2">Efficiency Tip</h4>
                  <p className="text-sm text-muted-foreground">
                    Switch to Mistral for code tasks to save 30% on token costs
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <h4 className="font-medium text-green-400 mb-2">Savings</h4>
                  <p className="text-sm text-muted-foreground">
                    Smart Router saved you 340 PPT this week by optimizing model selection
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Transaction History</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTransactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-violet-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{transaction.timestamp.toLocaleString()}</span>
                          {transaction.aiModel && (
                            <>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs">
                                {transaction.aiModel}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium text-lg ${getTransactionColor(transaction.type)}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount} PPT
                      </p>
                      {transaction.cost && (
                        <p className="text-sm text-muted-foreground">
                          ${transaction.cost.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Top Up Tokens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { amount: 1000, price: 10, bonus: 0 },
                    { amount: 2500, price: 20, bonus: 500 },
                    { amount: 5000, price: 40, bonus: 1500 },
                    { amount: 10000, price: 75, bonus: 4000 }
                  ].map((package) => (
                    <motion.div
                      key={package.amount}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 rounded-lg border border-border/50 hover:border-violet-500/50 cursor-pointer transition-colors text-center"
                    >
                      <p className="font-medium text-lg">{package.amount.toLocaleString()} PPT</p>
                      {package.bonus > 0 && (
                        <p className="text-sm text-green-400">+{package.bonus} bonus</p>
                      )}
                      <p className="text-muted-foreground">${package.price}</p>
                    </motion.div>
                  ))}
                </div>
                <Button className="w-full bg-violet-500 hover:bg-violet-600">
                  Purchase Tokens
                </Button>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Staking & Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <h4 className="font-medium text-violet-400 mb-2">Currently Staked</h4>
                  <p className="text-2xl font-bold">500 PPT</p>
                  <p className="text-sm text-muted-foreground">Earning 5% APY</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Available to stake:</span>
                    <span className="font-medium">{totalBalance} PPT</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Stake More
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Unstake
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h5 className="font-medium mb-2">Rewards Program</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily login bonus:</span>
                      <span className="text-green-400">+50 PPT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Referral bonus:</span>
                      <span className="text-green-400">+200 PPT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Staking rewards:</span>
                      <span className="text-green-400">+25 PPT/day</span>
                    </div>
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