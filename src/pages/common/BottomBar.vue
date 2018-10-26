<template>
  <div class="global-bottombar">
    <ul class="global-center">
      <li v-for="(item, index) in tabs">
        <router-link :to="{path: item.url}" active-class="cur">
          <i class="iconfont" v-html="highlight(index, item)"></i>
          <p>{{item.name}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [{
        name: 'Home',
        url: '/index',
        icon: '&#xe618;',
        aicon: '&#xe617;'
      },
      {
        name: 'Categories',
        url: '/categories',
        icon: '&#xe699;',
        aicon: '&#xe696;'
      },
      {
        name: 'Cart',
        url: '/cart',
        icon: '&#xe624;',
        aicon: '&#xe626;'
      }, {
        name: 'Account',
        url: '/my',
        icon: '&#xe62b;',
        aicon: '&#xe627;'
      }]
    };
  },
  methods: {
    // bottombar icon高亮
    highlight (index, item) {
      return ['home', 'categories', 'cart', 'my'][index] === this.$route.name ? item.aicon : item.icon;
    }
  }
};
</script>
