<template>
  <el-col :span="colSpan">
    <el-card class="card">
      <img :src="options ? productImage : image" class="card__img" />
      <div class="card__title">{{ title }}</div>
      <div class="card__brand">{{ brand.title }}</div>
      <div class="card__price">$ {{ price.toFixed(2) }}</div>
      <div
        v-for="option in options"
        :key="option.attribute_id"
        class="card__options"
      >
        <div
          v-for="value in option.values"
          v-if="option.attribute_code === 'color'"
          :key="value.value_index"
          :class="{
            card__options__color: true,
            card__options__disable: !findVariant(
              value.value_index,
              selectedSize
            ),
          }"
          :style="{
            backgroundColor: value.value,
            opacity: selectedColor === value.value_index ? 1 : 0.2,
          }"
          @click="
            findVariant(value.value_index, selectedSize)
              ? value.value_index === selectedColor
                ? (selectedColor = null)
                : (selectedColor = value.value_index)
              : null
          "
        />
        <div
          v-for="value in option.values"
          v-if="option.attribute_code === 'size'"
          :key="value.value_index"
          :class="{
            card__options__size: true,
            card__options__disable: !findVariant(
              selectedColor,
              value.value_index
            ),
          }"
          :style="{
            opacity: selectedSize === value.value_index ? 1 : 0.2,
          }"
          @click="
            findVariant(selectedColor, value.value_index)
              ? selectedSize === value.value_index
                ? (selectedSize = null)
                : (selectedSize = value.value_index)
              : null
          "
        >
          {{ value.label }}
        </div>
      </div>
      <el-button
        class="card__button"
        plain
        color="#242424"
        :disabled="options ? !(selectedColor && selectedSize) : false"
        @click="
          () => {
            ElNotification({
              title: 'Product added to cart',
              type: 'info',
              position: 'bottom-right',
              duration: 2000,
            });
          }
        "
      >
        Add to Cart
      </el-button>
    </el-card>
  </el-col>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: Object, required: true },
  price: { type: Number, required: true },
  options: { type: Object, default: () => {} },
  variants: { type: Object, default: () => {} },
});

const screenWidth = ref();

const selectedColor = ref(null);
const selectedSize = ref(null);

const productImage = computed(() => {
  const variant = findVariant(selectedColor.value, selectedSize.value);
  if (variant) {
    return variant.product.image;
  }
  return image;
});

const colSpan = computed(() => {
  if (screenWidth.value < 440) return 24;
  if (screenWidth.value < 860) return 12;
  if (screenWidth.value < 1300) return 8;
  if (screenWidth.value < 1700) return 6;

  return 4;
});

function selectOption() {}

function findVariant(color, size) {
  return props.variants.find((variant) => {
    return variant.attributes.every((attribute) => {
      if (attribute.code === 'color') {
        if (attribute.value_index === color || color === null) return true;
      }
      if (attribute.code === 'size') {
        if (attribute.value_index === size || size === null) return true;
      }
      return false;
    });
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
.card {
  height: calc(100% - 30px);
  padding-bottom: 10px;
  margin-bottom: 20px;

  /* stylelint-disable-next-line selector-class-pattern */
  ::v-deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    height: inherit;
  }

  &__img {
    width: 100%;
    object-fit: contain;
  }

  &__title {
    font-size: 20px;
    font-weight: 500;
  }

  &__brand {
    margin-top: 4px;
    font-size: 16px;
    color: rgb(114 114 114);
  }

  &__price {
    margin-top: 12px;
    font-size: 16px;
    font-weight: 600;
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 12px;

    &__color {
      width: 30px;
      height: 20px;
      cursor: pointer;
      border: 2px solid black;
      border-radius: 4px;
    }

    &__size {
      width: 30px;
      height: 20px;
      font-size: 18px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      border: 2px solid black;
      border-radius: 4px;
    }

    &__disable {
      cursor: not-allowed;
    }
  }

  &__button {
    width: 100%;
    margin-top: auto;
  }
}

@media screen and (width < 600px) {
  .card {
    margin-bottom: 10px;
  }
}
</style>
