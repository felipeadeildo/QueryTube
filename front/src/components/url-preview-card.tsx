import { Badge } from '@/components/ui/badge'
import { getSanitizerForProvider } from '@/lib/sanitize'
import { SourceProvider } from '@/types/source'
import { type Tag } from 'emblor'
import { motion } from 'framer-motion'
import { AlertCircle, X, Youtube } from 'lucide-react'

interface UrlPreviewCardProps {
  tag: Tag
  onRemove: (id: string) => void
}

export function UrlPreviewCard({ tag, onRemove }: UrlPreviewCardProps) {
  const sanitizer = getSanitizerForProvider(SourceProvider.YOUTUBE)
  const contentId = sanitizer(tag.text)

  // Se não conseguiu extrair o ID, mostra um estado de erro
  const hasError = !contentId

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group relative flex min-w-[300px] flex-col rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md ${
        hasError ? 'border-destructive/50 bg-destructive/10' : ''
      }`}
    >
      <button
        onClick={() => onRemove(tag.id)}
        className="absolute right-2 top-2 rounded-full bg-background/80 p-1 opacity-0 transition-opacity hover:bg-destructive/10 group-hover:opacity-100"
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </button>

      <div className="flex items-center gap-2">
        {hasError ? (
          <AlertCircle className="h-5 w-5 text-destructive" />
        ) : (
          <Youtube className="h-5 w-5 text-red-500" />
        )}
        {contentId ? (
          <Badge variant="outline" className="text-xs">
            {contentId}
          </Badge>
        ) : (
          <Badge variant="destructive" className="text-xs">
            Invalid URL
          </Badge>
        )}
      </div>

      <div className="mt-2 line-clamp-1 text-sm font-medium">{tag.text}</div>

      <div className="mt-1 flex items-center gap-2">
        <Badge
          variant={hasError ? 'destructive' : 'secondary'}
          className="text-xs"
        >
          {SourceProvider.YOUTUBE}
        </Badge>
      </div>
    </motion.div>
  )
}
