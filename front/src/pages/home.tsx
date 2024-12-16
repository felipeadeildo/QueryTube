import { FeatureCards } from '@/components/feature-cards'
import { SourceForm } from '@/components/source-form'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section with Form */}
      <section className="relative pb-20 pt-10">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
              Query<span className="text-primary">Tube</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Analyze and chat with YouTube videos using AI
            </p>
          </div>

          {/* Form Section */}
          <div className="mx-auto max-w-5xl">
            <SourceForm />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FeatureCards />
        </motion.div>
      </section>
    </div>
  )
}
