<template>
  <div class="home" style="padding-bottom: 5.2%">
    <v-container>
      <Agendamento />
    </v-container>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import App from '../App.vue'
  import Agendamento from '../components/Agendamento.vue'

  export default Vue.extend({
    name: 'Home',
    data() {
      return {
        usuario: window.localStorage.getItem('username'),
      }
    },
    components: {
      App,
      Agendamento
    },
  })
</script>

<style>
  .home {
    padding-top: 1%;
    padding-left: 1%;
    padding-right: 1%;
  }
  .container{
        padding: 20px 20px 20px 20px; 
  }
  .background-grey{
        background-color: #F5F5F5
  }
</style>
