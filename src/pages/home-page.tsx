import {
  CalendarDays,
  Clock3,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  MapPin,
  Sun,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { useI18n } from '@/i18n'

type WeatherData = {
  temperature: number
  windSpeed: number
  weatherCode: number
}

type WeatherStatusKey =
  | 'fetchingLocation'
  | 'loadingLocalWeather'
  | 'updatedWithLocation'
  | 'weatherUnavailable'
  | 'geolocationUnavailable'
  | 'locationDenied'

type ReverseGeocodingResponse = {
  results?: Array<{
    name?: string
    admin1?: string
    country?: string
  }>
}

const DEFAULT_COORDINATES = {
  latitude: 41.1833,
  longitude: -8.5333,
}

function getWeatherIcon(code?: number) {
  if (code === 0) {
    return <Sun className="size-5 text-amber-500" />
  }

  if (code === 1 || code === 2) {
    return <CloudSun className="size-5 text-sky-500" />
  }

  if (code === 3) {
    return <Cloud className="size-5 text-slate-500" />
  }

  if (code === 45 || code === 48) {
    return <CloudFog className="size-5 text-slate-400" />
  }

  if (code === 51 || code === 53 || code === 55) {
    return <CloudDrizzle className="size-5 text-cyan-500" />
  }

  if (code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) {
    return <CloudRain className="size-5 text-blue-500" />
  }

  if (code === 71 || code === 73 || code === 75) {
    return <CloudSnow className="size-5 text-indigo-300" />
  }

  if (code === 95) {
    return <CloudLightning className="size-5 text-violet-500" />
  }

  return <CloudSun className="size-5 text-primary" />
}

export function HomePage() {
  const t = useI18n()
  const [now, setNow] = useState(() => new Date())
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [weatherStatusKey, setWeatherStatusKey] = useState<WeatherStatusKey>('fetchingLocation')
  const [locationLabel, setLocationLabel] = useState<string>(t.home.defaultLocationLabel)

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(t.locale, {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    [t.locale],
  )

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(t.locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    [t.locale],
  )

  const weatherStatus = t.home.status[weatherStatusKey]
  const weatherDescription = weather
    ? t.home.weatherCodes[weather.weatherCode as keyof typeof t.home.weatherCodes] ??
    t.home.status.conditionUnavailable
    : null

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (!weather) {
      setLocationLabel(t.home.defaultLocationLabel)
    }
  }, [t.home.defaultLocationLabel, weather])

  useEffect(() => {
    const controller = new AbortController()
    const language = t.locale.startsWith('pt') ? 'pt' : 'en'

    async function getLocationLabel(latitude: number, longitude: number) {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=${language}&count=1`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          return t.home.defaultLocationLabel
        }

        const data = (await response.json()) as ReverseGeocodingResponse
        const place = data.results?.[0]

        if (!place) {
          return t.home.defaultLocationLabel
        }

        return [place.name, place.admin1 ?? place.country].filter(Boolean).join(' / ')
      } catch {
        return t.home.defaultLocationLabel
      }
    }

    async function loadWeather(latitude: number, longitude: number, label: string) {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error(t.home.status.weatherFetchError)
        }

        const data = await response.json()
        const current = data.current

        setLocationLabel(label)
        setWeather({
          temperature: Math.round(current.temperature_2m),
          windSpeed: Math.round(current.wind_speed_10m),
          weatherCode: current.weather_code,
        })
        setWeatherStatusKey('updatedWithLocation')
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return
        }

        setWeather(null)
        setLocationLabel(label)
        setWeatherStatusKey('weatherUnavailable')
      }
    }

    function loadDefaultWeather(statusKey: WeatherStatusKey) {
      setLocationLabel(t.home.defaultLocationLabel)
      setWeatherStatusKey(statusKey)
      void loadWeather(
        DEFAULT_COORDINATES.latitude,
        DEFAULT_COORDINATES.longitude,
        t.home.defaultLocationLabel,
      )
    }

    if (!navigator.geolocation) {
      loadDefaultWeather('geolocationUnavailable')

      return () => controller.abort()
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        void (async () => {
          const { latitude, longitude } = position.coords
          const label = await getLocationLabel(latitude, longitude)

          setWeatherStatusKey('loadingLocalWeather')
          await loadWeather(latitude, longitude, label)
        })()
      },
      () => {
        loadDefaultWeather('locationDenied')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    )

    return () => controller.abort()
  }, [t])

  return (
    <section className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center">
      <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-6 text-center">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {t.home.dashboard}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            <span>{locationLabel}</span>
          </div>
        </div>

        <div className="grid w-full gap-4 md:grid-cols-3">
          <InfoCard
            icon={<CalendarDays className="size-5 text-primary" />}
            label={t.home.labels.date}
            value={dateFormatter.format(now)}
          />

          <InfoCard
            icon={<Clock3 className="size-5 text-primary" />}
            label={t.home.labels.time}
            value={timeFormatter.format(now)}
          />

          <InfoCard
            icon={getWeatherIcon(weather?.weatherCode)}
            label={t.home.labels.weather}
            value={weather ? `${weather.temperature}°C · ${weatherDescription}` : weatherStatus}
            helper={weather ? `${t.home.labels.wind}: ${weather.windSpeed} km/h` : locationLabel}
          />
        </div>
      </div>
    </section>
  )
}

type InfoCardProps = {
  icon: React.ReactNode
  label: string
  value: string
  helper?: string
}

function InfoCard({ icon, label, value, helper }: InfoCardProps) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border bg-background/90 p-5 shadow-sm">
      <div className="mb-3 rounded-full bg-primary/10 p-3">{icon}</div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-balance text-lg font-semibold text-foreground">{value}</p>
      {helper ? <p className="mt-2 text-sm text-muted-foreground">{helper}</p> : null}
    </div>
  )
}
