import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Key, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="w-8 h-8 text-primary mb-2 mx-auto"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.div>
)

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="container px-4 py-16 mx-auto text-center">
        {/* Header Section */}
        <motion.div
          className="space-y-4 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Query<span className="text-accent-foreground">Tube</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            Open-source tool for video transcription and AI-powered
            conversations with YouTube content
          </p>
          <motion.div
            className="flex justify-center gap-2"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {['Open Source', 'Privacy First', 'No Login Required'].map(
              (text) => (
                <motion.div key={text} variants={item}>
                  <Badge variant="secondary">{text}</Badge>
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mb-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Card className="bg-card/50 backdrop-blur transition-all hover:shadow-lg hover:bg-card/60">
              <CardHeader>
                <IconWrapper>
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <title>YouTube</title>
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </IconWrapper>
                <CardTitle>YouTube Integration</CardTitle>
                <CardDescription>
                  Seamlessly transcribe and analyze any YouTube video
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-card/50 backdrop-blur transition-all hover:shadow-lg hover:bg-card/60">
              <CardHeader>
                <IconWrapper>
                  <MessageSquare className="w-full h-full" />
                </IconWrapper>
                <CardTitle>AI Conversations</CardTitle>
                <CardDescription>
                  Chat naturally about video content using your preferred AI
                  model
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-card/50 backdrop-blur transition-all hover:shadow-lg hover:bg-card/60">
              <CardHeader>
                <IconWrapper>
                  <Key className="w-full h-full" />
                </IconWrapper>
                <CardTitle>Your API Keys</CardTitle>
                <CardDescription>
                  Use your own API keys for complete control and privacy
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="gap-2">
              <span>Get Started</span>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={() =>
                window.open(
                  'https://github.com/felipeadeildo/querytube',
                  '_blank'
                )
              }
            >
              <div className="w-4 h-4">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </div>
              <span>View on GitHub</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Development Badge */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Badge variant="outline" className="animate-pulse">
            Em desenvolvimento...
          </Badge>
        </motion.div>
      </div>
    </div>
  )
}
