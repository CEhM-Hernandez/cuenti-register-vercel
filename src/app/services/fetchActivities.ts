export default async function fetchActivities() {
  const response = await fetch(
    'https://api-business-types.cuenti.com/getBussiness',
  )
  const data = await response.json()

  const activities = data.map(async (businessType: any) => {
    return {
      value: businessType.reference,
      id: businessType.id_businness_type,
      icon: `icon_id_sector_empresa_${businessType.id_businness_type}.svg`,
    }
  })

  return Promise.all(activities)
}
