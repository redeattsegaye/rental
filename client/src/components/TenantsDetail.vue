<template>
<v-container>
<template>
  <div>

    <v-toolbar tabs>
      
      <v-toolbar-title>Tenant's Fullname goes here</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          fixed-tabs
          color="transparent"
     centered
      icons-and-text
        >
         <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab href="#tab-1">
            Basic Information
         </v-tab>

          <v-tab href="#tab-2">
            Invoices
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tabs" class="white elevation-1">
      <v-tab-item
      value="tab-1"
      >

        <v-flex
        centered
        >
          <v-card centered           xs8
          sm8
          md8
          lg8>
            <v-card-title><h4>details</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile v-for="(value, key) in information"
            :key="key">
                <v-list-tile-content>{{key}}</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ value }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>



    </v-tab-item>
      <v-tab-item
      value="tab-2"
      >
        <v-card>
          <v-card-text>
          


<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="invoices"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg3
        >
          <v-card>
            <v-card-title><h4>#{{ props.item.id }}</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Amount (in Br.):</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.amount }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Date:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.date }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Reason:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.reason }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
</template>

          
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        tabs: 'tab-1',
        information:           {
            number: 'B2',
            features: '1 bed and 2 bathinvoices',
            price: 12200,
            status: 'Occupied'            
          },
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ],
        invoices: [
          {
            id: 1,
            amount: 4200,
            reason: "half-rent payment",
            date: '1/6/2019'
          },
          {
            id: 2,
            amount: 4200,
            reason: "half-rent payment",
            date: '1/6/2019'
          },
          {
            id: 3,
            amount: 4200,
            reason: "half-rent payment",
            date: '1/6/2019'
          },

        ],
         items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
          },
          {
            src: 'http://cdn.home-designing.com/wp-content/uploads/2013/11/Large-bathroom-design.jpg'
          }
        ]
      }
    }
  }
</script>