<template>
 <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar>
                <v-toolbar-title>Sign in</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-alert
                  :value="error"
                  color="red"
                >
                {{error}}
                </v-alert>
                <v-form action='/' @submit.prevent="login" v-model="login_valid">
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="username" :rules="[v => !!v || 'Please enter username']"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password" :rules="[v => !!v || 'Please enter password']"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey" @click="login" :loading="loggingIn" :disabled="!login_valid">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>
<style>
</style>
<script>
import axios from 'axios'
import EventBus from '@/event-bus'

export default {
  data: () => {
    return {
      username: '',
      password: '',
      error: '',
      loggingIn: false,
      login_valid: false
    }
  },
  methods: {
    login () {
      this.loggingIn = true
      axios.post('http://localhost:3000/api/users/login?include=%5B%22user%22%5D', {
        username: this.username,
        password: this.password
      }, {
        'Accept': 'application/json'
      }).then(response => {
        localStorage.setItem('jwt', response.data.id)
        localStorage.setItem('firstName', response.data.user.firstName)
        localStorage.setItem('lastName', response.data.user.lastName)
        localStorage.setItem('id', response.data.user.id)
        this.loggingIn = false
        this.error = ''
        if (this.$route.query.nextUrl) {
          this.$router.push(this.$route.query.nextUrl)
        } else {
          this.$router.push('/')
        }
        EventBus.$emit('login')
      }).catch((err) => {
        this.loggingIn = false
        if (err.response.status === 401) {
          this.error = `Invalid Credential (${err.response.statusText})`
        } else {
          this.error = `ERROR ${err.response.status}: ${err.response.statusText}`
        }
        console.error(err)
      })
    }
  }
}
</script>
