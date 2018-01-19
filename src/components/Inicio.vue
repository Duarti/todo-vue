<template>
  <div id="app">
    <top v-bind:atualiza="atualiza" v-bind:hora-atual="horaAtual" v-bind:set-busca="setBusca" v-bind:busca="busca"></top>
    <div class="container" id="content">
      <div id="before-list">
        <form>
          <label for="todos">
            <input type="radio" name="filtro" value="todos" id="todos" v-model="filtro">
            todos
          </label>
          <label for="completados">
            <input type="radio" name="filtro" value="completados" id="completados" v-model="filtro">
            completados
          </label>
          <label for="inacabados">
            <input type="radio" name="filtro" value="inacabados" id="inacabados" v-model="filtro">
            inacabados
          </label>
        </form>
        <button id="add" class="btn btn-default" v-on:click="alterarModalCadastro">CRIAR UMA NOTA</button>
      </div>
      <lista-notas v-bind:atualizacao="atualizacao" v-bind:filtro="filtro" v-bind:busca="busca"
                   v-bind:nota-editar="setNota" v-bind:atual="atual" v-bind:proxima="proxima"
                   v-bind:anterior="anterior" v-bind:set-atual="setAtual" v-bind:total="total"
                   v-bind:set-total="setTotal" v-bind:hora-atual="getHoraAtual"></lista-notas>
    </div>
    <cadastro-modal v-bind:aberto="aberto" v-bind:acao="alterarModalCadastro" v-bind:atualiza="atualiza"
                    v-bind:nota-editar="nota"></cadastro-modal>
  </div>
</template>

<script>
  import Top from './Top'
  import CadastroModal from './CadastroModal'
  import ListaNotas from './ListaNotas'

  export default {
    components: {Top, CadastroModal, ListaNotas},
    name: 'inicio',
    data () {
      return {
        userToken: null,
        aberto: false,
        atualizacao: 0,
        filtro: 'todos',
        busca: '',
        atual: undefined,
        nota: undefined,
        total: 1,
        horaAtual: ''
      }
    },
    methods: {
      getHoraAtual: function () {
        let date = new Date()
        let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        this.horaAtual = h + ':' + m
      },
      alterarModalCadastro: function () {
        this.aberto = !this.aberto
      },
      atualiza: function () {
        this.atualizacao++
      },
      setBusca: function (q) {
        this.busca = q
      },
      setNota: function (nota) {
        this.nota = nota
        this.aberto = true
      },
      proxima: function () {
        if (this.atual < this.total) {
          this.atual++
          this.atualiza()
        }
      },
      anterior: function () {
        if (this.atual > 1) {
          this.atual--
          this.atualiza()
        }
      },
      setAtual: function (v) {
        this.atual = v
        this.atualiza()
      },
      setTotal: function (t) {
        this.total = t
      }
    },
    created: function () {
      this.getHoraAtual()
      let params = this.$route.query
      this.filtro = params.filtro !== undefined ? params.filtro : 'todos'
      this.busca = params.busca !== undefined ? params.busca : ''
      this.atual = params.pagina !== undefined ? params.pagina : 1
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped src="../style/default.css"></style>-->
