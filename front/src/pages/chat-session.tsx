import { UrlPreviewCard } from '@/components/url-preview-card'
import { useHistory } from '@/contexts/history'
import { useParams } from 'react-router'

export default function ChatSession() {
  const { id } = useParams()
  const { getHistoryItem } = useHistory()
  const chatSession = getHistoryItem(id!)

  if (!chatSession) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <h1 className="text-2xl font-semibold mb-4">Chat Not Found</h1>
        <p className="text-muted-foreground">This chat session doesn't exist</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-semibold mb-4">{chatSession.name}</h1>
        <div className="bg-accent text-accent-foreground p-4 rounded-lg">
          <p className="text-lg mb-2 flex items-center justify-center">
            🚧 Under Development 🚧
          </p>
          <p>Chat interface coming soon!</p>
        </div>
        <div className="mt-4">
          {chatSession.sources.map((source) => (
            <UrlPreviewCard
              key={source.contentId}
              tag={{ id: source.contentId, text: source.contentId }}
              onRemove={(id) => console.log(`Remove tag with id: ${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
