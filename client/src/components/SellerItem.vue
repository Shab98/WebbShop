<template>
  <b-list-group-item>
	  {{ seller.name }}
  </b-list-group-item>
</template>

<script>

export default {
  name: 'seller-item',
  props: ['sellers']
}
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>