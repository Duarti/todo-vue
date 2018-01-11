const Auth = {
  isAuthenticated: false,
  userToken: function () {
    return window.localStorage.getItem('token')
  },
  login: () => {
    this.isAuthenticated = true
  },
  logout: () => {
    this.isAuthenticated = false
  }
}
export default Auth
