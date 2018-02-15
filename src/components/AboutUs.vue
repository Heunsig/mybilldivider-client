<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-title class="ics-dashedBorder">
              <div class="green--text ics-card-title">About us</div>
            </v-card-title>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="light-green">person</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ name }}</v-list-tile-title>
                  <v-list-tile-sub-title>Developer</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile 
                v-clipboard:copy="email"
                v-clipboard:success="onCopyEmail"
              >
                <v-list-tile-action>
                  <v-icon color="light-green">mail</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title id="email">{{ email }}</v-list-tile-title>
                  <v-list-tile-sub-title>E-mail</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="light-green">done</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ version }}</v-list-tile-title>
                  <v-list-tile-sub-title>Version of My Bill Divider</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
        :timeout="2000"
        bottom
        v-model="snackbar"
      >
      Email has copied to clipboard.
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
        version: 'v 0.6.17'
      }
    },
    methods: {
      onCopyEmail () {
        this.snackbar = true
      }
    }
  }
</script>