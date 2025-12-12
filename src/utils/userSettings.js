const STORAGE_KEY = 'study_with_miku_settings'

const defaultSettings = {
  pomodoro: {
    focusDuration: 25,
    breakDuration: 5
  },
  video: {
    currentIndex: 0
  },
  music: {
    currentSongIndex: 0
  }
}

export const getSettings = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) }
    }
  } catch (e) {
    console.error('Failed to load settings:', e)
  }
  return { ...defaultSettings }
}

export const saveSettings = (settings) => {
  try {
    const current = getSettings()
    const merged = { ...current, ...settings }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  } catch (e) {
    console.error('Failed to save settings:', e)
  }
}

export const savePomodoroSettings = (focusDuration, breakDuration) => {
  const settings = getSettings()
  settings.pomodoro = { focusDuration, breakDuration }
  saveSettings(settings)
}

export const getPomodoroSettings = () => {
  return getSettings().pomodoro
}

export const saveVideoIndex = (index) => {
  const settings = getSettings()
  settings.video = { currentIndex: index }
  saveSettings(settings)
}

export const getVideoIndex = () => {
  return getSettings().video.currentIndex
}

export const saveMusicIndex = (index) => {
  const settings = getSettings()
  settings.music = { currentSongIndex: index }
  saveSettings(settings)
}

export const getMusicIndex = () => {
  return getSettings().music.currentSongIndex
}
