const STORAGE_KEY = 'creative-app-atelier-intro-auto-seen'

/** 初回自動表示の注意モーダルを一度閉じたか */
export function hasSeenAtelierIntroAuto(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

/** 初回自動表示を完了済みにする（画鋲からの再表示には影響しない） */
export function markAtelierIntroAutoSeen(): void {
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // localStorage 不可時は次回も自動表示されるが、画鋲からは開ける
  }
}
