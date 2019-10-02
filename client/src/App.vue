<template>
  <div id="app">
    <div id="nav">
      <router-link to="/users">Users</router-link> |
      <router-link to="/sellers">Seller</router-link> |
      <router-link to="/products">Product</router-link> |
      <router-link to="/reviews">Review</router-link> |
      <router-link to="/categories">Category</router-link> |
      <router-link to="/paymentDatas">PaymentData</router-link>
    </div>
    <router-view/>
  </div>
</template>
