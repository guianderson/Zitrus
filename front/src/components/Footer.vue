<template>
  <v-footer style="position: fixed; width: 100%; bottom:0; left:0;"
    color="STcolor"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="STcolor just py-4 white--text"
        cols="12"
      >
        <a href="https://www.linkedin.com/in/guilherme-anderson/" target="__blank" style="color: #1a1a32;text-decoration: none;">Criação e desenvolvimento:  <strong>{{msg}}</strong> - {{ new Date().getFullYear() }}</a>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    name: 'Footer',
    data: () => ({
      msg: 'Guilherme Anderson',	
    }),
  }
</script>

<style>
    .STcolor {
        background-color: #98d800 !important;
        font: #1a1a32 !important;
    }
    .just {
      text-align: center;
    }
</style>