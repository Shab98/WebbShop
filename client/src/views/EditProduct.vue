<template>
  <div class="editProduct">
    <h1>Edit {{ oldProduct.name }}</h1>
    <form v-on:submit.prevent="submitProduct">
      <input v-model="newProduct.name" class="input" type="text" :placeholder="oldProduct.name">
      <input v-model="newProduct.description" class="input" type="text" :placeholder="oldProduct.description">
      <input v-model="newProduct.price" class="input" type="number" step="0.01" :placeholder="oldProduct.price">
      <input v-model="newProduct.category.name" class="input" type="text" :placeholder="oldProduct">
      <b-button type="submit">Submit</b-button>
    </form>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'EditProduct',
  data() {
    return {
      oldProduct: {},
      newProduct: {
        name: '',
        description: '',
        price: '',
        category: {
          name: ''
        }
      }
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
          this.oldProduct = reponse.data.product
        })
        .catch(error => {
          this.oldProduct = null
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    submitProduct() {
      if (this.newProduct.name && this.newProduct.description && this.newProduct.price && this.newProduct.category.name) {
        this.newProduct.reviews = this.oldProduct.reviews
        Api.put('/products/' + this.productId, this.newProduct)
          .then(response => {
            console.log(response.data.message)
            this.$router.push('/products/' + this.productId)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        //commented outbecause patch is not working
        
        if (!this.newProduct.name) {
          delete this.newProduct.name
        }
        if (!this.newProduct.description) {
          delete this.newProduct.description
        }
        if (!this.newProduct.price) {
          delete this.newProduct.price
        }
        if (!this.newProduct.category.name) {
          delete this.newProduct.category
        }
      console.log(this.newProduct)
        Api.patch('/products/' + this.productId, this.newProduct)
          .then(response => {
            console.log(response.data.message)
            this.$router.push('/products/' + this.productId)
          })
          .catch(error => {
            console.log(error)
            console.log(JSON.stringify(this.newProduct))
          })
          .then(() => {
          // This code is always executed (after success or error).
          console.log(this.productId)
        })
          
      }
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
