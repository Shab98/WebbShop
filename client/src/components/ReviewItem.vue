<template>
  <b-list-group-item>
    {{ review.text }}
    <br>
    {{ review.rating }} Stars
    <br>
    {{ review.date }}
    <br><br>
  </b-list-group-item>
</template>

<script>

export default {
  name: 'review-item',
  props: ['review']
}
</script>

<style scoped>
img {
  width: 33px;
  margin-right: 10px;
}
</style>
