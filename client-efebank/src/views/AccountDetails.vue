<template>
    <v-container>
      <v-card class="pa-5">
        <v-card-title class="text-h5">Detalhes da Conta</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Nome do Titular:</v-list-item-title>
                    <v-list-item-subtitle>{{ conta.holderName }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Email:</v-list-item-title>
                    <v-text-field v-model="conta.holderEmail" :disabled="!editandoEmail" label="Email" />
                  </v-list-item-content>
                  <v-btn v-if="!editandoEmail" @click="editandoEmail = true">Editar</v-btn>
                  <v-btn v-if="editandoEmail" @click="salvarEmail">Salvar</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Saldo:</v-list-item-title>
                    <v-list-item-subtitle>R$ {{ conta.balance.toFixed(2) }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="bloquearConta">Bloquear Conta</v-btn>
          <v-btn color="red darken-2" @click="encerrarConta">Encerrar Conta</v-btn>
          <v-btn color="blue" @click="bloquearSaldo">Bloquear Quantia</v-btn>
          <v-btn color="green" @click="desbloquearSaldo">Desbloquear Quantia</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const router = useRouter();
  const conta = ref({holderName: '', holderEmail: '', balance: 0 });
  const editandoEmail = ref(false);
  
  onMounted(async () => {
    const { accountNumber } = route.params;
    const response = await axios.get(`https://cult-nov-hh-bored.trycloudflare.com/bank-account/findByNumber/${accountNumber}`);
    conta.value = response.data;
  });
  
  const salvarEmail = async () => {
    await axios.put(`http://localhost:3000/contas/${route.params.accountNumber}`, { email: conta.value.holderEmail });
    editandoEmail.value = false;
  };
  
  const bloquearConta = async () => {
    await axios.post(`http://localhost:3000/contas/${route.params.accountNumber}/bloquear`);
    alert('Conta bloqueada!');
  };
  
  const encerrarConta = async () => {
    await axios.post(`http://localhost:3000/contas/${route.params.accountNumber}/encerrar`);
    alert('Conta encerrada!');
    router.push('/');
  };
  
  const bloquearSaldo = async () => {
    const quantia = prompt('Digite o valor a ser bloqueado:');
    if (quantia) {
      await axios.post(`http://localhost:3000/contas/${route.params.accountNumber}/bloquear-saldo`, { valor: parseFloat(quantia) });
      alert('Quantia bloqueada!');
    }
  };
  
  const desbloquearSaldo = async () => {
    const quantia = prompt('Digite o valor a ser desbloqueado:');
    if (quantia) {
      await axios.post(`http://localhost:3000/contas/${route.params.accountNumber}/desbloquear-saldo`, { valor: parseFloat(quantia) });
      alert('Quantia desbloqueada!');
    }
  };
  </script>
  
  <style scoped>
  .v-card {
    max-width: 600px;
    margin: auto;
  }
  </style>
  