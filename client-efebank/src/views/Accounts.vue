<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";

interface Conta {
  branch: string;
  type: string;
  holderName: string;
  holderEmail: string;
  holderType: string;
  holderDocument: string;
  status: string;
}

const contas = ref<Conta[]>([]);
const router = useRouter();

const getAllAccounts = async () => {
  try {
    const response = await axios.get("https://cult-nov-hh-bored.trycloudflare.com/bank-account/findAll");
    contas.value = response.data; 
  } catch (error) {
    console.error("Erro ao buscar contas", error);
    alert("Erro ao carregar contas");
  }
};


const goToDetails = (conta: Conta) => {
  router.push(`/bankAccount/details/${conta.holderDocument}`);
};

onMounted(() => {
  getAllAccounts();
});
</script>

<template>
  <div class="container mt-5">
    <h2>Contas Cadastradas</h2>
    
    <div v-if="contas.length > 0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Agência</th>
            <th scope="col">Tipo de Conta</th>
            <th scope="col">Nome do Titular</th>
            <th scope="col">E-mail</th>
            <th scope="col">Tipo Legal</th>
            <th scope="col">Documento</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="conta in contas" :key="conta.holderDocument" @click="goToDetails(conta)" class="table-row">
            <td>{{ conta.branch }}</td>
            <td>{{ conta.type === 'CURRENT' ? 'Conta Corrente' : 'Conta Pagamento' }}</td>
            <td>{{ conta.holderName }}</td>
            <td>{{ conta.holderEmail }}</td>
            <td>{{ conta.holderType === 'NATURAL' ? 'Pessoa Física' : 'Pessoa Jurídica' }}</td>
            <td>{{ conta.holderDocument }}</td>
            <td>{{ conta.status === 'ACTIVE' ? 'Ativa' : conta.status === 'BLOCKED' ? 'Bloqueada' : 'Finalizada' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <p v-else style="text-align: center;">Sem nenhum resultado.</p>
  </div>
</template>


<style scoped>
.container {
  max-width: 100%;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table-row {
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.table-row:hover {
  background-color: #000;
}

th, td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
