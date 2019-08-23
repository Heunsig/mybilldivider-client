<template>
  <v-list 
    dense 
    class="pt-0"
  >
    <v-subheader>About us</v-subheader>
    <template v-for="item in items">
      <v-list-tile 
        :key="item.label" 
        @click="$router.push(item.router)"
      >
        <v-list-tile-action>
          <v-icon color="grey">{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="grey--text">{{ item.label }}</v-list-tile-title>
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
            label: 'FAQ',
            icon: 'help',
            router: {
              name: 'faq.list'
            }
          },
          {
            label: 'Feedback',
            icon: 'comment',
            router: {
              name: 'feedback'
            }
          },
          {
            label: 'About us',
            icon: 'info',
            router: {
              name: 'aboutUs'
            }
          }
        ]
      }
    }
  }
</script>