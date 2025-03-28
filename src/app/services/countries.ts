import { Country } from '@/types'

export async function fetchCountryList(): Promise<Country[]> {
  try {
    const res = await fetch('https://flagcdn.com/es/codes.json')
    if (!res.ok) throw new Error('Network response was not ok')

    const data = (await res.json()) as Record<string, string>
    return Object.entries(data)
      .map(([countryCode, countryName]) => ({ countryCode, countryName }))
      .filter(({ countryCode }) => !countryCode.includes('us-'))
      .sort((a, b) => a.countryName.localeCompare(b.countryName))
  } catch (error) {
    console.error('Error obteniendo países:', error)
    return []
  }
}
