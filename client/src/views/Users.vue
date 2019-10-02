<template>
  <div class="users">
  </div>
</template>

<script>
import { Api } from '@/Api'
import UserItem from '@/components/UserItem'
export default {
  name: 'Users',
  data() {
    return {
        users: []
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      Api.get('users')
        .then(reponse => {
          this.users = reponse.data.users
        })
        .catch(error => {
          this.users = []
          console.log(error)
        })
        .then(() => {
        })
    },
  },
  components: {
    UserItem
  }
}
</script>
