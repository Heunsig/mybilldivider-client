<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <v-list two-line>
            <v-subheader>About me</v-subheader>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">person</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ name }}</v-list-tile-title>
                <v-list-tile-sub-title>Name</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile 
              v-clipboard:copy="email"
              v-clipboard:success="onCopyEmail"
            >
              <v-list-tile-action>
                <v-icon color="indigo">mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title id="email">{{ email }}</v-list-tile-title>
                <v-list-tile-sub-title>E-mail</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">done</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ version }}</v-list-tile-title>
                <v-list-tile-sub-title>Version of My Bill Divider</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
        :timeout="1000"
        bottom
        v-model="snackbar"
      >
      Coied the Email
    </v-snackbar>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        snackbar: false,
        name: 'Heunsig',
        email: 'heun3344@gmail.com',
        version: 'v 0.1.22'
      }
    },
    methods: {
      onCopyEmail () {
        this.snackbar = true
      }
    }
  }
</script>