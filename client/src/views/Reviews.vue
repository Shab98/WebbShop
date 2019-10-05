<template>
    <b-list-group>
        <div>
            <b-button variant="danger" @click="deleteAll">Delete all reviews</b-button>
        </div>
        <h1>Reviews</h1>
        <div v-if="reviews.length > 0" class="reviews">
            <review-item v-for="review in reviews" :key="review._id" :review="review"></review-item>
        </div>
        <h2 v-else>No reviews are available for this product</h2>
        <div id="create-review">
            <form v-on:submit.prevent="submitReview">
                <input v-model="newReview.text" class="input" type="text" placeholder="Write a review">
                <select v-model="newReview.rating">
                    <option >1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <b-button type="submit">Submit</b-button>
            </form>
        </div>
    </b-list-group>
</template>

<script>
import { Api } from '@/Api'
import ReviewItem from '@/components/ReviewItem'

export default {
  name: 'ListProducts',
  data() {
    return {
      reviews: [],
      newReview: {
        text: '',
        rating: '1',
        date: ''
      }
    }
  },
  created() {
    this.productId = this.$route.params.id
  },
  mounted() {
    this.getReviews()
  },
  methods: {
    getReviews() {
      Api.get('/products/' + this.productId + '/reviews')
        .then(reponse => {
          this.reviews = reponse.data.reviews
          console.log(this.reviews)
        })
        .catch(error => {
          this.reviews = []
          console.log(error)
        })
        .then(() => {
        })
    },
    submitReview() {
      this.newReview.date = new Date()
      Api.post('/products/' + this.productId + '/reviews', this.newReview)
        .then(response => {
          this.reviews.push(response.data)
          this.newReview.text = ''
          this.newReview.rating = '1'
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteAll() {
      Api.delete('/products/' + this.productId + '/reviews')
        .then(response => {
          this.reviews = []
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {
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
