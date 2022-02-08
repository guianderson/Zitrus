<template>
  <v-container>
    <div class='col-10 mx-auto' style="padding-top: 3%;">
      <center><h2 class="card-title">Cadastrar Usuários</h2></center>
      <v-form 
        enctype="multipart/form-data"
        ref="form"
        align="right"
        width="100%"
        v-model="valid"
        lazy-validation
      > 
        <div class='d-flex'>
          <v-text-field
            v-model="nome"
            :counter="50"
            :rules= "nameRules"
            label="Nome"
            maxlength="50"
          ></v-text-field>
          <v-text-field
            v-model="CPF"
            class='ml-2'
            v-mask="['###.###.###-##']"
            :counter="14"
            label="CPF"
            maxlength="14"
          ></v-text-field>
        </div>
        <div class='d-flex'>
          <v-text-field
            v-model="celular"
            :counter="14"
            label="Celular"
            v-mask="['(##)#####-####']"
            maxlength="14"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            counter="50"
            class='ml-2'
          ></v-text-field>
        </div>
        <div class='d-flex'>
        <v-text-field
            v-model="cep"
            :counter="9"
            :rules="cepRules"
            v-mask="['#####-###']"
            label="CEP"
            maxlength="9"
            required
            v-on:blur="cepData"
          ></v-text-field>
          <v-text-field
            v-model="numero"
            :counter="5"
            class='ml-2'
            label="Número"
            maxlength="5"
            required
          ></v-text-field>
        </div>
        <div class='d-flex'>
        <v-text-field
            v-model="logradouro"
            :counter="50"
            label="Logradouro"
            maxlength="20"
            readonly
          ></v-text-field>
          <v-text-field
            v-model="cidade"
            :counter="50"
            label="Cidade"
            maxlength="20"
            required
            class='ml-2'
          ></v-text-field>
        </div>
        <div class='d-flex'>
          <v-text-field
            v-model="bairro"
            :counter="30"
            label="Bairro"
            maxlength="20"
            readonly
          ></v-text-field>
          <v-text-field
            v-model="uf"
            :counter="10"
            label="UF"
            maxlength="5"
            readonly
            class='ml-2'
          ></v-text-field>
        </div>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4 mt-5"
          @click="validate"
        >
          Salvar
        </v-btn>
        <v-btn
          color="error"
          class="mr-4 mt-5"
          @click="reset"
        >
          Limpar Campos
        </v-btn>
        <v-btn
          color="warning"
          class='mt-5'
          @click="resetValidation"
        >
          Resetar Validação
        </v-btn>
      </v-form>
      <div style="margin-top:10px;">
        <v-alert
          :value="alert"
          dark
          :type="alert_type"
          border="top"
          transition="scale-transition"
        >
          {{alert_message}}
        </v-alert>
      </div>
    </div>
  </v-container>
</template>

<script>
  import { VueMaskDirective } from "v-mask";
  import router from '../router/index'
  import axios from "axios";
  import Vue from 'vue';

  Vue.directive("mask", VueMaskDirective);

  export default {
    name: 'LocalAgendamento',
    data: () => ({
      nome: null,
      CPF: null,
      email: null,
      valid: true,
      alert: false,
      alert_type: undefined,
      alert_message: undefined,
      celular: null,
      logradouro: null,
      numero: null,
      fone: null,
      cep: null,      
      bairro: null,    
      cidade: null,  
      uf: null,
      error: '',
      emailRules: [
        v => !!v || 'E-mail é um campo obrigatório',
        v => /.+@.+\..+/.test(v) || 'Insira um E-mail válido',
      ],
      nameRules: [
        v => !!v || 'Nome é um campo obrigatório',
        v => (v && v.length <= 20 && v.length >= 3) || 'Nome deve ter entre 3 e 20 caracteres',
      ],
      cpfRules: [
        v => !!v || 'CPF é um campo obrigatório',
        v => /\d{3}.+-+\d{2}/.test(v) || 'CPF deve ter 11 digitos',
      ],
      cepRules: [
        v => !!v || 'Cep é um campo obrigatório e númerico',
        v => /^[0-9]{5}-[0-9]{3}$/.test(v) || 'Cep inválido',
      ],
    }),
    beforeMount() {
      var time = new Date().toLocaleTimeString();
      if (time >= localStorage.getItem('expires_at')) {
        alert('Sua sessão expirou, por favor faça o login novamente!')
        this.logout()
      }
    },
    methods:{
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      resertCepForm(){  
        this.nome       = '',
        this.CPF        = '',
        this.email      = '',
        this.cep        = '';
        this.bairro     = '';
        this.cidade     = '';
        this.logradouro = '';
        this.uf         = '';
        this.numero     = '';
        this.celular    = '';
      },
      async cepData(){
        if (this.cep != ''){
          const itens = 'https://opencep.com/v1/'+ this.cep.replace('-','');
          axios.get(itens).then(resp => {
            const data = resp.data;
            this.erro = data.erro;
            if (this.erro != undefined) {
              this.alert = true;
              this.alert_type = 'error';
              this.alert_message = 'Cep não encontrado';
              this.resertCepForm();
              setTimeout(() => {
              this.alert = false;
              }, 3000);
            }else{
              this.bairro = data.bairro;
              this.cidade = data.localidade;
              this.logradouro = data.logradouro;
              this.uf = data.uf;
            }
          });
        }else{
          this.alert = true;
          this.alert_type = 'error';
          this.alert_message = 'Cep não encontrado';
          this.resertCepForm();
          setTimeout(() => { this.alert = false; }, 3000);
        }
      },
      async validate(){   
        let payload = {
          nome: this.nome,
          email: this.email,
          cpf: this.CPF,
          cep: this.cep,
          celular: this.celular,
          logradouro: this.logradouro,
          numerocasa: this.numero,
          bairro: this.bairro,
          cidade: this.cidade,
          uf: this.uf,
        }        

        const res = await axios.post('/user/create', payload, {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
        }).then(respose => {
          this.alert = true
          this.alert_type = 'success'
          this.alert_message = 'Usuário criado com sucesso!'
          setTimeout(() => {  this.alert = false }, 3000);}
        ).catch(error => {
          this.alert = true
          this.alert_type = 'error'
          this.alert_message = 'Erro ao criar usuário, todos os campos são obrigatórios'
          setTimeout(() => {  this.alert = false }, 3000);
        })
      },
      logout() {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('username')
        window.localStorage.removeItem('expires_at')
        router.go('Home')
      },     
    },
  }
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