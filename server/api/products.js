import productsData from '../db/products.json'

export default defineEventHandler(() => {
  return productsData
})
