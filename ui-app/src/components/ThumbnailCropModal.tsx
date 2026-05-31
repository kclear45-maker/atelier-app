import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Cropper, { type Area, type MediaSize } from 'react-easy-crop'
import {
  WORK_THUMBNAIL_CROP_CANCEL,
  WORK_THUMBNAIL_CROP_CONFIRM,
  WORK_THUMBNAIL_CROP_HINT,
  WORK_THUMBNAIL_CROP_TITLE,
  WORK_THUMBNAIL_CROP_ZOOM_ARIA,
} from '../constants/workEditLabels'
import { cropThumbnailImage } from '../utils/cropThumbnailImage'

type ThumbnailCropModalProps = {
  open: boolean
  imageUrl: string
  onConfirm: (blob: Blob) => void
  onCancel: () => void
}

function getCenterSquareCrop(media: MediaSize): Area {
  const size = Math.min(media.naturalWidth, media.naturalHeight)
  return {
    x: (media.naturalWidth - size) / 2,
    y: (media.naturalHeight - size) / 2,
    width: size,
    height: size,
  }
}

/** サムネ画像 — 表示範囲を選ぶ切り取りモーダル */
export default function ThumbnailCropModal({
  open,
  imageUrl,
  onConfirm,
  onCancel,
}: ThumbnailCropModalProps) {
  const titleId = useId()
  const croppedAreaPixelsRef = useRef<Area | null>(null)
  const mediaSizeRef = useRef<MediaSize | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [mediaLoaded, setMediaLoaded] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleCropComplete = useCallback((_area: Area, pixels: Area) => {
    croppedAreaPixelsRef.current = pixels
  }, [])

  const handleMediaLoaded = useCallback((media: MediaSize) => {
    mediaSizeRef.current = media
    setMediaLoaded(true)
  }, [])

  useEffect(() => {
    if (!open) return
    croppedAreaPixelsRef.current = null
    mediaSizeRef.current = null
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setMediaLoaded(false)
    setIsSaving(false)
    setErrorMessage(null)
  }, [imageUrl, open])

  const handleConfirm = useCallback(async () => {
    if (isSaving) return

    const pixels =
      croppedAreaPixelsRef.current ??
      (mediaSizeRef.current ? getCenterSquareCrop(mediaSizeRef.current) : null)
    if (!pixels) return

    setIsSaving(true)
    setErrorMessage(null)
    try {
      const blob = await cropThumbnailImage(imageUrl, pixels)
      onConfirm(blob)
    } catch {
      setErrorMessage('\u5207\u308a\u53d6\u308a\u306b\u5931\u6557\u3057\u307e\u3057\u305f')
    } finally {
      setIsSaving(false)
    }
  }, [imageUrl, isSaving, onConfirm])

  if (!open) return null

  return createPortal(
    <div
      className="confirm-dialog thumbnail-crop-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="confirm-dialog__backdrop"
        aria-label={WORK_THUMBNAIL_CROP_CANCEL}
        onClick={onCancel}
        disabled={isSaving}
      />
      <div className="confirm-dialog__panel thumbnail-crop-modal__panel">
        <p id={titleId} className="confirm-dialog__title">
          {WORK_THUMBNAIL_CROP_TITLE}
        </p>
        <p className="thumbnail-crop-modal__hint">{WORK_THUMBNAIL_CROP_HINT}</p>

        <div className="thumbnail-crop-modal__crop-area">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="rect"
            showGrid={false}
            objectFit="contain"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
            onMediaLoaded={handleMediaLoaded}
          />
        </div>

        <label className="thumbnail-crop-modal__zoom">
          <span className="sr-only">{WORK_THUMBNAIL_CROP_ZOOM_ARIA}</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            disabled={isSaving}
          />
        </label>

        {errorMessage ? <p className="thumbnail-crop-modal__error">{errorMessage}</p> : null}

        <div className="confirm-dialog__actions thumbnail-crop-modal__actions">
          <button
            type="button"
            className="app-pill-btn app-pill-btn--wide"
            onClick={onCancel}
            disabled={isSaving}
          >
            {WORK_THUMBNAIL_CROP_CANCEL}
          </button>
          <button
            type="button"
            className="app-pill-btn app-pill-btn--wide"
            onClick={() => void handleConfirm()}
            disabled={!mediaLoaded || isSaving}
          >
            {WORK_THUMBNAIL_CROP_CONFIRM}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
