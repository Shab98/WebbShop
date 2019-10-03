<template>
  <div class="reviews">
    <b-button type="button" class="createButton" @click="createProduct()">Write Review</b-button>
    <b-list-group>
      <review-item v-for="review in reviews" :key="review._id" :review="review" @delete-review="deleteReview"></review-item>
    </b-list-group>
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

    createReview() {
      var randomReview = {
        text: 'Lorem Impsum',
        rating: this.getRandomInt(10),
        date: this.getRandomDate(new Date(2012, 0, 1), new Date())
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
    getRandomDate(start, end) {
      return Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
  },
  components: {
    ReviewItem
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
