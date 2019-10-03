<template>
  <div class="product">
    <h1>Product {{ product.name }}</h1>
    <product-view :key="product._id" :product="product"></product-view>
    <br><br>
    <h1>Reviews</h1>
    <review-item v-for="review in product.reviews" :key="review._id" :review="review"></review-item>
  </div>
</template>

<script>
import { Api } from '@/Api'
import ProductView from '@/components/ProductView'
import ReviewItem from '@/components/ReviewItem'

export default {
  name: 'Product',
  data() {
    return {
      product: null
    }
  },
  mounted() {
    this.getProduct()
  },
  created() {
    this.id = this.$route.params.id
  },
  methods: {
    getProduct() {
      Api.get('/products/' + this.id)
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
    }
  },
  components: {
    ProductView,
    ReviewItem
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
