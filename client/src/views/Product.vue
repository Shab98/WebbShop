<template>
  <div id="products">
    <h1>Product {{ product.name }}</h1>
    <product-view :key="product._id" :product="product" @delete-product="deleteProduct"></product-view>
    <b-button variant="outline-primary" :href="product._id + '/reviews'">Reviews</b-button>
    <b-button variant="outline-primary" :href="product._id + '/seller'">Seller</b-button>
  </div>
</template>

<script>
import { Api } from '@/Api'
import ProductView from '@/components/ProductView'

export default {
  name: 'Product',
  data() {
    return {
      product: null
    }
  },
  created() {
    this.productId = this.$route.params.id
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      Api.get('/products/' + this.productId)
        .then(reponse => {
          this.product = reponse.data.product
        })
        .catch(error => {
          this.product = null
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    deleteProduct() {
      Api.delete('/products/' + this.productId)
        .then(response => {
          console.log(response.data.message)
          this.$router.push('/products')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    ProductView
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
#products {
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 4em;
}
.b-button {
}
</style>
