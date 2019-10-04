<template>
      <div class="products">
        <div class="title" style="margin-bottom:40px;">
          <h1>List of {{ products.length }} Products</h1>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <h2>PRODUCT NAME</h2>
          </div>
          </div>
          <b-list-group>
            <product-item v-for="product in products" :key="product._id" :product="product"></product-item>
          </b-list-group>
          <!--<div class="row" style="margin-bottom:20px;">
            <div class="col-sm-12">
              <p>{{ product.name }}</p>
            </div>
            </div>-->
      </div>
    </template>
<script>
import { Api } from '@/Api'
import ProductItem from '@/components/ProductItem'

export default {
  name: 'ListProducts',
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      Api.get('/products')
        .then(reponse => {
          this.products = reponse.data.products
        })
        .catch(error => {
          this.products = []
          console.log(error)
        })
        .then(() => {
        })
    }
  },
  components: {
    ProductItem
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
