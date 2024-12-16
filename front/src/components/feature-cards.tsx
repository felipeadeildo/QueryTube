import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Key, MessageSquare, Play } from 'lucide-react'

const features = [
  {
    icon: Play,
    title: 'YouTube Integration',
    description: 'Seamlessly transcribe and analyze any YouTube video',
  },
  {
    icon: MessageSquare,
    title: 'AI Conversations',
    description:
      'Chat naturally about video content using your preferred AI model',
  },
  {
    icon: Key,
    title: 'Your API Keys',
    description: 'Use your own API keys for complete control and privacy',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function FeatureCards() {
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {features.map((feature) => (
        <motion.div key={feature.title} variants={item}>
          <Card className="bg-card/50 backdrop-blur transition-all hover:shadow-lg hover:bg-card/60">
            <CardHeader>
              <feature.icon className="w-8 h-8 text-primary mb-2" />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
