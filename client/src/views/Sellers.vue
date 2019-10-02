<template>
  <div class="sellers">
  </div>
</template>

<script>
import { Api } from '@/Api'
import SellerItem from '@/components/SellerItem'
export default {
  name: 'Seller',
  data() {
    return {
        sellers: []
    }
  },
  mounted() {
    this.getSellers()
  },
  methods: {
    getSellers() {
      Api.get('sellers')
        .then(reponse => {
          this.sellers = reponse.data.sellers
        })
        .catch(error => {
          this.sellers = []
          console.log(error)
        })
        .then(() => {
        })
    },
  },
  components: {
    SellerItem
  }
}
</script>
