<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Bienvenue !</h1>
        <p>Une interface fluide, réactive et élégante pour gérer vos tâches quotidiennes et explorer des composants interactifs.</p>
        <div class="cta-buttons">
          <button @click="navigateTo('/todo')" class="btn btn-primary">Commencer à s'organiser</button>
          <button @click="navigateTo('/counter')" class="btn btn-secondary">Essayer le compteur</button>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="feature-card" @click="navigateTo('/todo')">
        <div class="feature-icon">📝</div>
        <h3>Gestion de Tâches</h3>
        <p>Organisez votre journée avec notre Todo List intuitive. Filtrez, ajoutez et supprimez vos tâches en un clic.</p>
      </div>

      <div class="feature-card" @click="navigateTo('/grades')">
        <div class="feature-icon">🎓</div>
        <h3>Suivi des Notes</h3>
        <p>Gérez les notes de vos élèves (0-20), visualisez la liste complète et calculez automatiquement la moyenne.</p>
      </div>

      <div class="feature-card" @click="navigateTo('/counter')">
        <div class="feature-icon">🔢</div>
        <h3>Interactifs</h3>
        <p>Découvrez des animations fluides et des interactions en temps réel avec nos composants de démonstration.</p>
      </div>

      <div class="feature-card" @click="navigateTo('/register')">
        <div class="feature-icon">🔐</div>
        <h3>Sécurité & Validation</h3>
        <p>Des formulaires propres avec une validation en temps réel pour une expérience utilisateur sans friction.</p>
      </div>
    </section>

    <footer class="home-footer">
      <p>&copy; 2026 Tuto Vue Modern UI. Fait avec passion.</p>
    </footer>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #eef2f3 100%);
  border-radius: 24px;
  margin-bottom: 4rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.hero-content h1 {
  font-size: 3.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding: 0.2rem 0; /* Ajout d'un padding vertical pour éviter que le texte soit coupé */
  line-height: 1.2;  /* Ajustement de la hauteur de ligne */
  background: linear-gradient(45deg, #42b983, #35495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block; /* Pour que le padding soit bien pris en compte et ne pas couper le dégradé */
}

.hero-content p {
  font-size: 1.25rem;
  color: #636e72;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.btn {
  padding: 12px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background-color: #42b983;
  color: white;
  box-shadow: 0 4px 15px rgba(66, 185, 131, 0.3);
}

.btn-primary:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(66, 185, 131, 0.4);
}

.btn-secondary {
  background-color: #ffffff;
  color: #2c3e50;
  border: 1px solid #dfe6e9;
}

.btn-secondary:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px);
  border-color: #b2bec3;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
}

.feature-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  border: 1px solid #f0f0f0;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.08);
  border-color: #42b983;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #636e72;
  line-height: 1.5;
}

.home-footer {
  text-align: center;
  padding: 2rem;
  color: #b2bec3;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  .cta-buttons {
    flex-direction: column;
  }
}
</style>
