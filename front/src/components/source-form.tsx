import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useHistory } from '@/contexts/history'
import { useCreateSources } from '@/hooks/source'
import { getSanitizerForProvider } from '@/lib/sanitize'
import { sourceInSchema, SourceProvider } from '@/types/source'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { Play, Youtube } from 'lucide-react'
import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { UrlPreviewCard } from './url-preview-card'

const formSchema = z.object({
  urls: z.array(z.string().min(1, 'At least one URL is required')),
})

type FormInputs = z.infer<typeof formSchema>

interface Tag {
  id: string
  text: string
}

export function SourceForm() {
  const navigate = useNavigate()
  const { addToHistory } = useHistory()
  const { mutateAsync: createSources, isPending } = useCreateSources()

  const [urlTags, setUrlTags] = useState<Tag[]>([])
  const [inputValue, setInputValue] = useState('')

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      urls: [],
    },
  })

  const updateFormUrls = (tags: Tag[]) => {
    form.setValue(
      'urls',
      tags.map((tag) => tag.text)
    )
  }

  const handleRemoveTag = (id: string) => {
    const updated = urlTags.filter((tag) => tag.id !== id)
    setUrlTags(updated)
    updateFormUrls(updated)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const value = inputValue.trim()

      if (value.length > 0) {
        const newTag: Tag = {
          id: Date.now().toString(),
          text: value,
        }
        const updated = [...urlTags, newTag]
        setUrlTags(updated)
        updateFormUrls(updated)
        setInputValue('')
      }
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (data: FormInputs) => {
    const sanitizer = getSanitizerForProvider(SourceProvider.YOUTUBE)

    try {
      const sources = data.urls.map((url) => ({
        contentId: sanitizer(url),
        provider: SourceProvider.YOUTUBE,
        metadata: {},
      }))

      const validSources = sources.map((source) => sourceInSchema.parse(source))

      await createSources(validSources)

      const historyItem = {
        name: new Date().toISOString(),
        sources: validSources,
      }

      addToHistory(historyItem)
      navigate(`/chat/${historyItem.name}`)
    } catch (error) {
      console.error('Error creating sources:', error)
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="urls"
            render={() => (
              <FormItem>
                <FormLabel className="text-lg flex items-center gap-2">
                  <Youtube className="h-5 w-5" />
                  Add YouTube Videos
                </FormLabel>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Paste YouTube URL and press Enter"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Supports various YouTube URL formats including regular
                    videos and shorts
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {urlTags.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {urlTags.length} video{urlTags.length !== 1 ? 's' : ''} added
                </p>
                <Button
                  type="submit"
                  disabled={urlTags.length === 0 || isPending}
                  className="min-w-32 flex items-center gap-2"
                >
                  {isPending ? (
                    <>
                      <span className="loader"></span> Processing...
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" /> Start Analysis
                    </>
                  )}
                </Button>
              </div>

              <div className="scrollbar-thin relative -mx-4 flex gap-4 overflow-x-auto px-4 pb-4">
                <AnimatePresence>
                  {urlTags.map((tag) => (
                    <UrlPreviewCard
                      key={tag.id}
                      tag={tag}
                      onRemove={handleRemoveTag}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
