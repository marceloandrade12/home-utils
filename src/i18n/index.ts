import { useAppStore } from '@/store/app-store'

import { en } from './en'
import { pt } from './pt'

export const translations = {
  pt,
  en,
} as const

export type AppLocale = keyof typeof translations
export type AppTranslations = (typeof translations)[AppLocale]

export function useI18n(): AppTranslations {
  const locale = useAppStore((state) => state.locale)

  return translations[locale]
}

export const t = translations.pt
