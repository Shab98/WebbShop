<template>
  <div class="categories">
  </div>
</template>

<script>
import { Api } from '@/Api'
import UserItem from '@/components/CategoryItem'
export default {
  name: 'Categories',
  data() {
    return {
      categories: []
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    getCategories() {
      Api.get('categories')
        .then(reponse => {
          this.categories = reponse.data.categories
        })
        .catch(error => {
          this.categories = []
          console.log(error)
        })
        .then(() => {
        })
    }
  },
  components: {
    CategoryItem
  }
}
</script>
