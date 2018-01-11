<template>
  <div id="app">
    <h1>SENAI KEEP</h1>
    <form v-on:submit="logar">
      <label class="full">
        <input type="text" placeholder="USUARIO" class="full" v-model="usuario.usuario">
        <span class="error">{{erros.usuario}}</span>
      </label>
      <label class="full">
        <input type="password" placeholder="SENHA" class="full" v-model="usuario.senha">
        <span class="error">{{erros.senha}}</span>
      </label>
      <button class="btn btn-default full">ENTRAR</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        usuario: {
          usuario: '',
          senha: ''
        },
        erros: {
          usuario: '',
          senha: ''
        }
      }
    },
    methods: {
      logar: function (e) {
        e.preventDefault()
        this.erros = {usuario: '', senha: ''}
        let auth = false
        fetch('http://localhost/todo/backend/api/usuarios/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.usuario)
        })
          .then((response) => {
            if (response.status === 200) {
              auth = true
            }
            return response.json()
          })
          .then((result) => {
            if (!auth) {
              result.forEach((obj, index) => {
                let field = obj.field
                this.erros[field] = obj.message
              })
            } else {
              let user = JSON.parse(result)
              window.localStorage.setItem('token', user.token)
              this.$router.push('/')
            }
          })
      }
    }
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

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  h1 {

  }
</style>
