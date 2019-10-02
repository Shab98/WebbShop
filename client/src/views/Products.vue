<template>
  <div class="products">
  </div>
</template>

<script>
import { Api } from '@/Api'
import ProductItem from '@/components/ProductItem'
export default {
    name: 'Products'
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
      Api.get('products')
        .then(reponse => {
          this.products = reponse.data.products
        })
        .catch(error => {
          this.products = []
          console.log(error)
        })
        .then(() => {
        })
    },
  },
  components: {
    ProductItem
  }
}
</script>
