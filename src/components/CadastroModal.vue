<template>
  <transition name="fade">
    <div class="overlay" v-if="aberto">
      <div class="modal">
        <div class="top"></div>
        <div class="middle">
          <input type="text" placeholder="Insira um Titulo" v-model="nota.titulo" class="full"
                 v-on:change="erros.titulo = ''">
          <span class="error">{{erros.titulo}}</span>
          <ul>
            <li v-for="tarefa in nota.tarefas">
              <label>
                <input type="checkbox" v-model="tarefa.feita">
              </label>
              <span contenteditable="true" v-on:blur="(e)=>{tarefaChange(e,tarefa)}" v-html="tarefa.titulo"></span>
            </li>
          </ul>
          <span class="error">{{erros.tarefas}}</span>
          <form v-on:submit="adicionarTarefa">
            <div class="label-integrado">
              <button class="btn btn-default btn-square" type="submit">+</button>
              <input type="text" placeholder="Adicionar item" v-model="novaTarefa" v-on:change="erros.novaTarefa = ''">
            </div>
            <span class="error">{{erros.novaTarefa}}</span>
          </form>
        </div>
        <div class="bottom">
          <button class="btn btn-default" v-on:click="fechar">CANCELAR</button>
          <button class="btn btn-default" v-on:click="salvar">SALVAR NOTA</button>
        </div>
      </div>
      <flash-message text="Nota adicionada com sucesso!" v-bind:acao="flashChange"
                     v-bind:aberto="flashOpen"></flash-message>
    </div>
  </transition>
</template>

<script>
  import ModalMx from '../mixins/ModalMx'
  import Auth from '../helpers/Auth'
  import FlashMessage from './FlashMessage'
  import Request from '../helpers/Request'

  function initialData () {
    return {
      nota: {
        id: undefined,
        criacao: undefined,
        titulo: '',
        tarefas: []
      },
      novaTarefa: '',
      erros: {
        novaTarefa: '',
        tarefas: '',
        titulo: ''
      },
      flashOpen: false
    }
  }

  export default {
    name: 'Cadastro-modal',
    components: {FlashMessage},
    mixins: [ModalMx],
    data: function () {
      return initialData()
    },
    props: ['atualiza', 'notaEditar'],
    methods: {
      tarefaChange: function (e, tarefa) {
        tarefa.titulo = e.path[0].innerText
      },
      adicionarTarefa: function (e) {
        e.preventDefault()
        if (this.novaTarefa === '') {
          this.erros.novaTarefa = 'Título do item não pode ficar em branco'
        } else {
          let tarefa = {
            titulo: this.novaTarefa,
            feita: false
          }
          this.nota.tarefas.push(tarefa)
          this.novaTarefa = ''
          this.erros.tarefas = ''
        }
      },
      fechar: function () {
        if (this.aberto) {
          Object.assign(this.$data, initialData())
          this.acao()
        }
      },
      flashChange: function () {
        this.flashOpen = !this.flashOpen
      },
      salvar: function () {
        let tipo = this.nota.id != null ? 'PUT' : 'POST'
        let id = this.nota.id != null ? '/' + this.nota.id : ''
        let code
        fetch(Request.REQUEST_URI + '/notas' + id, {
          method: tipo,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Auth.userToken()
          },
          body: JSON.stringify(this.nota)
        })
          .then((response) => {
            code = response.status
            return response.json()
          })
          .then((result) => {
            if (code === 200 || code === 201) {
              this.flashChange()
              setTimeout(() => {
                this.atualiza()
                this.fechar()
              }, 1600)
            } else {
              result.forEach((obj, index) => {
                let field = obj.field
                this.erros[field] = obj.message
              })
            }
          })
      }
    },
    watch: {
      notaEditar: function (e) {
        this.nota = e
      }
    }
  }
</script>

<style scoped>
  .overlay {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 998;
  }

  .overlay .modal {
    width: 100%;
    max-width: 720px;
    background-color: white;
    max-height: 400px;
    padding: 15px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2), -2px -2px 2px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 999;
    display: flex;
    flex-direction: column;
    margin: 0 10px;
  }

  .overlay .modal .middle {
    flex: 2;
  }

  .middle, .top, .bottom {
    width: 100%;
  }

  .bottom {
    display: flex;
    justify-content: flex-end;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
