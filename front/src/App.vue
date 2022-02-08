<template>
  <v-app id="inspire" >
    <Login v-if="!token" />
    <div v-if="token">
      <v-navigation-drawer 
        v-model="drawer"
        app
        >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              <center><img src="https://zitrus.com.br/wp-content/uploads/2018/09/sistemas-gestao-planos-saude-unimed-158-131146.png" width="70%"></center>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app style="color: white; background-color: #98d800">
        <v-app-bar-nav-icon @click="drawer = !drawer" style="color: #1a1a32"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        &nbsp;&nbsp;&nbsp;
        <v-btn @click="logout" style="background-color:#98d800; color: #1a1a32">Olá, {{ username }} - Sair</v-btn>
      </v-app-bar>

      <v-main >
        <router-view></router-view>
        <Footer />
      </v-main>      
    </div>
  </v-app>
</template>

<script>
  import Footer from './components/Footer.vue'
  import Login from './components/Login.vue'
  import router from './router'
  
  export default {
    name: 'App',
    data: () => ({ 
      token: window.localStorage.getItem('token'),
      username: window.localStorage.getItem('username'),
      drawer: null,
      unidade: '',
      cidade_sistema: [],
      items: [
          { title: 'Adicionar Usuários', icon: 'mdi-lead-pencil', to: '/'},
          { title: 'Lista de Usuários', icon: 'mdi-book-open-outline', to: '/users'},
        ],
    }),
    components: {
      Login,
      Footer,
    }, 
    methods: {
      logout() {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('username')
        window.localStorage.removeItem('expires_at')
        router.go('Home')
      }, 
      invalidToken(){
        if (this.token == null) {
          this.logout()
        }
      }
    },
  }
</script>

<style>
  .v-data-table-header th {
    vertical-align: center;
    white-space: nowrap;
  }
</style>