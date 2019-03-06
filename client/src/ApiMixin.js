import axios from 'axios'
import EventBus from '@/event-bus'

export default {
  data () {
    return {
      BASE_URL: 'http://localhost:3000/api'
    }
  },
  methods: {
    getFromApi (endpoint, filter = '') {
      return axios.get(`${this.BASE_URL}/${endpoint}${filter !== '' ? `?filter=${JSON.stringify(filter)}` : ''}`, {
        'Accept': 'application/json'
      })
    },
    postToApi (endpoint, data, auth = true) {
        return axios.post(`${this.BASE_URL}/${endpoint}${auth ? `?access_token=${localStorage.getItem('jwt')}` : ''}`, data, {
            'Accept': 'application/json'
          }).then(() => {
            EventBus.$emit('refresh')            
          })
      },
    deleteFromApi (endpoint, auth = true) {
      console.log(`${this.BASE_URL}/${endpoint}${auth ? `?access_token=${localStorage.getItem('jwt')}` : ''}`)
      return axios.delete(`${this.BASE_URL}/${endpoint}${auth ? `?access_token=${localStorage.getItem('jwt')}` : ''}`, {
        'Accept': 'application/json'
      }).then(() => {
        EventBus.$emit('refresh')            
      })
    }
  }
}
