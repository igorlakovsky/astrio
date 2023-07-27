<template>
  <el-container>
    <el-header class="header">
      <div class="header__logo" />
    </el-header>
    <el-container>
      <el-aside class="aside">
        <el-menu
          class="aside__menu"
          :default-active="selectedMenu.toString()"
          active-text-color="#f1f1f1"
          :collapse="screenWidth < 650"
          @select="selectMenu"
        >
          <el-menu-item index="0" class="aside__item">
            <el-icon><el-icon-menu /></el-icon>
            <template #title>All brands</template>
          </el-menu-item>
          <el-menu-item
            v-for="brand in brandsData"
            :key="brand.id"
            :index="brand.id.toString()"
            class="aside__item"
          >
            <el-icon><el-icon-goods /></el-icon>
            <template #title>{{ brand.title }}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <el-row :gutter="screenWidth < 600 ? 8 : 20" class="main__row">
          <ProductCard
            v-for="product in productsData"
            :key="product.id"
            :image="product.image"
            :title="product.title"
            :brand="getBrand(product.brand)"
            :price="product.regular_price.value"
            :options="product?.configurable_options"
            :variants="product?.variants"
          ></ProductCard>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const screenWidth = ref();
const selectedMenu = ref(0);

const { data: brandsData } = useFetch('/api/brands');
const { data: productsData } = useFetch('/api/products', {
  query: { brand: selectedMenu },
  watch: [selectedMenu],
  server: false,
});

function selectMenu(id) {
  selectedMenu.value = id;
}

function getBrand(id) {
  return brandsData.value.find((brand) => {
    return brand.id === id;
  });
}

onMounted(() => {
  screenWidth.value = window.innerWidth;

  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
  });
});
</script>

<style lang="scss" scoped>
.header {
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
}

.aside {
  width: auto;

  &__menu {
    width: 200px;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  &__menu.el-menu--collapse {
    width: 64px;
  }

  &__item {
    padding-left: 30px !important;
    font-size: 16px;

    &:hover {
      background-color: #dbdbdb;
    }
  }

  &__item.is-active {
    background-color: #242424;
  }
}

.main {
  padding-top: 12px;

  &__title {
    font-size: 28px;
  }
}

@media screen and (width < 600px) {
  .header {
    &__logo {
      margin-left: 0;
    }
  }

  .main {
    padding: 12px 10px;
  }
}
</style>
