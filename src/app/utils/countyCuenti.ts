import {
  CountyCuentiResult,
  ApiCountry,
  Currency,
  CityDepartment,
} from '@/types'

export async function countyCuenti({
  country_code,
  city,
  department,
}: {
  country_code: string
  city: string
  department: string
}): Promise<CountyCuentiResult> {
  try {
    const { countryName, currencySymbol } = await normalizeCountryName({
      country_code,
    })
    const { nombreMunicipio, nombreDepartamento } =
      await normalizeCityAndDepartment({
        city,
        department,
      })
    return { countryName, nombreMunicipio, nombreDepartamento, currencySymbol }
  } catch (error) {
    console.error('Error in countyCuenti:', error)
    throw error
  }
}

async function normalizeCountryName({
  country_code,
}: {
  country_code: string
}): Promise<{ countryName: string; currencySymbol: string }> {
  const countriesUrl =
    'https://app.cuenti.com/j4pro_erp/nuevo_login/bases_datos/paises.json'

  try {
    const response = await fetch(countriesUrl)
    if (!response.ok) {
      throw new Error(`Error fetching countries: ${response.statusText}`)
    }
    const countries: ApiCountry[] = await response.json()
    const code = country_code.toUpperCase()

    const foundCountry = countries.find((item) => item.cca2 === code)
    const currencyCode = foundCountry ? foundCountry.currency[0] : 'COP'

    const currencySymbol = await normalizeCurrency({ currency: currencyCode })
    const countryName = foundCountry ? foundCountry.name.common : 'Colombia'

    return { countryName, currencySymbol }
  } catch (error) {
    console.error('Error in normalizeCountryName:', error)
    throw error
  }
}

async function normalizeCurrency({
  currency,
}: {
  currency: string
}): Promise<string> {
  const currencyUrl =
    'https://app.cuenti.com/j4pro_erp/nuevo_login/bases_datos/currency.json'
  try {
    const response = await fetch(currencyUrl)
    if (!response.ok) {
      throw new Error(`Error fetching currencies: ${response.statusText}`)
    }
    const currencyData = await response.json()
    const currencies: Currency[] = Object.values(currencyData)
    const foundCurrency = currencies.find((item) => item.code === currency)
    return foundCurrency ? foundCurrency.symbol_native : '$'
  } catch (error) {
    console.error('Error in normalizeCurrency:', error)
    throw error
  }
}

async function normalizeCityAndDepartment({
  city,
  department,
}: {
  city: string
  department: string
}): Promise<CityDepartment> {
  if (!city || !department) {
    return {
      nombreMunicipio: 'MEDELLIN',
      nombreDepartamento: 'ANTIOQUIA',
    }
  }

  const deptUrl =
    'https://app.cuenti.com/j4pro_erp/nuevo_login/bases_datos/departamento.json'
  try {
    const response = await fetch(deptUrl)
    if (!response.ok) {
      throw new Error(`Error fetching department data: ${response.statusText}`)
    }
    const data: CityDepartment[] = await response.json()
    const normalizedCity = normalize(city)
    const normalizedDept = normalize(department)

    const foundRecord = data.find((item) => {
      const cityNameNormalized = normalize(item.nombreMunicipio)
      const deptNameNormalized = normalize(item.nombreDepartamento)

      return (
        cityNameNormalized === normalizedCity &&
        deptNameNormalized.startsWith(normalizedDept)
      )
    })

    return (
      foundRecord || {
        nombreMunicipio: 'MEDELLIN',
        nombreDepartamento: 'ANTIOQUIA',
      }
    )
  } catch (error) {
    console.error('Error in normalizeCityAndDepartment:', error)
    throw error
  }
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}
