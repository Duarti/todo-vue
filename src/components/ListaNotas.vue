<template>
  <div class="lista-notas">
    <nota v-bind:nota="nota" v-for="nota in notas" :key="nota.id" v-bind:atualizar="carregarNotas" v-bind:nota-editar="notaEditar"></nota>
    <paginacao v-bind:total="total" v-bind:atual="atual" v-bind:proxima="proxima" v-bind:anterior="anterior"
               v-bind:ir-para="irPara"></paginacao>
  </div>
</template>

<script>
  import Nota from './Nota'
  import Request from '../helpers/Request'
  import Auth from '../helpers/Auth'
  import Paginacao from './Paginacao'

  export default {
    name: 'lista-notas',
    components: {Nota, Paginacao},
    data: function () {
      return {
        notas: []
      }
    },
    props: ['atualizacao', 'filtro', 'busca', 'notaEditar', 'atual', 'proxima', 'anterior', 'setAtual', 'total', 'setTotal', 'horaAtual'],
    methods: {
      carregarNotas: function () {
        let filtro = ''
        let atual = ''
        let busca = ''
        if (this.filtro !== 'todos') {
          filtro = '&filtro=' + this.filtro
        }
        if (this.atual > 1) {
          atual = '&pagina=' + this.atual
        }
        if (this.busca !== '') {
          busca = '&q=' + this.busca
        }
        this.$router.push('/inicio?' + filtro + atual + busca)
        fetch(Request.REQUEST_URI + '/notas?' + filtro + atual + busca, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + Auth.userToken()
          }
        })
          .then((response) => {
            if (response.status !== 200) {
              return []
            } else {
              this.setTotal(parseInt(response.headers.get('X-Pagination-Page-Count')))
              return response.json()
            }
          })
          .then((result) => {
            this.horaAtual()
            this.notas = result
          })
      },
      irPara: function (pagina) {
        this.setAtual(pagina)
      }
    },
    mounted: function () {
      this.carregarNotas()
    },
    watch: {
      atualizacao: function () {
        this.carregarNotas()
      },
      filtro: function () {
        this.carregarNotas()
      }
    }
  }
</script>

<style scoped>
  .lista-notas {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;
    position: relative;
  }
</style>
