import { createSource, readSource } from '@/services/source'
import { SourceProvider } from '@/types/source'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCreateSource = () => {
  return useMutation({
    mutationFn: createSource
  })
}

export const useReadSource = (contentId: string, provider: SourceProvider) => {
  return useQuery({
    queryKey: ['source', contentId, provider],
    queryFn: () => readSource(contentId, provider)
  })
}