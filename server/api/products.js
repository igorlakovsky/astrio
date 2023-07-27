import productsData from '../db/products.json';

export default defineEventHandler((event) => {
  const { brand } = getQuery(event);

  if (brand != 0)
    return productsData.filter((product) => {
      return product.brand.toString() === brand;
    });

  return productsData;
});
