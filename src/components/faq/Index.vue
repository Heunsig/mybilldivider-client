<template>
  <div>
    <v-container fluid>
      <v-layout wrap row>
        <v-flex xs12>
          <v-card>
            <v-card-title class="ics-dashedBorder">
              <div class="ics-card-title green--text">FAQ</div>
              <v-spacer></v-spacer>
              <v-btn icon class="ma-0" v-if="$route.name === 'faq.show'" @click="$router.back()">
                <v-icon>keyboard_arrow_left</v-icon>
              </v-btn>
            </v-card-title>
            <router-view :key="$route.fullPath"></router-view>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>