<template>
  <div>
    <v-container fluid>
      <v-layout wrap row>
        <v-flex xs12>
          <v-card>
            <v-card-text class="pa-5">
              <h1 class="text-xs-center red--text text--lighten-1">404: Page not Found</h1>
              <div class="text-xs-center ics-message-404 pt-2">
                Sorry, There's nothing to see here
              </div>
              <div class="text-xs-right mt-3">
                <v-btn dark color="green" @click="$router.push({name: 'main'})">Go to main</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<style scoped>
  .ics-message-404 {
    font-size: 20px;
  }
</style>