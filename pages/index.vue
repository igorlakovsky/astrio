<template>
  <div>
    <h1>productsData:</h1>
    <pre>{{ productsData }}</pre>

    <h1>brandsData:</h1>
    <pre>{{ brandsData }}</pre>
  </div>
</template>

<script setup>
const { data: productsData } = useFetch('/api/products');
const { data: brandsData } = useFetch('/api/brands');
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>
