<template>
  <div id="top">
    <div class="container">
      <h1>{{application}}</h1>
      <form id="busca" v-on:submit="buscar">
        <input type="text" placeholder="Pesquisar tarefa" class="full" v-model="tBusca">
      </form>
      <div id="atualizacao">
        <div>
          <p>Última atualização</p>
          <p id="tempo">{{horaAtual}}</p>
        </div>
        <button v-on:click="atualizar">
          <img src="../assets/att.png" alt="atualizar">
        </button>
      </div>
      <button v-on:click="sair">sair</button>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Top',
    data () {
      return {
        application: 'SENAI KEEP',
        tBusca: ''
      }
    },
    props: ['lastRequest', 'atualiza', 'horaAtual', 'setBusca', 'busca', 'getHoraAtual'],
    methods: {
      sair: function () {
        window.localStorage.clear()
        this.$router.push('/login')
      },
      atualizar: function () {
        this.atualiza()
      },
      buscar: function (e) {
        e.preventDefault()
        this.setBusca(this.tBusca)
        this.atualizar()
      }
    },
    mounted: function () {
      this.tBusca = this.busca
    }
  }
</script>

<!--<style scoped>-->

<!--</style>-->
