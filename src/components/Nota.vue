<template>
  <div class="nota">
    <div class="top">
      <h3>
        {{nota.titulo}}
      </h3>
      <div class="acoes">
        <button class="editar">
          <img src="../assets/edit.png" alt="editar" class="icon" @click="notaEditar(nota)">
        </button>
        <button class="excluir">
          <img src="../assets/delete.png" alt="deletar" class="icon" v-on:click="excluirNota">
        </button>
      </div>
    </div>
    <div class="lista-tarefas">
      <ul>
        <li v-for="tarefa in nota.tarefas" class="tarefa">
          <label>
            <input type="checkbox" v-model="tarefa.feita" v-on:click="marcar(tarefa)">
            <span>{{tarefa.titulo}}</span>
          </label>
          <button v-on:click="excluirTarefa(tarefa.id)">x</button>
        </li>
      </ul>
    </div>
    <flash-message v-bind:actions="[nao, excluir]" v-bind:aberto="excluirMsg"
                   text="Deseja mesmo excluir esta nota?"></flash-message>
    <flash-message v-bind:actions="[naoTarefa, acaoExcluirTarefa]" v-bind:aberto="excluirTarefaAberto"
                   text="Deseja mesmo excluir esta tarefa?"></flash-message>
    <flash-message v-bind:actions="[]" v-bind:aberto="excluirStatusMsg"
                   v-bind:text="statusExcluir"></flash-message>
  </div>
</template>

<script>
  import Request from '../helpers/Request'
  import Auth from '../helpers/Auth'
  import FlashMessage from './FlashMessage'

  export default {
    name: 'nota',
    components: {FlashMessage},
    data: function () {
      let $this = this
      return {
        excluirMsg: false,
        statusExcluir: '',
        excluirStatusMsg: false,
        excluirTarefaAberto: false,
        tarefaId: 0,
        excluir: {
          titulo: 'EXCLUIR',
          className: 'btn btn-default',
          acao: () => {
            $this.deletar()
          }
        },
        nao: {
          titulo: 'CANCELAR',
          className: 'btn btn-warn',
          acao: () => {
            $this.excluirMsg = false
          }
        },
        acaoExcluirTarefa: {
          titulo: 'EXCLUIR',
          className: 'btn btn-default',
          acao: () => {
            $this.deletarTarefa($this.tarefaId)
          }
        },
        naoTarefa: {
          titulo: 'CANCELAR',
          className: 'btn btn-warn',
          acao: () => {
            $this.excluirTarefaAberto = false
          }
        }
      }
    },
    props: ['nota', 'atualizar', 'notaEditar'],
    methods: {
      marcar: function (tarefa) {
        tarefa.feita = !tarefa.feita
        fetch(Request.REQUEST_URI + '/subtarefas/' + tarefa.id, {
          method: 'PATCH',
          headers: {
            'Authorization': 'Bearer ' + Auth.userToken(),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarefa)
        })
          .then((response) => {
            if (response !== 200) {
            }
          })
      },
      excluirNota: function () {
        this.excluirMsg = true
      },
      excluirTarefa: function (id) {
        this.tarefaId = id
        this.excluirTarefaAberto = true
      },
      deletar: function () {
        fetch(Request.REQUEST_URI + '/notas/' + this.nota.id, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + Auth.userToken()
          }
        }).then((response) => {
          if (response.status === 204) {
            this.statusExcluir = 'Nota excluída.'
          } else {
            this.statusExcluir = 'Houve um erro ao tentar excluir.'
          }
          this.excluirStatusMsg = true
          setTimeout(() => {
            this.atualizar()
            this.excluirStatusMsg = false
            this.excluirMsg = false
          }, 1600)
        })
      },
      deletarTarefa: function (id) {
        if (this.nota.tarefas.length > 1) {
          fetch(Request.REQUEST_URI + '/subtarefas/' + id, {
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer ' + Auth.userToken()
            }
          }).then((response) => {
            if (response.status === 204) {
              this.statusExcluir = 'Tarefa excluída.'
            } else {
              this.statusExcluir = 'Houve um erro ao tentar excluir.'
            }
            this.excluirStatusMsg = true
            setTimeout(() => {
              this.atualizar()
              this.excluirStatusMsg = false
              this.excluirTarefaAberto = false
            }, 1600)
          })
        } else {
          this.statusExcluir = 'Deve haver no mínimo 1 tarefa na nota.'
          this.excluirStatusMsg = true
          setTimeout(() => {
            this.atualizar()
            this.excluirStatusMsg = false
            this.excluirTarefaAberto = false
          }, 1600)
        }
      }
    }
  }
</script>

<style scoped>
  .nota {
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2), -2px -2px 3px rgba(0, 0, 0, 0.2);
    max-width: 20%;
    width: 100%;
    display: flex;
    margin: 10px 2.5%;
    padding: 10px;
    flex-direction: column;
    min-width: 250px;
    flex: 1;
  }

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .acoes {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nota h3{
    word-break: break-all;
  }

  .nota .tarefa {
    display: flex;
    justify-content: space-between;
    width: 100%;
    word-wrap: break-word;
  }

  .nota .tarefa label{
    width: 95%;
  }

  .nota .tarefa button {
    display: none;
  }

  .nota .tarefa:hover button {
    display: inline-block;
  }
</style>
