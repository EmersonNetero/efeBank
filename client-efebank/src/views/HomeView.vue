<template>
  <v-app>
    <v-container class="d-flex justify-center align-center" style="min-height: 100vh;">
      
      <v-row justify="center" align="center">
        
        <v-col cols="12" md="8" lg="6">
          <v-card class="pa-5" outlined>
            <v-row>
              
              <v-col cols="12" md="6">
                <v-card-title class="text-h5 text-center">BackOffice EFEbank</v-card-title>
                <v-card-subtitle class="text-center">
                  <p class="subheading">Faça login para acessar sua conta</p>
                </v-card-subtitle>
                <v-form>
                  
                  <v-text-field
                    label="Usuário"
                    prepend-icon="mdi-account"
                    v-model="usuario"
                  ></v-text-field>
                  
                  <v-text-field
                    label="Senha"
                    type="password"
                    prepend-icon="mdi-lock"
                    v-model="senha"
                  ></v-text-field>
                  <v-card-actions class="d-flex justify-center">
                    <v-btn color="primary" class="mx-2" large @click="logar">
                      Login
                    </v-btn>
                    <v-btn color="primary" class="mx-2" large @click="criarConta">
                      Sigin
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-col>

              
              <v-col cols="12" md="6">
                <v-img
                  src="src/assets/Bank-Account-Opening.png"
                  alt="Imagem do EFEbank"
                  class="rounded"
                ></v-img>
                <v-card-subtitle class="text-center mt-3">
                  <p class="subheading">Sua segurança é nossa prioridade</p>
                </v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CreateAccount from './CreateAccount.vue';

const router = useRouter();
const usuario = ref('');
const senha = ref('');

const logar = () => {
  console.log('Redirecionando para a tela de login...');
  router.push('/bankAccount');
};

const criarConta = () => {
 
 console.log('Redirecionando para a tela de criação de conta...');
 router.push('/createAccount');
};
</script>

<style scoped>
.v-card {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.v-img {
  border-radius: 12px;
}
</style>
