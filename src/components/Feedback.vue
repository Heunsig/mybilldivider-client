<template>
  <div>
    <v-container fluid>
      <v-layout wrap row>
        <v-flex>
          <v-card>
            <v-card-title class="ics-dashedBorder">
              <div class="green--text ics-card-title">Feedback</div>
            </v-card-title>
            <v-card-text>
              <v-container fluid class="pa-0">
                <v-layout wrap row>
                  <v-flex xs12>
                    <v-text-field
                      label="Name"
                      v-model="feedback.name"
                      clearable
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Email"
                      v-model="feedback.email"
                      clearable
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Comment"
                      v-model="feedback.comment"
                      multi-line
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn block dark flat color="light-green" @click="sendFeedback">Send</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-snackbar
      :timeout="3000"
      bottom
      :color="hasError?'red':'blue'"
      v-model="snackbar"
    >
      <template v-if="!hasError">
        Thank you for your feedback.
      </template>
      <template v-else>
        Name and Email are required.
      </template>
      <v-btn flat dark @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        snackbar: false,
        feedback: {
          name: '',
          email: '',
          comment: ''
        },
        hasError: false
      }
    },
    methods: {
      sendFeedback () {
        this.$http.post(this.$PATH_API + 'feedback', this.feedback).then(res => {
          console.log(res)
          this.hasError = false
          this.snackbar = true
          this.$resetData(this, 'feedback')
        }, err => {
          if (err.status === 422) {
            this.hasError = false
            this.snackbar = true
            this.hasError = true
          }
        })
      }
    }
  }
</script>