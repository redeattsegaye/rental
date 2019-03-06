<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Registered tenants</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">register a tenant</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Insert Tenant Details</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.SSN" label="SSN"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.number" label="House Id" hint="NOT House Number(but rather ID)" :disabled="this.editedIndex !== -1"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.phone" label="Phone Number"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.email" label="Email Address"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.fullname" label="Full Name"></v-text-field>
                </v-flex>


                                <v-flex xs12 sm6 md8>
                  <v-text-field v-model="editedItem.span" label="Renting Span"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
<v-select
          v-model="select"
          :hint="`I am: ${select.state}`"
          :items="options"
          item-text="state"
          item-value="meaning"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="fetched_data"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td @click="$router.push('/tenant/'+props.item.SSN)">{{ props.item.fullname }}</td>
        <td @click="$router.push('/tenant/'+props.item.SSN)">{{ props.item.gender }}</td>
        <td @click="$router.push('/tenant/'+props.item.SSN)">{{ props.item.SSN }}</td>
        <td @click="$router.push('/tenant/'+props.item.SSN)">{{ props.item.phone }}</td>
        <td @click="$router.push('/tenant/'+props.item.SSN)">{{ props.item.email }}</td>
        <td @click="$router.push('/tenant/'+props.item.SSN)">{{ props.item.number }}</td>
        <td @click="$router.push('/tenant/'+props.item.SSN)">{{ props.item.registered_at }}</td>
        
        <td>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import ApiMixin from '@/ApiMixin'
  import EventBus from '@/event-bus'

  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Full Name', value: 'fullname', align: 'left'},
        { text: 'gender', value: 'gender' ,align: 'left'},
        { text: 'SSN', value: 'ssn' ,align: 'left'},
        { text: 'phone', value: 'phone', sortable: false },
        { text: 'email', value: 'email', sortable: false },
        {
          text: 'House Number',
          align: 'left',
          sortable: false,
          value: 'number'
        },
        { text: 'registered at', value: 'registered_at', sortable: false }
      ],
      select: { state: 'Male', meaning: 'male' },
      options: [
          { state: 'Male', meaning: 'male' },
          { state: 'Female', meaning: 'female' }
        ],
      fetched_data: [],
      editedIndex: -1,
      editedItem: {
        number: '',
        phone: '',
        email: '',
        fullname: '',
        registered_at: '',
        SSN: ''
      },
      defaultItem: {
        number: '',
        features: '',
        price: '',
        status: ''            
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New House' : 'Edit Information'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    mixins: [
      ApiMixin
    ],

    created () {
      this.initialize_data();
      EventBus.$on('refresh', () => {
        this.initialize_data()
      })
    },

    methods: {
      initialize_data() {
        this.getFromApi(`/houses`, {}).then((res) => {

          const ids = res.data.map(eachItem => eachItem.id)

          this.fetched_data = []
          
          Promise.all(ids.map(id => new Promise((rs, rj) => {
            this.getFromApi(`/houses/${id}`, {"include" : ["tenants"], "fields": ["tenants", "id", "number"]}).then(result => {
              if(!!result.data.tenants.length){
                this.fetched_data = this.fetched_data.concat(
                  result.data.tenants.map(eachData => {
                    return {
                      ...eachData,
                      id: result.data.id,
                      number: result.data.number,
                    }
                  })
                )
                rs(result.data)
              }
              rj()

            })
          }))).then(result => {
            //this.fetched_data = result
          })
        })
      },

      editItem (item) {
        this.editedIndex = this.fetched_data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.deleteFromApi(`/houses/${item.id}`);
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          // edit logic goes here
        } else {
          console.log({...this.editedItem, gender: this.select.meaning })
          const objectTobeSent = {...this.editedItem, gender: this.select.meaning }
          objectTobeSent.registered_at = new Date()
          this.postToApi(`houses/${this.editedItem.number}/tenants`, objectTobeSent)
        }
        this.close()
      }
    }
  }
</script>