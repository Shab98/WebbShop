<template>
  <div class="products">
    <h1>List of {{ products.length }} products</h1>
    <b-button type="button" class="createButton" @click="createProduct()">Create Product</b-button>
    <b-list-group>
      <product-item v-for="product in products" :key="product._id" :product="product" @delete-product="deleteProduct"></product-item>
    </b-list-group>
  </div>
</template>

<script>
import { Api } from '@/Api'
import ProductItem from '@/components/ProductItem'

export default {
  name: 'Products',
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
          // This code is always executed (after success or error).
        })
    },
    deleteProduct(id) {
      Api.delete(`/products/${id}`)
        .then(response => {
          console.log(response.data.message)
          var index = this.products.findIndex(product => product._id === id)
          this.products.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createProduct() {
      var randomProduct = {
        name: 'Product ' + this.getRandomInt(1000),
        description: 'Lorem Impsum',
        price: this.getRandomInt(10),
        category: {
          name: this.getRandomCategory()
        }
      }
      Api.post('/products', randomProduct)
        .then(response => {
          this.products.push(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max)
    },
    getRandomCategory() {
      var colors = ['Electronics', 'Food', 'Thing', 'Furniture']
      var index = this.getRandomInt(colors.length)
      return colors[index]
    }
  },
  components: {
    ProductItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.createButton {
  margin-bottom: 1em;
}
.products {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}
</style>
