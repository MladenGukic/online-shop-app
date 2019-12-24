<template>
  <div id="app">
    <Header/>
    <main>
    <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
