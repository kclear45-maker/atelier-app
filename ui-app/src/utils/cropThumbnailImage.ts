import { WORK_THUMBNAIL_OUTPUT_SIZE } from '../constants/workImage'

export type CropAreaPixels = {
  x: number
  y: number
  width: number
  height: number
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

/** 選択範囲を正方形 JPEG に切り出す */
export async function cropThumbnailImage(
  imageSrc: string,
  pixelCrop: CropAreaPixels,
  outputSize = WORK_THUMBNAIL_OUTPUT_SIZE,
): Promise<Blob> {
  const image = await loadImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = outputSize
  canvas.height = outputSize
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas is not supported')

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputSize,
    outputSize,
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Failed to export cropped image'))
      },
      'image/jpeg',
      0.88,
    )
  })
}
