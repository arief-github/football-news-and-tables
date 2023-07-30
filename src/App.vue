<template>
  <PLNewsList/>
</template>

<script>
import PLNewsList from './components/PLNewsList.vue';

export default {
  name: 'App',
  components: {
    PLNewsList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
