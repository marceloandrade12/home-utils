import { Moon, SunMedium } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app-store'

type ThemeToggleProps = {
    className?: string
    compact?: boolean
}

export function ThemeToggle({ className, compact = false }: ThemeToggleProps) {
    const t = useI18n()
    const theme = useAppStore((state) => state.theme)
    const toggleTheme = useAppStore((state) => state.toggleTheme)
    const isDark = theme === 'dark'

    return (
        <div className={cn('rounded-xl border bg-muted/20 p-3', className)}>
            <div className="mb-3">
                <p className="text-sm font-medium">{t.theme.title}</p>
                {!compact ? <p className="text-xs text-muted-foreground">{t.theme.description}</p> : null}
            </div>

            <Button
                type="button"
                variant="outline"
                onClick={toggleTheme}
                aria-label={t.theme.toggle}
                className="w-full justify-between"
            >
                <span className="flex items-center gap-2">
                    {isDark ? <Moon className="size-4" /> : <SunMedium className="size-4" />}
                    {isDark ? t.theme.dark : t.theme.light}
                </span>
            </Button>
        </div>
    )
}
