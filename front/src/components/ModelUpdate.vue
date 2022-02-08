<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        rounded
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Editar
      </v-btn>
    </template>
   
    <v-card>
      <v-card-title>
        <span class="text-h5">Edição de agendamento</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
            <v-text-field
              label="Nome*"
              v-model="values.nome"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
          
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="values.email"
              :counter="50"
              :rules="emailRules"
              label="Email"
              maxlength="50"
              required
            ></v-text-field>
          </v-col>
        
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="values.cpf"
              :counter="14"
              v-mask="['###.###.###-##']"
              :rules="cpfRules"
              label="CPF"
              maxlength="14"
              required
            ></v-text-field>
          </v-col>  
      
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="values.cep"
              :counter="9"
              :rules="cepRules"
              v-mask="['#####-###']"
              label="CEP"
              maxlength="9"
              required
              @keydown.enter="cepData"
              v-on:blur="cepData"
            ></v-text-field>
          </v-col>    
          
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="values.celular"
              :counter="14"
              label="Celular"
              v-mask="['(##)#####-####']"
              maxlength="14"
              required
            ></v-text-field>
          </v-col>
          
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="values.logradouro"
              :counter="20"
              readonly
              label="Logradouro"
              maxlength="30"
              required
            ></v-text-field>
          </v-col>    
                    
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="values.bairro"
              :counter="20"
              readonly
              label="Bairro"
              maxlength="30"
              required
            ></v-text-field>
          </v-col>  
          
          <v-col
            cols="12"
            sm="8"
            md="6"
          >
            <v-text-field
              v-model="values.cidade"
              :counter="20"
              label="Cidade"
              readonly
              maxlength="30"
              required
            ></v-text-field>
          </v-col>        
          
          <v-col
            cols="12"
            sm="4"
            md="2"
          >
            <v-text-field
              v-model="values.uf"
              :counter="20"
              label="UF"
              readonly
              maxlength="20"
              required
            ></v-text-field>  
          </v-col>        

          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="values.numerocasa"
              :counter="5"
              label="Número"
              maxlength="5"
              required
            ></v-text-field>
          </v-col>                    
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>

     

    <v-spacer></v-spacer>
    <v-btn
      color="blue darken-1"
      text
      @click="dialog = false"
    >
      Fechar
    </v-btn>
    
    <v-btn
      color="blue darken-1"
      text
      @click="editar();"
    >
      Salvar
    </v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</v-row>
</template>

<script>

  import Vue from 'vue';
  import axios from 'axios'
  import { VueMaskDirective } from "v-mask";

  Vue.directive("mask", VueMaskDirective);

  export default {
      name: 'ModelUpdate',
      props: ['values', 'alert'],
      emits: ['emitAlert'],
      data(){
          return{
              dialog: false,
              mensagem: '',
              cpfRules: [
                v => !!v || 'CPF é um campo obrigatório',
                v => /\d{3}.+-+\d{2}/.test(v) || 'CPF deve ter 11 digitos',
              ],
              emailRules: [
                v => !!v || 'E-mail é um campo obrigatório',
                v => /.+@.+\..+/.test(v) || 'Insira um E-mail válido',
              ],
              nameRules: [
                v => !!v || 'Nome é um campo obrigatório',
                v => (v && v.length <= 20 && v.length >= 3) || 'Nome deve ter entre 3 e 20 caracteres',
              ],
              cepRules: [
                v => !!v || 'Cep é um campo obrigatório e númerico',
                v => /^[0-9]{5}-[0-9]{3}$/.test(v) || 'Cep inválido',
              ],
              cidades: [],
              selectedCid: '',
          }
      },      
      methods: {
          async editar(){
            if (this.values.nome == '' || this.values.email == '' || this.values.cpf == '' || this.values.cep == '' || 
                this.values.celular == '' || this.values.logradouro == '' || this.values.bairro == '' || this.values.cidade == '' || this.values.uf == '' || this.values.numerocasa == '') {
              alert('Preencha todos os campos');
              this.dialog = true;
            }
            else {
              let payload = {
                nome: this.values.nome,
                email: this.values.email,
                cep: this.values.cep,
                numerocasa: this.values.numerocasa,
                celular: this.values.celular,
                logradouro: this.values.logradouro,
                bairro: this.values.bairro,
                cidade: this.values.cidade,
                uf: this.values.uf
              }
              await axios.put(`/user/update/${this.values.id}`, payload,{
                headers: { 
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
              }).then(res => {
                this.$emit('update', res.data)
                alert('Usuário atualizado com sucesso!');
                this.dialog = false;
                
              }).catch(err => {
                console.log(err)
              })
            }
          },
        
        async cepData(){
          if (this.values.cep != ''){
            const itens = 'https://opencep.com/v1/'+ this.values.cep.replace('-','');
            axios.get(itens).then(resp => {
              const data = resp.data;
              this.erro = data.erro;
              if (this.erro != undefined) {
                alert('Cep não encontrado');
                this.resertCepForm();
              }else{
                this.values.bairro = data.bairro;
                this.values.cidade = data.localidade;
                this.values.logradouro = data.logradouro;
                this.values.uf = data.uf;
              }
            }).catch(err => {
              alert('Cep não encontrado');
              this.resertCepForm();
            });
          }else{
            alert('Cep não encontrado');
            this.resertCepForm();
          }
        },

        resertCepForm(){
          this.values.bairro = '';
          this.values.cidade = '';
          this.values.logradouro = '';
          this.values.uf = '';
        },
      }
  }
</script>