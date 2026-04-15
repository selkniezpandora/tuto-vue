<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

interface GradeEntry {
  id: number;
  studentName: string;
  grade: number;
  subject: string;
  date: string;
}

const SUBJECTS = ['Mathématiques', 'Français', 'Histoire-Géo', 'Anglais', 'Physique-Chimie', 'SVT', 'Arts Plastiques', 'Musique', 'EPS'];
const studentName = ref('');
const grade = ref<number | null>(null);
const selectedSubject = ref(SUBJECTS[0]);
const grades = ref<GradeEntry[]>([]);
const isSubmitted = ref(false);

// Filtres
const searchQuery = ref('');
const filterSubject = ref('Toutes');

const loadGrades = () => {
  const saved = localStorage.getItem('tuto-vue-grades');
  if (saved) {
    try {
      grades.value = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load grades', e);
      grades.value = [];
    }
  }
};

const saveGrades = () => {
  localStorage.setItem('tuto-vue-grades', JSON.stringify(grades.value));
};

onMounted(() => {
  loadGrades();
});

watch(grades, () => {
  saveGrades();
}, { deep: true });

const isNameValid = computed(() => studentName.value.trim().length >= 2);
const isGradeValid = computed(() => grade.value !== null && grade.value >= 0 && grade.value <= 20);
const isFormValid = computed(() => isNameValid.value && isGradeValid.value);

const addGrade = () => {
  isSubmitted.value = true;
  if (isFormValid.value && grade.value !== null) {
    const newEntry: GradeEntry = {
      id: Date.now(),
      studentName: studentName.value.trim(),
      grade: grade.value,
      subject: selectedSubject.value,
      date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    grades.value.unshift(newEntry);

    // Reset form
    studentName.value = '';
    grade.value = null;
    selectedSubject.value = SUBJECTS[0];
    isSubmitted.value = false;
  }
};

const deleteGrade = (id: number) => {
  grades.value = grades.value.filter(g => g.id !== id);
};

const averageGrade = computed(() => {
  if (grades.value.length === 0) return 0;
  const sum = grades.value.reduce((acc, curr) => acc + curr.grade, 0);
  return Number((sum / grades.value.length).toFixed(2));
});

const getGradeClass = (g: number) => {
  if (g >= 15) return 'grade-high';
  if (g >= 10) return 'grade-medium';
  return 'grade-low';
};

const filteredGrades = computed(() => {
  return grades.value.filter(entry => {
    const matchesSearch = entry.studentName.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesSubject = filterSubject.value === 'Toutes' || entry.subject === filterSubject.value;
    return matchesSearch && matchesSubject;
  });
});

const capitalize = (value: string) => {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

</script>

<template>
  <div class="grades-manager">
    <div class="card form-card">
      <h2>Saisir une note</h2>
      <form @submit.prevent="addGrade" class="grade-form">
        <div class="form-group">
          <label for="studentName">Nom de l'élève</label>
          <input
            id="studentName"
            v-model="studentName"
            type="text"
            placeholder="Ex: Jean Dupont"
            :class="{ 'is-invalid': isSubmitted && !isNameValid }"
          >
          <span v-if="isSubmitted && !isNameValid" class="error-msg">Nom trop court (min 2 car.)</span>
        </div>

        <div class="form-group">
          <label for="subject">Matière</label>
          <select id="subject" v-model="selectedSubject" class="select-subject">
            <option v-for="subj in SUBJECTS" :key="subj" :value="subj">
              {{ subj }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="grade">Note (0 à 20)</label>
          <input
            id="grade"
            v-model.number="grade"
            type="number"
            step="0.5"
            min="0"
            max="20"
            placeholder="Ex: 15.5"
            :class="{ 'is-invalid': isSubmitted && !isGradeValid }"
          >
          <span v-if="isSubmitted && !isGradeValid" class="error-msg">La note doit être entre 0 et 20</span>
        </div>

        <button type="submit" class="btn-submit">Ajouter la note</button>
      </form>
    </div>

    <div class="card list-card">
      <div class="list-header">
        <h2>Liste des notes</h2>
        <div v-if="grades.length > 0" class="average-badge">
          Moyenne: <span :class="getGradeClass(averageGrade)">{{ averageGrade }}/20</span>
        </div>
      </div>

      <div v-if="grades.length > 0" class="filters-section">
        <div class="filter-group">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un élève..."
            class="search-input"
          >
        </div>
        <div class="filter-group">
          <select v-model="filterSubject" class="select-filter">
            <option value="Toutes">Toutes les matières</option>
            <option v-for="subj in SUBJECTS" :key="subj" :value="subj">
              {{ subj }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="grades.length === 0" class="empty-state">
        <p>Aucune note enregistrée pour le moment.</p>
      </div>

      <div v-else-if="filteredGrades.length === 0" class="empty-state">
        <p>Aucun résultat pour ces filtres.</p>
      </div>

      <div v-else class="grades-list">
        <div v-for="entry in filteredGrades" :key="entry.id" class="grade-item">
          <div class="grade-info">
            <span class="student-name">{{ capitalize(entry.studentName) }} : {{ entry.subject }}</span>
            <span class="grade-date">{{ entry.date }}</span>
          </div>
          <div class="grade-actions">
            <span class="grade-value" :class="getGradeClass(entry.grade)">{{ entry.grade }}</span>
            <button @click="deleteGrade(entry.id)" class="btn-delete" title="Supprimer">
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grades-manager {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  align-items: start;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

h2 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.grade-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.select-subject {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #dfe6e9;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;
}

.select-subject:focus {
  outline: none;
  border-color: #42b983;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #636e72;
}

input {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #dfe6e9;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

input.is-invalid {
  border-color: #e74c3c;
}

.error-msg {
  color: #e74c3c;
  font-size: 0.8rem;
}

.btn-submit {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;
}

.btn-submit:hover {
  background-color: #3aa876;
  transform: translateY(-1px);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.average-badge {
  background-color: #f8fafc;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid #e2e8f0;
}

.filters-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.filter-group {
  flex: 1;
}

.search-input, .select-filter {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #dfe6e9;
  font-size: 0.9rem;
  background-color: white;
  box-sizing: border-box;
}

.search-input:focus, .select-filter:focus {
  outline: none;
  border-color: #42b983;
}

.grades-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.grade-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s;
}

.grade-item:hover {
  transform: translateX(4px);
  border-color: #42b983;
}

.grade-info {
  display: flex;
  flex-direction: column;
}

.student-name {
  font-weight: 600;
  color: #2c3e50;
}

.grade-date {
  font-size: 0.75rem;
  color: #94a3b8;
}

.grade-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.grade-value {
  font-weight: 800;
  font-size: 1.25rem;
  padding: 4px 10px;
  border-radius: 8px;
  min-width: 45px;
  text-align: center;
}

.btn-delete {
  background: none;
  border: none;
  color: #cbd5e1;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  transition: color 0.2s;
}

.btn-delete:hover {
  color: #e74c3c;
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: #94a3b8;
}

@media (max-width: 900px) {
  .grades-manager {
    grid-template-columns: 1fr;
  }
}
</style>
