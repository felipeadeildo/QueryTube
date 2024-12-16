import api from '@/lib/api'
import { Source, SourceIn, SourceProvider } from '@/types/source'

export const createSources = async (sources: SourceIn[]): Promise<Source[]> => {
  return await api.post('/source/', sources)
}

export const readSources = async (
  contentIds: string[],
  providers: SourceProvider[]
): Promise<Source[]> => {
  if (contentIds.length !== providers.length) {
    throw new Error('contentIds and providers must have the same length')
  }

  return await api.get('/source/', {
    params: {
      content_ids: contentIds,
      providers: providers,
    },

    paramsSerializer: (params) => {
      const queryString = new URLSearchParams()
      for (let i = 0; i < params.content_ids.length; i++) {
        queryString.append('content_ids', params.content_ids[i])
        queryString.append('providers', params.providers[i])
      }
      return queryString.toString()
    },
  })
}
