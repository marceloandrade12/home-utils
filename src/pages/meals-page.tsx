import { useI18n } from '@/i18n'

export function MealsPage() {
  const t = useI18n()

  return (
    <section className="mx-auto max-w-4xl rounded-xl border bg-background p-6 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight">{t.pages.meals.title}</h2>
      <p className="mt-3 text-muted-foreground">{t.pages.meals.description}</p>
    </section>
  )
}
