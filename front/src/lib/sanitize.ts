import { SourceProvider } from '@/types/source'

/**
 * Extracts YouTube video ID from various URL formats
 * Supports:
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID&feature=share
 * - https://youtube.com/shorts/VIDEO_ID
 */
const extractYouTubeVideoId = (url: string): string => {
  try {
    // Remove any leading/trailing whitespace and convert to lowercase
    const sanitizedUrl = url.trim().toLowerCase()

    // Handle youtu.be format
    if (sanitizedUrl.includes('youtu.be/')) {
      const id = sanitizedUrl.split('youtu.be/')[1]?.split(/[#?&]/)[0]
      if (!id) throw new Error('Invalid YouTube URL format')
      return id
    }

    // Handle youtube.com format
    if (sanitizedUrl.includes('youtube.com/')) {
      // Handle youtube shorts
      if (sanitizedUrl.includes('/shorts/')) {
        const id = sanitizedUrl.split('/shorts/')[1]?.split(/[#?&]/)[0]
        if (!id) throw new Error('Invalid YouTube shorts URL format')
        return id
      }

      // Handle standard watch URLs
      const urlParams = new URL(sanitizedUrl).searchParams
      const id = urlParams.get('v')
      if (!id) throw new Error('Invalid YouTube URL format')
      return id
    }

    // If the input is already just an ID (11 characters), return it
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
      return url
    }

    throw new Error('Unsupported YouTube URL format')
  } catch (error) {
    throw new Error(`Failed to extract YouTube video ID: ${error}`)
  }
}

/**
 * URL sanitizer functions for different source providers
 * Used to extract standardized content IDs from various URL formats
 */
export const urlSanitizers: Record<SourceProvider, (url: string) => string> = {
  [SourceProvider.YOUTUBE]: extractYouTubeVideoId,
}

/**
 * Factory function to get the appropriate sanitizer for a source provider
 */
export const getSanitizerForProvider = (provider: SourceProvider) => {
  const sanitizer = urlSanitizers[provider]
  if (!sanitizer) {
    throw new Error(`No sanitizer available for provider: ${provider}`)
  }
  return sanitizer
}
