<template>
  <div>
    <v-container>
      <div class='col-10 mx-auto' style="padding-top: 4%; padding-bottom: 10%">
        <center><h2 class="card-title">Lista de Usuários</h2></center><br>
        <v-toolbar
          flat
          color="transparent"
          >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            id="search_bar"
            single-line
            @click="searchItems"
            @keyup="searchItems"
          ></v-text-field>
        </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
      >        

        <template v-slot:[`item.editar`]="{ item }">
          <model-update :values="item"/>
        </template>

        <template v-slot:[`item.excluir`]="{ item }">
          <v-row justify="center">
            <v-dialog
              v-model="dialog"
              persistent
              max-width="320"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="error"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Excluir
                </v-btn>
              </template>
              
              <v-card>
                <v-card-title class="text-h5">
                  Deseja realmente excluir este usuário?
                </v-card-title>
                <v-card-text>Após excluir este usuário não será mais possível recuperar o mesmo.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="excluir(item.id); dialog = false"
                  >
                    Excluir
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>
      </v-data-table>
      <div>
        <v-alert
          :value="delete_alert"
          dark
          :type="delete_alert_status"
          border="top"
          transition="scale-transition"
        >
          {{delete_alert_mensage}}
        </v-alert>
      </div>

      <div>
        <v-alert
          :value="alert"
          dark
          type="success"
          border="top"
          transition="scale-transition"
        >
          {{mensagem}}
        </v-alert>
      </div>
    </div>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
  import App from '../App.vue'
  import ModelUpdate from './ModelUpdate.vue'
  import router from '../router/index'

  export default Vue.extend({
    name: 'Usuarios',
    components: {
      App,
      ModelUpdate
    },
    data() {
        return {
        search: '',  
        dialog: false,
        alert: false,
        delete_alert: false,
        delete_alert_status: undefined,
        delete_alert_mensage: undefined,
        mensagem: undefined,        
        headers: [
          {
            text:'Nome',
            value: 'nome',
            align: 'center',
            sortable: true
          },
          {
            text:'Email',
            value: 'email',
            align: 'center',
            sortable: true
          },
          {
            text:'CPF',
            value: 'cpf',
            align: 'center',
            sortable: true
          },
          {
            text: 'Cep',
            value: 'cep',
            align: 'center',
            sortable: true
          },
          {
            text:'Celular',
            value: 'celular',
            align: 'center',
            sortable: true
          },
          {
            text:'Logradouro',
            value: 'logradouro',
            align: 'center',
            sortable: true
          },
          {
            text:'Cidade',
            value: 'cidade',
            align: 'center',
            sortable: false
          },
          {
            text: 'Bairro',
            value: 'bairro',
            align: 'center',
            sortable: true
          },
          {
            text: 'Numero',
            value: 'numerocasa',
            align: 'center',
            sortable: true
          },
          {
            text: 'Editar',
            value: 'editar',
            align: 'center',
            sortable: false
          },
          {
            text: 'Excluir',
            value: 'excluir',
            align: 'center',
            sortable: false
          }
        ],
        items: [],
      }
    },
    methods: {
      showAlert(){
        this.alert = true;
        setTimeout(() => {  this.alert = false }, 3000);
      },
      searchItems(){
        const searchBar = document.getElementById('search_bar')
        if(searchBar.value.length > 0){
            this.items = this.items.filter(item =>
            item.cpf.toLowerCase().includes(searchBar.value.toLowerCase()) ||
            item.nome.toLowerCase().includes(searchBar.value.toLowerCase()) ||
            item.email.toLowerCase().includes(searchBar.value.toLowerCase()) ||
            item.cep.toLowerCase().includes(searchBar.value.toLowerCase()) ||
            item.celular.toLowerCase().includes(searchBar.value.toLowerCase()) ||
            item.logradouro.toLowerCase().includes(searchBar.value.toLowerCase()) ||
            item.cidade.toLowerCase().includes(searchBar.value.toLowerCase()) ||
            item.bairro.toLowerCase().includes(searchBar.value.toLowerCase())
        );
        }
        else{
          axios.get('/user/list', {
          headers: {
              Authorization: `Bearer ${window.localStorage.getItem('token')}`
          }
          }).then(respose => this.items = respose.data ).catch(error => console.log(error))
        }
      },
      formatCPF(cpf) {
        let fcpf = cpf.substr(0, 3) 
                  + '.' + cpf.substr(3, 3) 
                  + '.' + cpf.substr(6, 3) 
                  + '-' + cpf.substr(9, 2)
        return fcpf
      },
      formatHorario(hrr) {
        let phrr = hrr.split(' ')
        let data = phrr[0].split('-').reverse().join('/')
        let hora = phrr[1].substr(0, 5)
        let fhrr = data + ' ' + hora
        return fhrr
      },
      async excluir(id){
        await axios.delete(`/user/delete/${id}`, {
          headers: {
              Authorization: `Bearer ${window.localStorage.getItem('token')}`
          }
        }).then(response => {
          this.items = this.items.filter(item => item.id != id)
          this.delete_alert_status = 'success'
          this.delete_alert_mensage = 'Exclusão realizada com sucesso!'
          this.delete_alert = true
          setTimeout(() => {  this.delete_alert = false }, 3000);
        }).catch(error => {
          console.log(error)
        })
      },
      
      logout() {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('username')
        window.localStorage.removeItem('expires_at')
        router.go('Home')
      }, 

      async getItems() {
        axios.get('/user/list', {
          headers: {
              Authorization: `Bearer ${window.localStorage.getItem('token')}`
          }
        }).then(respose => this.items = respose.data ).catch(error => console.log(error))
      }
    },
    async beforeMount() {
      this.getItems()
      var time = new Date().toLocaleTimeString();
      if (time >= localStorage.getItem('expires_at')) {
        alert('Sua sessão expirou, por favor faça o login novamente!')
        this.logout()
      }
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
