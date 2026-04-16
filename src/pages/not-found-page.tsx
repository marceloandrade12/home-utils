import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-md rounded-xl border bg-background p-6 text-center shadow-sm">
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="mt-3 text-muted-foreground">This utility route does not exist yet.</p>
      <Button asChild className="mt-5">
        <Link to="/">Back home</Link>
      </Button>
    </section>
  )
}
