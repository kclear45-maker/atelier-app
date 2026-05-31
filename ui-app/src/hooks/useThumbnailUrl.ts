import { useEffect, useState } from 'react'
import { loadThumbnailBlobUrl } from '../storage/thumbnailStorage'

/** IndexedDB のサムネを blob URL として読み込む */
export function useThumbnailUrl(thumbnailId: string | null): string | null {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!thumbnailId) {
      setUrl(null)
      return
    }

    let cancelled = false
    let objectUrl: string | null = null

    loadThumbnailBlobUrl(thumbnailId).then((loaded) => {
      if (cancelled) {
        if (loaded) URL.revokeObjectURL(loaded)
        return
      }
      objectUrl = loaded
      setUrl(loaded)
    })

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [thumbnailId])

  return url
}
