<template>
  <el-row class="product" align="middle">
    <el-col :xs="9" :span="12" class="product__col">
      <img :src="image" class="product__image" />
      <div class="product__info">
        <div class="product__info__title">{{ `${brand} / ${title}` }}</div>
        <div v-if="color" class="product__info__option">
          {{ `Color: ${color}` }}
        </div>
        <div v-if="size" class="product__info__option">
          {{ `Size: ${size}` }}
        </div>
      </div>
    </el-col>
    <el-col :xs="5" :span="4" :style="{ textAlign: 'center' }">
      {{ `$ ${price.toFixed(2)}` }}
    </el-col>
    <el-col :xs="5" :span="4" :style="{ textAlign: 'center' }">
      <el-input-number
        v-model="productCount"
        controls-position="right"
        class="product__count"
        :min="0"
        :max="99"
        @change="changeCount"
      />
    </el-col>
    <el-col :xs="5" :span="4" :style="{ textAlign: 'center', fontWeight: 600 }">
      {{ `$ ${(price * count).toFixed(2)}` }}
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  id: { type: Number, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  brand: { type: String, required: true },
  color: { type: String, default: undefined },
  size: { type: String, default: undefined },
  price: { type: Number, required: true },
  count: { type: Number, required: true },
});

const cartProducts = useState('cartProducts');

const productCount = ref(props.count);

function changeCount(currentCount) {
  if (currentCount - props.count > 0) {
    for (let i = 0; i < currentCount - props.count; i++) {
      cartProducts.value.splice(
        cartProducts.value.findIndex((product) => {
          return product.id === props.id;
        }),
        0,
        {
          id: props.id,
          image: props.image,
          title: props.title,
          brand: props.brand,
          price: props.price,
          color: props.color,
          size: props.size,
        }
      );
    }
  } else {
    for (let i = 0; i < props.count - currentCount; i++) {
      cartProducts.value.splice(
        cartProducts.value.findIndex((product) => {
          return product.id === props.id;
        }),
        1
      );
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  padding-bottom: 10px;
  margin-top: 20px;
  border-bottom: solid 1px var(--el-menu-border-color);

  &__col {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  &__image {
    width: 60px;
    height: 60px;
  }

  &__info {
    display: flex;
    flex-direction: column;

    &__title {
      font-size: 18px;
    }
  }

  &__count {
    width: 60px;

    /* stylelint-disable-next-line selector-class-pattern */
    ::v-deep(.el-input__wrapper) {
      padding-right: 32px;
      padding-left: 12px;

      --el-input-focus-border-color: #242424;
      --el-color-primary: #242424;
    }

    ::v-deep(span) {
      width: 20px;

      --el-color-primary: #242424;
    }
  }
}

@media screen and (width < 660px) {
  .product {
    &__col {
      flex-wrap: wrap;
      gap: 4px;
    }
  }
}
</style>
