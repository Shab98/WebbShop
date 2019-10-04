<template>
  <div>
    <b-jumbotron header="Web Shop" lead="Welcome to our online shop">
      <p></p>
      <b-button variant="primary" href="/products">List Products</b-button>
    </b-jumbotron>
    <b-container>
     <b-row>
        <b-col class="table" cols="6" md="6"></b-col>
        <b-col class="table" cols="12" md="6"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.table {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: whitesmoke;
  border: 2px solid lightgray;
}
.jumbotron{
  background-size: cover;
  color:black;
  height: 300px;
  background-color:transparent !important;
}
</style>
