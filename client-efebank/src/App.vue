<template>
  <v-app>
    
    <v-app-bar app color="#002366" dark>
      <v-toolbar-title>EFE-bank</v-toolbar-title>
      <v-spacer ></v-spacer>
      
      <v-btn  :to="homeLink">Home</v-btn>
      <v-btn  :to="aboutLink">Sobre</v-btn>
      <!-- <v-btn  :to="createAccountLink">Criar uma conta</v-btn> -->
    </v-app-bar>

    
    <v-main class="main-container">  
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const homeLink = ref('/');
const aboutLink = ref('/about');
const createAccountLink = ref('/createAccount');
</script>

<style scoped>
.main-container {
  background-color: #ffffff; 
  padding-top: 20px;
  padding-bottom: 20px;
}


.v-container {
  padding-top: 20px;
  padding-bottom: 20px;
}


.v-btn {
  color: #ffffff; 
}


.v-app-bar {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}
</style>
