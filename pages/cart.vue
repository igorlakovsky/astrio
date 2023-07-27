<template>
  <el-container>
    <el-header class="header">
      <div class="header__logo" />
      <nuxt-link to="/" class="header__home">
        <el-icon size="32">
          <el-icon-menu />
        </el-icon>
      </nuxt-link>
    </el-header>
    <el-main class="main">
      <p>Shopping Cart</p>

      <div
        v-if="!products.length"
        :style="{ marginTop: '10px', fontSize: '18px' }"
      >
        No products
      </div>

      <el-row v-if="products.length" class="main__table__header">
        <el-col :xs="9" :span="12">Item</el-col>
        <el-col :xs="5" :span="4" :style="{ textAlign: 'center' }">
          Price
        </el-col>
        <el-col :xs="5" :span="4" :style="{ textAlign: 'center' }">
          Qty
        </el-col>
        <el-col :xs="5" :span="4" :style="{ textAlign: 'center' }">
          Total
        </el-col>
      </el-row>

      <ProductCart
        v-for="product in products"
        :id="product.id"
        :key="product.id"
        :image="product.image"
        :title="product.title"
        :brand="product.brand"
        :color="product.color"
        :size="product.size"
        :price="product.price"
        :count="product.count"
      />

      <div v-if="products.length" class="main__general">
        <p class="main__subtotal">
          {{ `Subtotal: $ ${productsSubtotal}` }}
        </p>
        <el-button
          ref="buttonRef"
          color="#242424"
          size="large"
          class="main__general__checkout"
          @mouseup="
            () => {
              buttonRef.ref.blur();
            }
          "
        >
          Checkout
        </el-button>
      </div>
    </el-main>
    <pre>{{ cartProducts }}</pre>
  </el-container>
</template>

<script setup>
import { computed } from 'vue';

const cartProducts = useState('cartProducts');

const buttonRef = ref();

const products = computed(() => {
  const value = [];
  cartProducts.value?.forEach((product) => {
    const addedProduct = value.find((added) => {
      return added.id === product.id;
    });
    if (addedProduct) {
      addedProduct.count++;
    } else {
      value.push({ ...product, count: 1 });
    }
  });
  return value;
});

const productsSubtotal = computed(() => {
  return products.value
    .reduce((acc, product) => acc + product.price * product.count, 0)
    .toFixed(2);
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  border-bottom: solid 1px var(--el-menu-border-color);

  &__logo {
    width: 130px;
    height: 100%;
    margin-left: 16px;
    cursor: pointer;
    background-image: url('/images/logo.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  &__home {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 20px;
    color: black;
  }
}

.main {
  p {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
  }

  &__table {
    &__header {
      margin-top: 14px;
      font-size: 18px;
      font-weight: 500;
    }
  }

  &__general {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    width: fit-content;
    margin-top: 20px;
    margin-right: 40px;
    margin-left: auto;

    &__checkout {
      width: 120%;
      font-family: 'Dai Banna SIL', serif;
      font-size: 22px;
      font-weight: 500;
    }
  }

  &__subtotal {
    text-align: right;
  }
}

@media screen and (width < 660px) {
  .main {
    padding-right: 4px;
    padding-left: 4px;

    &__general {
      margin-right: auto;
    }
  }
}
</style>
