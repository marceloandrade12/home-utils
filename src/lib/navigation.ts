import { Caravan, Home, MoreVerticalIcon, PiggyBank, UtensilsCrossed } from 'lucide-react'

import { useI18n } from '@/i18n'

export function useAppNavItems() {
  const t = useI18n()

  return [
    { to: '/', label: t.navigation.home, icon: Home, end: true, mobile: true },
    { to: '/expenses', label: t.navigation.expenses, icon: PiggyBank, end: false, mobile: false },
    { to: '/meals', label: t.navigation.meals, icon: UtensilsCrossed, end: false, mobile: false },
    { to: '/caravan', label: t.navigation.caravan, icon: Caravan, end: false, mobile: true },
    { to: '/more', label: t.navigation.more, icon: MoreVerticalIcon, end: false, mobile: true },
  ]
}

export function useMobileNavItems() {
  return useAppNavItems().filter((item) => item.mobile)
}
