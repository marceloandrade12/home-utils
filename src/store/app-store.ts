import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark'
export type LocaleMode = 'pt' | 'en'

type AppState = {
  residentName: string
  theme: ThemeMode
  locale: LocaleMode
  setResidentName: (name: string) => void
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
  setLocale: (locale: LocaleMode) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      residentName: 'Marcelo',
      theme: 'light',
      locale: 'pt',
      setResidentName: (residentName) => set({ residentName }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'home-utils-store',
    },
  ),
)
