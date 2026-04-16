import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

export function NotFoundPage() {
  const t = useI18n()

  return (
    <section className="mx-auto max-w-md rounded-xl border bg-background p-6 text-center shadow-sm">
      <h2 className="text-2xl font-semibold">{t.pages.notFound.title}</h2>
      <p className="mt-3 text-muted-foreground">{t.pages.notFound.description}</p>
      <Button asChild className="mt-5">
        <Link to="/">{t.pages.notFound.backHome}</Link>
      </Button>
    </section>
  )
}
