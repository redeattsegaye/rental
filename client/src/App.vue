<template>
<v-app>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Renting System</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items v-if="!loggedIn">
            <v-tooltip left nudge-top="2">
                <v-btn slot="activator" to="/login" flat>Sign in</v-btn>
                <span>Log into the system</span>
            </v-tooltip>
            <v-tooltip left nudge-top="2">
                <v-btn slot="activator" to="/register" flat>Register</v-btn>
                <span>Make a new account</span>
            </v-tooltip>
        </v-toolbar-items>
        <v-toolbar-items v-else>
            <v-btn icon @click="EventBus.$emit('refresh')">
      <v-icon>refresh</v-icon>
    </v-btn>

            <v-tooltip left nudge-top="2">
                <v-btn slot="activator" to="/logout" flat>Logout</v-btn>
                <span>Sign off</span>
            </v-tooltip>
        </v-toolbar-items>

  </v-toolbar>
  
  <v-navigation-drawer
    v-model="drawer"
    app
    dark
    temporary
  >
    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click=""
        :to="'/'+item.title"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  <v-container>
  <router-view/>
<v-snackbar
      v-model="snackbar"      
    >
      {{ snackbarText }}
      <v-btn
        dark
        flat
        color='blue'
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>  
  </v-container>




  <v-footer
  >
   <v-layout
      justify-center
      text-xs-center
      row
    >
     <v-flex
        xs12
      >
    <v-card
      class="blue lighten-1 white--text"
    >

      <v-card-text class="white--text">
        This is an implementation of the web client client for the RESTful API implemented in node.js(our DSP project).
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy;2019 — <strong>DTE in AAiT</strong>
      </v-card-text>
    </v-card>
         </v-flex>
</v-layout>
  </v-footer>
  </v-app>

</template>
<script>
  import AuthMixin from '@/AuthMixin';
  import EventBus from '@/event-bus'

  export default {
      name: 'App',
    data () {
      return {
        snackbarText: "Data loaded successfully.",
        snackbar: true,
        drawer: false,
        items: [
          { title: 'Houses', icon: 'dashboard' },
          { title: 'Tenants', icon: 'account_box' },
          { title: 'Invoices', icon: 'gavel' }
        ],
        EventBus
      }
    },
    mixins: [
      AuthMixin
    ],
    created() {
      EventBus.$on('refresh', () => {
        this.snackbarText = "refreshing your view..."
        this.snackbar = true;
      })
    }
  }
</script>

<style>
</style>
