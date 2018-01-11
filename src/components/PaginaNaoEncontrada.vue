<template>
  <div id="app">
    <div class="container">
      <img src="../assets/robot.svg" alt="Robot">
      <div>
        <h1>SENAI KEEP</h1>
        <h2>404 - Página não encontrada!</h2>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pagina-nao-encontrada'
  }
</script>

<style scoped>
  #app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #e9d86d;
  }
  #app .container{
    width: 100%;
    max-width: 720px;
    justify-content: center;
    align-items: center;
  }
  #app .container div{
    margin-left: 20px;
    font-size: 105%;
  }
  #app img{
    height: 400px;
  }
  h1, h2{
    margin: 0;
  }
</style>
