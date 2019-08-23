<template>
  <div class="mt-3 ics-dashedBorder-top">
    <ul class="ics-ul-explanation">
      <li>
        <div class="ics-ul-explanation-icon">
          <v-btn 
            fab 
            small 
            icon 
            dark 
            color="light-green" 
            class="ics-button-in-content"
          >
            <v-icon>attach_money</v-icon>
          </v-btn>
        </div>
        <div class="ics-ul-explanation-content">
          Obtain the sales tax by calculating a subtotal and sales tax payment on your receipt.
        </div>                                  
      </li>
      <li>
        <div class="ics-ul-explanation-icon">
          <v-btn 
            fab 
            small 
            icon 
            dark 
            color="light-green" 
            class="ics-button-in-content"
            >
            <v-icon>search</v-icon>
          </v-btn>
        </div>
        <div class="ics-ul-explanation-content">
          Obtain the sales tax by searching a state and zip code.
        </div>
      </li>
      <li>
        <div class="ics-ul-explanation-icon">
          <v-btn 
            fab 
            small 
            icon 
            dark 
            color="green" 
            class="ics-button-in-content"
            >
            <v-icon>location_on</v-icon>
          </v-btn>
        </div>
        <div class="ics-ul-explanation-content">
          Obtain the sales tax by using a location service <span class="green--text">(the easiest way)</span>. 
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {

  }
</script>
<style scoped>
  .ics-ul-explanation {
    list-style: none;
    display: inline-block;
  }
  .ics-ul-explanation > li {
    display: flex;
    margin: 6px 0;
  }

  .ics-ul-explanation > li > .ics-ul-explanation-content {
    text-align: left;
    padding-left: 9px;
  }
</style>