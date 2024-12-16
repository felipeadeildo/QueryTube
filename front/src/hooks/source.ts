import { createSources, readSources } from '@/services/source'
import { SourceProvider } from '@/types/source'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCreateSources = () => {
  return useMutation({
    mutationFn: createSources,
  })
}

export const useReadSources = (
  contentIds: string[],
  providers: SourceProvider[]
) => {
  return useQuery({
    queryKey: ['sources', contentIds, providers],
    queryFn: () => readSources(contentIds, providers),
    enabled:
      contentIds.length > 0 &&
      providers.length > 0 &&
      contentIds.length === providers.length,
  })
}
