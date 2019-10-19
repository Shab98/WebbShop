<template>
  <b-list-group-item>
    <b-button type="button" class="close" @click="$emit('delete-product', product._id)">&times;</b-button>
    <a :href="'products/'+product._id">{{ product.name }}</a>
  </b-list-group-item>
</template>

<script>

export default {
  name: 'product-item',
  props: ['product']
}
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>
