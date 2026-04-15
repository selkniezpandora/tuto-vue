<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "RegistrationForm",
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      touched: {
        username: false,
        email: false,
        password: false,
        confirmPassword: false
      },
      isSubmitted: false
    };
  },
  computed: {
    errors() {
      const errors: any = {};

      // Username validation
      if (!this.form.username) {
        errors.username = "Le nom d'utilisateur est requis.";
      } else if (this.form.username.length < 3) {
        errors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères.";
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.form.email) {
        errors.email = "L'adresse email est requise.";
      } else if (!emailRegex.test(this.form.email)) {
        errors.email = "L'adresse email n'est pas valide.";
      }

      // Password validation
      if (!this.form.password) {
        errors.password = "Le mot de passe est requis.";
      } else if (this.form.password.length < 8) {
        errors.password = "Le mot de passe doit contenir au moins 8 caractères.";
      } else if (!/\d/.test(this.form.password)) {
        errors.password = "Le mot de passe doit contenir au moins un chiffre.";
      }

      // Confirm password validation
      if (!this.form.confirmPassword) {
        errors.confirmPassword = "La confirmation du mot de passe est requise.";
      } else if (this.form.confirmPassword !== this.form.password) {
        errors.confirmPassword = "Les mots de passe ne correspondent pas.";
      }

      return errors;
    },
    isValid() {
      return Object.keys(this.errors).length === 0;
    }
  },
  methods: {
    handleBlur(field: string) {
      (this.touched as any)[field] = true;
    },
    handleSubmit() {
      this.isSubmitted = true;
      // Mark all fields as touched
      Object.keys(this.touched).forEach(key => {
        (this.touched as any)[key] = true;
      });

      if (this.isValid) {
        alert("Inscription réussie !");
        // Reset form
        this.form = {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        };
        this.touched = {
          username: false,
          email: false,
          password: false,
          confirmPassword: false
        };
        this.isSubmitted = false;
      }
    }
  }
});
</script>

<template>
  <div class="container">
    <div class="card">
      <h2>Inscription</h2>
      <form @submit.prevent="handleSubmit" novalidate>
        <!-- Username -->
        <div class="form-group">
          <label for="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            @blur="handleBlur('username')"
            :class="{ 'is-invalid': touched.username && errors.username, 'is-valid': touched.username && !errors.username }"
            placeholder="Jean Dupont"
          >
          <span v-if="touched.username && errors.username" class="error-message">
            {{ errors.username }}
          </span>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            @blur="handleBlur('email')"
            :class="{ 'is-invalid': touched.email && errors.email, 'is-valid': touched.email && !errors.email }"
            placeholder="exemple@mail.com"
          >
          <span v-if="touched.email && errors.email" class="error-message">
            {{ errors.email }}
          </span>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            @blur="handleBlur('password')"
            :class="{ 'is-invalid': touched.password && errors.password, 'is-valid': touched.password && !errors.password }"
            placeholder="••••••••"
          >
          <span v-if="touched.password && errors.password" class="error-message">
            {{ errors.password }}
          </span>
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <label for="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            @blur="handleBlur('confirmPassword')"
            :class="{ 'is-invalid': touched.confirmPassword && errors.confirmPassword, 'is-valid': touched.confirmPassword && !errors.confirmPassword }"
            placeholder="••••••••"
          >
          <span v-if="touched.confirmPassword && errors.confirmPassword" class="error-message">
            {{ errors.confirmPassword }}
          </span>
        </div>

        <button type="submit" class="btn-submit" :disabled="isSubmitted && !isValid">
          S'inscrire
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 20px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  color: #2c3e50;
}

h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #42b983;
  text-align: center;
}

.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #34495e;
}

input {
  padding: 0.75rem;
  border: 1.5px solid #dcdfe6;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

input:focus {
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

input.is-invalid {
  border-color: #e74c3c;
}

input.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

input.is-valid {
  border-color: #2ecc71;
}

.error-message {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.3rem;
}

.btn-submit {
  width: 100%;
  padding: 0.8rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s;
  margin-top: 1rem;
  box-shadow: 0 4px 10px rgba(66, 185, 131, 0.3);
}

.btn-submit:hover:not(:disabled) {
  background-color: #3aa876;
}

.btn-submit:active:not(:disabled) {
  transform: scale(0.98);
}

.btn-submit:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
