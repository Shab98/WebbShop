/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable */
<template>
  <div class="sellers">
    <div class="title" style="margin-bottom:40px;">
      <h1>Seller</h1>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <h2>Seller name</h2>
      </div>
    </div>
    <b-list-group>{{sellers}}</b-list-group>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'Seller',
  data() {
    return {
      sellers: []
    }
  },
  created() {
    this.productId = this.$route.params.id
  },
  mounted() {
    this.getSellers()
  },
  methods: {
    getSellers() {
      Api.get('/products/' + this.productId + '/sellers')
        .then(reponse => {
          console.log(this.productId)
          this.sellers = reponse.data.sellers
          console.log(this.sellers)
        })
        .catch(error => {
          this.sellers = []
          console.log(error)
        })
        .then(() => {})
    }
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
.products {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
