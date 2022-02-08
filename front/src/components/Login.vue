<template>
    <v-main>
      <div  class="image"></div>
        <v-container fluid fill-height conteudo>
          <v-layout align-center justify-center>
              <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="#98d800">
                    <v-spacer></v-spacer>
                      <v-toolbar-title style="color: #1a1a32;">Acessar plataforma</v-toolbar-title>
                    <v-spacer></v-spacer>
                    </v-toolbar>
                    <center>
                      <img src="https://zitrus.com.br/wp-content/uploads/2018/09/sistemas-gestao-planos-saude-unimed-158-131146.png" 
                      width="50%" 
                      style="padding-top: 50px">
                      </center>
                    <v-card-text>
                      <v-form>
                          <v-text-field
                            name="username"
                            label="Usuário"
                            type="text"
                            v-model="input_username"
                            :rules="[(v) => !!v || 'O campo usuário é obrigatorio']"
                            @keydown.enter="submit"
                          ></v-text-field>
                          
                          <v-text-field
                            id="cad_senha"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            label="Senha"
                            v-model="input_password"
                            :rules="[(v) => !!v || 'O campos senha é obrigatorio']"
                            @keydown.enter="submit"
                          />

                      </v-form>
                    </v-card-text>

                    <div style="margin-left: 20px; margin-right: 20px">
                      <v-alert
                      :value="alert"
                      :type="alert_type"
                      dark
                      border="top"
                      :icon="icon_img"
                      transition="scale-transition"
                      >
                        {{ alert_message }}
                      </v-alert>
                    </div>
                    
                    <div style="text-align: center;">
                      <v-btn color="#98d800" @click="submit" width="20%">Entrar</v-btn>
                    </div>
                    <v-card-actions> </v-card-actions>
                </v-card>
              </v-flex>
          </v-layout>
        </v-container>
    </v-main>
</template>

<script>
  import axios from 'axios'
  export default{
    name: 'Login',
    data () {
      return {
        alert_type: undefined,
        icon_img: undefined,
        input_username: '',
        input_password: '',
        alert_message: '',
        alert: false,
        show1: false,
      }
    },
    methods: {
      async submit() {
        const credentials = {
          username: this.input_username, 
          password: this.input_password  
        }
        await axios.post('auth/login', credentials)
          .then(response => {

            var time = new Date().toLocaleTimeString();        
            var expires_in = response.data.expiresIn / 60 / 60;
            var expires_time = Number(time.split(':')[0]) + expires_in + ':' + time.split(':')[1] + ':' + time.split(':')[2];

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', response.data.user.name)
            localStorage.setItem('expires_at', expires_time)
            
            this.alert = true;
            this.alert_type = 'success'
            this.alert_message = 'Login realizado com sucesso!'
            this.icon_img = 'mdi-emoticon-happy-outline'
            setTimeout(() => {  window.location.href = '/' }, 3000);
          })
          .catch(error => {
            this.alert = true;   
            this.alert_type = 'error'
            this.alert_message = 'Usuário ou senha inválidos!'
            this.icon_img = 'mdi-emoticon-sad-outline'
            setTimeout(() => { this.resetValues() }, 3000);
          })
      },
      async resetValues() {
        this.alert = false
      }
    }
  }
</script>

<style>
  .image {
    display: block;
    position: fixed;
    background-repeat:no-repeat;
    width: 100vw;
    height: 100vh;
    padding: 0;
    text-align: center;
    color: white;
    background: url('https://www.teahub.io/photos/full/176-1764166_will-your-new-busine-women-in-technology-banner.jpg') ;
    background-position: 30% 45%;
    background-color: black;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    -o-background-size: cover;
    -webkit-filter: blur(5px);
    filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
  }

  .conteudo {
      left: 0;
      right: 0;
      z-index: 9999;
      position: fixed;
      color:#fff;
  }
</style>
