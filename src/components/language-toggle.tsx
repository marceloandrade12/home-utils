import { Languages } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/app-store'

type LanguageToggleProps = {
    className?: string
    compact?: boolean
}

export function LanguageToggle({ className, compact = false }: LanguageToggleProps) {
    const t = useI18n()
    const locale = useAppStore((state) => state.locale)
    const setLocale = useAppStore((state) => state.setLocale)

    return (
        <div className={cn('rounded-xl border bg-muted/20 p-3', className)}>
            <div className="mb-3 flex items-start gap-2">
                <Languages className="mt-0.5 size-4 text-primary" />
                <div>
                    <p className="text-sm font-medium">{t.language.title}</p>
                    {!compact ? (
                        <p className="text-xs text-muted-foreground">{t.language.description}</p>
                    ) : null}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <Button
                    type="button"
                    variant={locale === 'pt' ? 'default' : 'outline'}
                    onClick={() => setLocale('pt')}
                >
                    {t.language.pt}
                </Button>
                <Button
                    type="button"
                    variant={locale === 'en' ? 'default' : 'outline'}
                    onClick={() => setLocale('en')}
                >
                    {t.language.en}
                </Button>
            </div>
        </div>
    )
}
