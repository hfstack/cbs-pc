<template>
  <div id="app">
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/layout/Footer'
export default {
  name: 'App',
  components: {
    Footer
  }
};
</script>

