import { create } from 'zustand'

type AppState = {
  residentName: string
  setResidentName: (name: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  residentName: 'Marcelo',
  setResidentName: (residentName) => set({ residentName }),
}))
