<template>
  <v-app-bar app color="#002366" dark>
    <v-toolbar-title>EFE-bank</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn :to="homeLink">Home</v-btn>
    <v-btn :to="aboutLink">Sobre</v-btn>
    <v-btn :to="createAccountLink">Criar uma conta</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const homeLink = ref('/');
const aboutLink = ref('/about');
const createAccountLink = ref('/createAccount');
</script>

<style scoped>
.v-btn {
  color: #ffffff; 
}
</style>
