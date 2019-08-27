<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="290">
    <v-card>  
      <v-toolbar color="blue" dark dense flat>
        <v-toolbar-title>Tutorial</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <swiper :options="swiperOptions">
          <template v-for="script in scripts[tabInMixin]">
            <swiper-slide>
              <component
                :is="{
                  template: '<div>' + script + '</div>',
                  data () {
                    return {
                      testMenu: true
                    }
                  }
                }">
              </component>
            </swiper-slide>
          </template>
        </swiper>
        <div class="text-xs-right">
          <v-btn flat class="pa-0 ma-0 ics-swiper-button-next ics-font-patrick-hand" style="font-size:20px;">Next</v-btn>
        </div>
      </v-card-text>
      <v-card-actions class="pa-0 pb-3 pr-3">
        <v-spacer></v-spacer>
        <div class="ics-swiper-pagination"></div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import routingForTab from '@/mixins/routingForTab'

  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    mixins: [
      routingForTab
    ],
    data () {
      return {
        dialog: false,
        swiperOptions: {
          navigation: {
            nextEl: '.ics-swiper-button-next'
          },
          pagination: {
            el: '.ics-swiper-pagination',
            clickable: true
          }
        },
        scripts: {
          salesTax: [
            `
            <div>
              <h3 class="pb-1">My Bill Divider is here to help!</h3>
              <div style="font-size:15px;">
                <p>This app makes it easy to split the bill between friends.</p>
                <p>Simply input some information into this app, and it will tell you how much each person needs to pay for their meal.</p>
                <p class="mb-0">Click "Next" to continue the tutorial.</p>
              </div>
            </div>
            `,
            `
            <div class="ics-font-patrick-hand ics-swiper-slide">
              Daivd, Micheal and Mary had a lovely meal in a terrific restaurant. After eating dinner, Mary asks, "May I have the bill?" When the bill arrives, they encounter an annoying situation.
            </div>
            `,
            `
            <div class="ics-font-patrick-hand ics-swiper-slide">
              They can't split the bill beause each person ordered different food. "How should we split the bill?" Michael asks. "I have no idea" Mary responds.
            </div>
            `,
            `
            <div class="ics-font-patrick-hand ics-swiper-slide">
              "Don't worry, I can do it!" David takes out his phone and opens up My Bill Divider.<br/>
              <v-menu style="z-index:999">
                <img width="80" slot="activator" :src="$PATH_IMAGE + 'example_receipt.gif'" alt="An example of receipt"/>
                <v-card>
                  <div class="pa-1">
                    <img width="200" :src="$PATH_IMAGE + 'example_receipt.gif'" alt="An example of subtotal and tax"/>
                  </div>
                </v-card>
              </v-menu>
              <v-icon>
                arrow_back
              </v-icon>
              <span style="font-size:20px;">It's our receipt!</span>
            </div>
            `
          ]
          // result: [
          //   `
          //     <div class="ics-font-patrick-hand ics-swiper-slide">
          //       "Here we are. It's our payments. I like this place, so I'll leave 25% tips. Also, If click
          //       <v-btn fab dark color="green" class="ics-button-in-content">
          //         <v-icon>attach_money</v-icon>
          //       </v-btn>,
          //       we can see the sum of everybody's payments." David says as he feels proud.
          //     </div>
          //   `,
          //   `
          //     <div>
          //       <h3 class="pb-1">Are you ready to split the bill?</h3>
          //       <div style="font-size:15px;">
          //         <p>The tutorial is over. We hope you don't feel tired of calculating the bill.</p>
          //         <p>
          //           Click
          //           <v-btn dark icon color="blue" class="ics-button-in-content">
          //             <v-icon>fa-calculator</v-icon>
          //           </v-btn> to start calculating.
          //         </p>
          //       </div>
          //     </div>
          //   `
          // ]
        }
      }
    },
    methods: {
      openDialog () {
        this.dialog = true
      },
      closeDialog () {
        this.dialog = false
      }
    }
  }
</script>