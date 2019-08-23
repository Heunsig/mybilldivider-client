<template>
  <v-list class="pt-0">
    <template v-for="item in items">
      <v-list-tile 
        :key="item.label" 
        @click="$router.push(item.router)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.label }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {
            label: 'Main',
            icon: 'home',
            router: {
              name: 'main'
            }
          },
          {
            label: 'Tutorial',
            icon: 'directions_run',
            router: {
              name: 'tutorial',
              params: { page: 'salesTax' }
            }
          },
          {
            label: 'Calculator',
            icon: 'fa-calculator',
            router: {
              name: 'calculator',
              params: { page: 'salesTax' }
            }
          }
        ]
      }
    }
  }
</script>