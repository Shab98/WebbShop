<template>
  <div class="paymentDatas">
  </div>
</template>

<script>
import { Api } from '@/Api'
import PaymentDataItem from '@/components/PaymentDataItem'
export default {
  name: 'PaymentDatas',
  data() {
    return {
        paymentDatas: []
    }
  },
  mounted() {
    this.getPaymentDatas()
  },
  methods: {
    getPaymentDatas() {
      Api.get('paymentDatas')
        .then(reponse => {
          this.paymentDatas = reponse.data.paymentDatas
        })
        .catch(error => {
          this.paymentDatas = []
          console.log(error)
        })
        .then(() => {
        })
    },
  },
  components: {
    PaymentDataItem
  }
}
</script>
