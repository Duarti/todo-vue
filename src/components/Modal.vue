<template>
  <div class="overlay" v-if="aberto">
    <div class="modal">
      <div class="top"></div>
      <div class="middle"></div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
  import ModalMx from '../mixins/ModalMx'
  export default {
    name: 'Modal',
    data () {
      return {}
    },
    mixins: [ModalMx]
  }
</script>

<style scoped>
  .overlay{
    display: flex;
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    top:0;
    left:0;
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
    z-index: 998;
  }
  .overlay .modal{
    width: 100%;
    max-width: 720px;
    background-color: white;
    max-height: 400px;
    padding: 15px;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2), -2px -2px 2px rgba(0,0,0,0.2);
    position: relative;
    z-index: 999;
    display: flex;
    flex-direction: column;
  }
  .overlay .modal .middle{
    flex: 2;
  }
</style>
