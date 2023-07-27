import brandsData from '../db/brands.json';

export default defineEventHandler((Z) => {
  return brandsData;
});
