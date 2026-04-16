import { NavLink } from 'react-router-dom'

import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { useI18n } from '@/i18n'
import { useAppNavItems } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export function MorePage() {
  const t = useI18n()
  const appNavItems = useAppNavItems()

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div className="rounded-xl border bg-background p-6 shadow-sm md:hidden">
        <h3 className="text-lg font-semibold">{t.pages.more.settingsTitle}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{t.pages.more.settingsDescription}</p>
        <div className="mt-4 grid gap-4">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>

      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <h3 className="text-lg font-semibold">{t.pages.more.allLinksTitle}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{t.pages.more.allLinksDescription}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {appNavItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl border p-4 transition-colors',
                  isActive
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'hover:bg-accent hover:text-accent-foreground',
                )
              }
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="size-5" />
              </div>
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  )
}
