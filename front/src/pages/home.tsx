import { FeatureCards } from '@/components/feature-cards'
import { SourceForm } from '@/components/source-form'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="space-y-8 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Query<span className="text-primary">Tube</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Analyze and chat with YouTube videos using AI
          </p>
        </div>

        {/* Video URL Input */}
        <SourceForm />

        {/* Feature Cards */}
        <FeatureCards />
      </motion.div>
    </div>
  )
}
