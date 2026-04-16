import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { useI18n } from '@/i18n'
import { useAppNavItems, useMobileNavItems } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app-store'

export function MasterLayout() {
  const t = useI18n()
  const theme = useAppStore((state) => state.theme)
  const locale = useAppStore((state) => state.locale)
  const appNavItems = useAppNavItems()
  const mobileNavItems = useMobileNavItems()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
    document.documentElement.lang = locale
  }, [locale, theme])

  return (
    <div className="flex min-h-screen bg-muted/30 text-foreground">
      <aside className="hidden w-64 border-r bg-background md:flex md:flex-col">
        <div className="border-b px-6 py-5">
          <p className="text-sm text-muted-foreground">{t.app.name}</p>
          <h1 className="text-xl font-semibold">{t.app.title}</h1>
        </div>

        <nav className="flex flex-1 flex-col gap-2 p-4">
          {appNavItems.map(({ to, label, icon: Icon, end }) => (
            <NavItem key={to} to={to} label={label} end={end} Icon={Icon} />
          ))}
        </nav>

        <div className="space-y-3 border-t p-4">
          <LanguageToggle compact />
          <ThemeToggle compact />
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <main className="flex-1 p-4 pb-24 md:p-8 md:pb-8">
          <Outlet />
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/95 p-2 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-md items-center justify-around gap-2">
            {mobileNavItems.map(({ to, label, icon: Icon, end }) => (
              <NavItem key={to} to={to} label={label} end={end} Icon={Icon} mobile />
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

type NavItemProps = {
  to: string
  label: string
  end: boolean
  Icon: React.ComponentType<{ className?: string }>
  mobile?: boolean
}

function NavItem({ to, label, end, Icon, mobile = false }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
          mobile && 'flex-1 justify-center px-2 py-3 text-xs',
          isActive
            ? 'bg-primary text-primary-foreground shadow-xs'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        )
      }
    >
      <Icon className={cn('size-4', mobile && 'size-5')} />
      <span className={cn(mobile && 'sr-only')}>{label}</span>
    </NavLink>
  )
}
