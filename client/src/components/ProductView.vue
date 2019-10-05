<template>
  <b-list-group-item>
    Description: {{ product.description }}
    <br>
    Price: {{ product.price }}
    <br>
    Category: {{ product.category.name }}
    <b-button type="button" class="close" @click="$emit('delete-product', product._id)">&times;</b-button>
  </b-list-group-item>
</template>

<script>

export default {
  name: 'product-view',
  props: ['product']
}
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>
