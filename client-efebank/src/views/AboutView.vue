<template>
  <v-app>
    <v-main>
      <v-container class="py-5">
        
        <div class="row">
          
          <div class="col-md-6 mb-4">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Quem somos no Efebank</h2>
                <p class="card-text">
                  Bem-vindo à EFEbank, o seu parceiro financeiro confiável e inovador. Na EFEbank, acreditamos que a tecnologia e a humanidade podem andar de mãos dadas para oferecer soluções bancárias que simplificam a sua vida e impulsionam os seus sonhos.

                  Fundada com a missão de transformar a experiência bancária, a EFEbank combina tradição e modernidade para oferecer serviços seguros, ágeis e personalizados. Seja para gerenciar suas finanças pessoais, impulsionar o crescimento do seu negócio ou planejar o futuro, estamos aqui para ajudar você a alcançar seus objetivos com tranquilidade e confiança.

                  Nossa equipe é formada por profissionais dedicados e especializados, prontos para oferecer um atendimento diferenciado e soluções sob medida para as suas necessidades. Utilizamos tecnologia de ponta para garantir a segurança das suas transações e a praticidade dos nossos serviços, tudo isso com um toque humano que faz toda a diferença.

                  Na EFEbank, valorizamos a transparência, a ética e o compromisso com nossos clientes. Estamos sempre em busca de inovação para oferecer uma experiência bancária que vai além do convencional, colocando você no controle da sua vida financeira.
                </p>
              </div>
            </div>
          </div>

          
          <div class="col-md-6">
            <div class="row">
              <div class="col-12 mb-4" v-for="dev in developers" :key="dev.id">
                <div class="card">
                  <img :src="dev.photo" class="card-img-top" alt="Imagem do Desenvolvedor" />
                  <div class="card-body">
                    <h5 class="card-title">{{ dev.name }}</h5>
                    <p class="card-text">{{ dev.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const developers = ref([
  {
    id: 1,
    name: 'Emerson Andrade',
    description: 'Desenvolvedor Full Stack com foco em Angular e Node.js. Apaixonado por tecnologias modernas e boas práticas de desenvolvimento.',
    photo: 'https://via.placeholder.com/150', 
  },
  {
    id: 2,
    name: 'Enzo Sena',
    description: 'Desenvolvedora Frontend com grande experiência em React e Vue.js. Adora UX/UI e design responsivo.',
    photo: 'https://via.placeholder.com/150', 
  },
  {
    id: 3,
    name: 'Felipe Brisio',
    description: 'Desenvolvedor Backend com experiência em Node.js e bancos de dados SQL. Focado em soluções escaláveis e seguras.',
    photo: 'https://via.placeholder.com/150', 
  },
]);
</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 100%; 
}

.card-img-top {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 150px;
  object-fit: cover;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-text {
  color: #555;
  font-size: 0.9rem;
}

h2 {
  color: #002366;
}

.lead {
  font-size: 1.1rem;
  color: #555;
}
</style>