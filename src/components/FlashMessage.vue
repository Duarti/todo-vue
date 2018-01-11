<template>
  <div class="overlay" v-if="aberto">
      <div class="modal">
        <div class="middle">
          <p>
            {{text}}
          </p>
          <div class="actions" v-if="actions">
            <button v-for="action in actions" v-bind:class="action.className" v-on:click="action.acao">
              {{action.titulo}}
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import ModalMx from '../mixins/ModalMx'

  export default {
    name: 'flash-message',
    mixins: [ModalMx],
    props: ['text', 'actions'],
    data: function () {
      return {
        mostrar: true
      }
    },
    mounted: function () {
    },
    methods: {
      abrir: function () {
        this.aberto = true
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
    background-color: rgba(0, 0, 0, 0.15);
    justify-content: center;
    align-items: center;
    z-index: 9998;
  }

  .overlay .modal {
    width: 100%;
    max-width: 420px;
    background-color: white;
    max-height: 200px;
    padding: 15px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2), -2px -2px 2px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 9999;
    display: flex;
    flex-direction: column;
  }

  .overlay .modal .middle {
    flex: 2;
  }

  .middle, .top, .bottom {
    width: 100%;
  }

  .actions{
    display: flex;
    justify-content: flex-end;
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
