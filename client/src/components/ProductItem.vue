<template>
  <b-list-group-item>
    {{ product.name }}
    <b-button type="button" class="close" @click="$emit('delete-product', product._id)">&times;</b-button>
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
