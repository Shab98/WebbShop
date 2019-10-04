<template>
  <b-list-group-item>
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
