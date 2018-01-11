<template>
  <div class="container-t">
    <div id="paginacao">
      <button id="voltar" class="btn" v-on:click="anterior()"><</button>
      <ul class="paginas">
        <li v-for="i in total" v-bind:class="{active: (i === atual)}"><button v-on:click="irPara(i)">{{i}}</button></li>
      </ul>
      <button id="avancar" class="btn" v-on:click="proxima()">></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'paginacao',
    data: function () {
      return {}
    },
    props: ['atual', 'total', 'proxima', 'anterior', 'irPara'],
    mounted: function () {
    }
  }
</script>

<style scoped>
  #paginacao {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #paginacao .btn {
    font-size: 32px;
    display: inline-block;
  }

  .container-t{
    max-width: 1280px;
    padding: 0 15px;
    width: 100%;
    margin: auto;
    position: fixed;
    bottom: 10px;
    display: flex;
    justify-content: flex-end;
  }

  .paginas{
    display: flex;
  }

  .paginas li button{
    border: 1px solid black;
    font-size: 18px;
  }

  .paginas li button:hover{
    background-color: #c7b95c;
  }

  .paginas li.active button{
    background-color: #9a8f47;
  }

</style>
