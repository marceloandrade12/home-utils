import { BarChart3, Caravan, Fuel, Gauge, Percent, Route } from 'lucide-react'
import { useMemo, useState } from 'react'

import { useI18n } from '@/i18n'

function parseDecimal(value: string, fallback = 0) {
  const normalized = value.replace(',', '.').trim()
  const parsed = Number(normalized)

  return Number.isFinite(parsed) ? parsed : fallback
}

export function CaravanPage() {
  const t = useI18n()
  const [distance, setDistance] = useState('300')
  const [baseConsumption, setBaseConsumption] = useState('8')
  const [extraConsumption, setExtraConsumption] = useState('40')
  const [fuelPrice, setFuelPrice] = useState('1.70')

  const currencyFormatter = new Intl.NumberFormat(t.locale, {
    style: 'currency',
    currency: 'EUR',
  })

  const numberFormatter = new Intl.NumberFormat(t.locale, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })

  const summary = useMemo(() => {
    const km = Math.max(0, parseDecimal(distance))
    const base = Math.max(0, parseDecimal(baseConsumption, 8))
    const extra = Math.max(0, parseDecimal(extraConsumption, 40))
    const fuel = Math.max(0, parseDecimal(fuelPrice, 1.7))

    const normalLiters = (km / 100) * base
    const caravanConsumption = base * (1 + extra / 100)
    const caravanLiters = (km / 100) * caravanConsumption
    const extraLiters = Math.max(0, caravanLiters - normalLiters)
    const totalCost = caravanLiters * fuel
    const extraCost = extraLiters * fuel
    const maxBarValue = Math.max(normalLiters, caravanLiters, extraLiters, 1)

    return {
      km,
      base,
      extra,
      fuel,
      normalLiters,
      caravanConsumption,
      caravanLiters,
      extraLiters,
      totalCost,
      extraCost,
      maxBarValue,
    }
  }, [distance, baseConsumption, extraConsumption, fuelPrice])

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight">{t.pages.caravan.title}</h2>
        <p className="mt-2 text-muted-foreground">{t.pages.caravan.description}</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Caravan className="size-5 text-primary" />
            <h3 className="text-lg font-semibold">{t.pages.caravan.formTitle}</h3>
          </div>

          <p className="mb-5 text-sm text-muted-foreground">{t.pages.caravan.autoUpdate}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              icon={<Route className="size-4 text-primary" />}
              label={t.pages.caravan.inputs.distance}
              unit={t.pages.caravan.units.km}
              value={distance}
              onChange={setDistance}
            />

            <InputField
              icon={<Fuel className="size-4 text-primary" />}
              label={t.pages.caravan.inputs.baseConsumption}
              unit={t.pages.caravan.units.litersPer100Km}
              value={baseConsumption}
              onChange={setBaseConsumption}
            />

            <InputField
              icon={<Percent className="size-4 text-primary" />}
              label={t.pages.caravan.inputs.extraConsumption}
              unit={t.pages.caravan.units.percent}
              value={extraConsumption}
              onChange={setExtraConsumption}
            />

            <InputField
              icon={<Gauge className="size-4 text-primary" />}
              label={t.pages.caravan.inputs.fuelPrice}
              unit={t.pages.caravan.units.eurosPerLiter}
              value={fuelPrice}
              onChange={setFuelPrice}
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="size-5 text-primary" />
            <h3 className="text-lg font-semibold">{t.pages.caravan.summary.title}</h3>
          </div>

          <div className="grid gap-3">
            <SummaryCard
              label={t.pages.caravan.summary.totalCost}
              value={currencyFormatter.format(summary.totalCost)}
            />
            <SummaryCard
              label={t.pages.caravan.summary.litersNeeded}
              value={`${numberFormatter.format(summary.caravanLiters)} ${t.pages.caravan.units.liters}`}
            />
            <SummaryCard
              label={t.pages.caravan.summary.caravanConsumption}
              value={`${numberFormatter.format(summary.caravanConsumption)} ${t.pages.caravan.units.litersPer100Km}`}
            />
            <SummaryCard
              label={t.pages.caravan.summary.extraCost}
              value={currencyFormatter.format(summary.extraCost)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <BarChart3 className="size-5 text-primary" />
          <h3 className="text-lg font-semibold">{t.pages.caravan.chart.title}</h3>
        </div>

        <div className="space-y-4">
          <MetricBar
            label={t.pages.caravan.chart.normalCar}
            value={`${numberFormatter.format(summary.normalLiters)} ${t.pages.caravan.units.liters}`}
            percentage={(summary.normalLiters / summary.maxBarValue) * 100}
            barClassName="bg-slate-400"
          />

          <MetricBar
            label={t.pages.caravan.chart.withCaravan}
            value={`${numberFormatter.format(summary.caravanLiters)} ${t.pages.caravan.units.liters}`}
            percentage={(summary.caravanLiters / summary.maxBarValue) * 100}
            barClassName="bg-primary"
          />

          <MetricBar
            label={t.pages.caravan.chart.extraImpact}
            value={`${numberFormatter.format(summary.extraLiters)} ${t.pages.caravan.units.liters}`}
            percentage={(summary.extraLiters / summary.maxBarValue) * 100}
            barClassName="bg-amber-500"
          />
        </div>
      </div>
    </section>
  )
}

type InputFieldProps = {
  icon: React.ReactNode
  label: string
  unit: string
  value: string
  onChange: (value: string) => void
}

function InputField({ icon, label, unit, value, onChange }: InputFieldProps) {
  return (
    <label className="flex flex-col gap-2 rounded-xl border bg-muted/20 p-4">
      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
        {icon}
        {label}
      </span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.1"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
        />
        <span className="shrink-0 rounded-md bg-background px-2 py-1 text-xs text-muted-foreground">
          {unit}
        </span>
      </div>
    </label>
  )
}

type SummaryCardProps = {
  label: string
  value: string
}

function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="rounded-xl border bg-muted/20 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  )
}

type MetricBarProps = {
  label: string
  value: string
  percentage: number
  barClassName: string
}

function MetricBar({ label, value, percentage, barClassName }: MetricBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${barClassName}`}
          style={{ width: `${Math.max(6, Math.min(percentage, 100))}%` }}
        />
      </div>
    </div>
  )
}
