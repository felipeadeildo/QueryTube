import api from '@/lib/api'
import { Source, SourceIn, SourceProvider } from '@/types/source'

export const createSource = async (source: SourceIn): Promise<Source> => {
  return await api.post('/source/', source)
}

export const readSource = async (
  contentId: string,
  provider: SourceProvider
): Promise<Source> => {
  return await api.get('/source/', {
    params: { content_id: contentId, provider },
  })
}
