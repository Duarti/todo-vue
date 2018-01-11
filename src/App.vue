<template>
  <div id="app">
    <transition name="pagina">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style src="./style/default.css">
  .pagina-enter .pagina-leave-active{
    opacity: 0;
  }

  .pagina-enter-active .pagina-leave-active{
    transition: opacity .4s;
  }
</style>
