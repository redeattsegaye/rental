<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Registered Houses</v-toolbar-title>
      <v-spacer></v-spacer>
       <v-text-field
        v-model="search"
        append-icon="search"
        @keyup="doSearch()"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Insert House</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.number" label="House Number" :disabled="this.editedIndex !== -1"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.features" label="Features"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
<v-select
          v-model="select"
          :hint="`${select.state} (${select.meaning})`"
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
        <td @click="$router.push('/houses/'+props.item.number)">{{ props.item.id }}</td>
        <td @click="$router.push('/houses/'+props.item.number)">{{ props.item.number }}</td>
        <td @click="$router.push('/houses/'+props.item.number)">{{ props.item.features }}</td>
        <td @click="$router.push('/houses/'+props.item.number)">{{ props.item.price }}</td>
        <td @click="$router.push('/houses/'+props.item.number)">{{ props.item.status }}</td>
        <td>
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
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
      original_data: [],
      headers: [
        {
          text: 'Id',
          align: 'left',
          sortable: false,
          value: 'number'
        },
        {
          text: 'House Number',
          align: 'left',
          sortable: false,
          value: 'number'
        },
        { text: 'Features', value: 'features', align: 'left'},
        { text: 'Price', value: 'price' ,align: 'left'},
        { text: 'Status', value: 'status' ,align: 'left'},
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      select: { state: 'Vacant', meaning: 'not taken' },
      options: [
          { state: 'Vacant', meaning: 'not taken' },
          { state: 'Occupied', meaning: 'taken' }
        ],
      fetched_data: [],
      editedIndex: -1,
      editedItem: {
            number: '',
            features: '',
            price: '',
            status: ''
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
          this.fetched_data = res.data
          this.original_data = this.fetched_data
        })
      },

      doSearch() {
        this.fetched_data = this.original_data.filter((eachItem) => {
          return eachItem.number.toLowerCase().indexOf(this.search.toLowerCase()) != -1
        })

        if(this.search == ''){
          this.fetched_data = this.original_data
        }
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
          console.log({...this.editedItem, status: this.select })
          this.postToApi('houses', {...this.editedItem, status: this.select.state })
        }
        this.close()
      }
    }
  }
</script>