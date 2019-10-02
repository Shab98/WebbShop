<template>
  <div class="reviews">
  </div>
</template>

<script>
import { Api } from '@/Api'
import ReviewItem from '@/components/ReviewItem'
export default {
  name: 'Reviews',
  data() {
    return {
        reviews: []
    }
  },
  mounted() {
    this.getReviews()
  },
  methods: {
    getReviews() {
      Api.get('reviews')
        .then(reponse => {
          this.reviews = reponse.data.reviews
        })
        .catch(error => {
          this.reviews = []
          console.log(error)
        })
        .then(() => {
        })
    },
  },
  components: {
    ReviewItem
  }
}
</script>
