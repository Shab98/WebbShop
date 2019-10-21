<template>
  <div class="addProduct">
    <h1>Add a product</h1>
    <form v-on:submit.prevent="submitProduct">
      <input v-model="newProduct.name" class="input" type="text" placeholder="Name" required>
      <input v-model="newProduct.description" class="input" type="text" placeholder="Description" required>
      <input v-model="newProduct.price" class="input" type="number" step="0.01" placeholder="Price" required>
      <input v-model="newProduct.category.name" class="input" type="text" placeholder="Category" required>
      <br>
      <input v-model="newProduct.seller.name" class="input" type="text" placeholder="Seller">
      <hr>
      <b-button type="submit">Submit</b-button>
    </form>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'AddProduct',
  data() {
    return {
      newProduct: {
        name: '',
        description: '',
        price: '',
        category: {
          name: ''
        },
        seller: {
          name: ''
        }
      }
    }
  },
  methods: {
    submitProduct() {
      console.log(this.newProduct)
      Api.post('/products', this.newProduct)
        .then(reponse => {
          this.$router.push('/products')
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
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
