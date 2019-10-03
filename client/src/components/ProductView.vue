<template>
  <b-list-group-item>
    {{ product }}
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
