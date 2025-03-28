export type BusinessIDs = 1 | 3 | 4 | 7 | 9 | 12 | 18 | 19 | 21 | 53

export function businessTypeTranslator(businessType: string): BusinessIDs {
  let businessID: BusinessIDs = 21

  switch (businessType) {
    case 'Comidas y Bebidas':
      businessID = 4
      break
    case 'Supermercado/Minimercado':
      businessID = 7
      break
    case 'Distribuidoras':
      businessID = 18
      break
    case 'Farmacias':
      businessID = 9
      break
    case 'Tienda de Ropa y Calzado':
      businessID = 12
      break
    case 'Tienda de Repuestos':
      businessID = 3
      break
    case 'Servicios':
      businessID = 1
      break
    case 'Producción':
      businessID = 19
      break
    case 'Soy contador(a)':
      businessID = 53
      break
    case 'Otro comercio':
      businessID = 21
      break
  }
  return businessID
}
