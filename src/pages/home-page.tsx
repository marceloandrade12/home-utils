import { House, Sparkles, Wallet } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app-store'

const upcomingFeatures = [
  {
    title: 'Expenses calculator',
    description: 'Track home costs and monthly savings goals in one place.',
    icon: Wallet,
  },
  {
    title: 'Meals generator',
    description: 'Plan quick weekly meals using what you already have at home.',
    icon: Sparkles,
  },
  {
    title: 'More utilities',
    description: 'This dashboard is ready to host future home helper tools.',
    icon: House,
  },
]

export function HomePage() {
  const residentName = useAppStore((state) => state.residentName)
  const setResidentName = useAppStore((state) => state.setResidentName)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <section className="rounded-xl border bg-gradient-to-br from-background to-muted p-6 shadow-sm md:p-10">
        <p className="text-sm text-muted-foreground">Welcome home</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          {residentName}&apos;s Home Utils
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A beautiful control center for your household tools. Start with expenses and meals,
          then keep expanding with the next utilities you need.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => setResidentName('Marcelo')}>Default owner</Button>
          <Button variant="secondary" onClick={() => setResidentName('Family')}>Family mode</Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {upcomingFeatures.map(({ title, description, icon: Icon }) => (
          <article key={title} className="rounded-xl border bg-background p-5 shadow-sm">
            <Icon className="mb-4 size-5 text-primary" />
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
