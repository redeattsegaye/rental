import EventBus from '@/event-bus'

export default {
  data () {
    return {
      loggedIn: false
    }
  },
  created () {
    this.loggedIn = localStorage.getItem('jwt') !== null

    EventBus.$on('login', () => {
      this.loggedIn = true
    })

    EventBus.$on('logout', () => {
      this.loggedIn = false
    })
  }
}
