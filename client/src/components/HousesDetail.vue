<template>
<v-container>
<template>
  <div>

  <template>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

    <v-toolbar tabs>
      
      <v-toolbar-title>House Name</v-toolbar-title>

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
            Measurements
          </v-tab>

          <v-tab href="#tab-3">
            Map
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
            <v-card-title><h4> Room</h4></v-card-title>
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
      :items="rooms"
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
            <v-card-title><h4>{{ props.item.name }} Room</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Color:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.color }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Area:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.area }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Height:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.height }}</v-list-tile-content>
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
            <v-tab-item
            value="tab-3"
      >
      <v-container>
        <v-layout>
          To be implemented soon.
        </v-layout>
      </v-container>
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
        search: '',
        tabs: 'tab-1',
        information:           {
            number: 'B2',
            features: '1 bed and 2 bathrooms',
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
        rooms: [
          {
            name: 'Dining',
            color: 'white',
            height: '2.5m',
            area: '140x140'
          },          {
            name: 'Bed',
            color: 'white',
            height: '2.5m',
            area: '140x140'
          },
                    {
            name: 'Bath',
            color: 'white',
            height: '2.5m',
            area: '140x140'
          },
                    {
            name: 'Toilet',
            color: 'white',
            height: '2.5m',
            area: '140x140'
          },          {
            name: 'Guest',
            color: 'white',
            height: '2.5m',
            area: '140x140'
          },

        ],
         items: [
          {
            src: 'https://www.hellomerkato.com/files/03-2017/ad13696/14907766312130089052_large.jpg'
          },
          {
            src: 'http://ekko-apartments.com/wp-content/uploads/Deluxe-Studio-Furnished-Apartment-Addis-Ababa-Ethiopia.jpg'
          },
          {
            src: 'http://cdn.home-designing.com/wp-content/uploads/2013/11/Large-bathroom-design.jpg'
          },
          {
            src: 'http://www.contemporist.com/wp-content/uploads/2016/12/extra-large-bathroom-sink-211216-957-01-800x420.jpg'
          }
        ]
      }
    }
  }
</script>