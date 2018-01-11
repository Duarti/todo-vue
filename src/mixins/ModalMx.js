var ModalMx = {
  props: ['aberto', 'acao'],
  methods: {
    fechar: function () {
      if (this.aberto) {
        this.acao()
      }
    },
    verificarTecla (e) {
      console.log(e)
    }
  }
}

export default ModalMx
