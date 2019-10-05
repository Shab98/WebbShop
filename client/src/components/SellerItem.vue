<template>
  <b-list-group-item>
    Name:{{ seller.name }}
    <br><br>
  </b-list-group-item>
</template>

<script>

export default {
  name: 'seller-item',
  props: ['seller']
}
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>
