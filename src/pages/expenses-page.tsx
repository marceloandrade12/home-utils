import { useI18n } from '@/i18n'

export function ExpensesPage() {
  const t = useI18n()

  return (
    <section className="mx-auto max-w-4xl rounded-xl border bg-background p-6 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight">{t.pages.expenses.title}</h2>
      <p className="mt-3 text-muted-foreground">{t.pages.expenses.description}</p>
    </section>
  )
}
