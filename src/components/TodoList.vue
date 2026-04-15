<script lang="ts">
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default {
  name: "TodoList",
  data() {
    return {
      newTodo: "",
      todos: [] as Todo[],
      filter: "all", // 'all' | 'active' | 'completed'
    };
  },
  computed: {
    filteredTodos(): Todo[] {
      if (this.filter === "active") {
        return this.todos.filter((todo) => !todo.completed);
      } else if (this.filter === "completed") {
        return this.todos.filter((todo) => todo.completed);
      }
      return this.todos;
    },
    remainingCount(): number {
      return this.todos.filter((todo) => !todo.completed).length;
    },
  },
  methods: {
    addTodo() {
      const text = this.newTodo.trim();
      if (text) {
        this.todos.push({
          id: Date.now(),
          text,
          completed: false,
        });
        this.newTodo = "";
        this.saveTodos();
      }
    },
    removeTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.saveTodos();
    },
    toggleTodo(todo: Todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem("vue-todo-list", JSON.stringify(this.todos));
    },
    loadTodos() {
      const saved = localStorage.getItem("vue-todo-list");
      if (saved) {
        try {
          this.todos = JSON.parse(saved);
        } catch (e) {
          console.error("Erreur lors du chargement des tâches", e);
          this.todos = [];
        }
      }
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
      this.saveTodos();
    }
  },
  mounted() {
    this.loadTodos();
  },
};
</script>

<template>
  <div class="todo-container">
    <div class="todo-card">
      <h2>Ma Todo List</h2>

      <div class="input-group">
        <input
          v-model="newTodo"
          @keyup.enter="addTodo"
          placeholder="Ajouter une tâche..."
          type="text"
        />
        <button @click="addTodo" class="btn-add">Ajouter</button>
      </div>

      <div class="filters">
        <button
          @click="filter = 'all'"
          :class="{ active: filter === 'all' }"
        >Toutes</button>
        <button
          @click="filter = 'active'"
          :class="{ active: filter === 'active' }"
        >Actives</button>
        <button
          @click="filter = 'completed'"
          :class="{ active: filter === 'completed' }"
        >Complétées</button>
      </div>

      <ul class="todo-list">
        <li v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed }">
          <div class="todo-item-content" @click="toggleTodo(todo)">
            <span class="checkbox">
              <i v-if="todo.completed">✓</i>
            </span>
            <span class="todo-text">{{ todo.text }}</span>
          </div>
          <button @click="removeTodo(todo.id)" class="btn-delete">×</button>
        </li>
        <li v-if="filteredTodos.length === 0" class="empty-list">
          Aucune tâche à afficher
        </li>
      </ul>

      <div class="todo-footer" v-if="todos.length > 0">
        <span>{{ remainingCount }} tâche(s) restante(s)</span>
        <button @click="clearCompleted" v-if="todos.some(t => t.completed)" class="btn-clear">
          Nettoyer
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.todo-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  color: #2c3e50;
}

h2 {
  margin-top: 0;
  color: #42b983;
  text-align: center;
  margin-bottom: 1.5rem;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
}

input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #42b983;
}

.btn-add {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn-add:hover {
  background-color: #3aa876;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1.5rem;
}

.filters button {
  background: none;
  border: 1px solid #eee;
  padding: 5px 12px;
  border-radius: 20px;
  cursor: pointer;
  color: #7f8c8d;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.filters button.active {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid #eee;
}

.todo-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.todo-item-content {
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 50%;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #42b983;
}

.completed .checkbox {
  border-color: #42b983;
  background-color: rgba(66, 185, 131, 0.1);
}

.completed .todo-text {
  text-decoration: line-through;
  color: #bdc3c7;
}

.btn-delete {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 10px;
  opacity: 0;
  transition: opacity 0.2s;
}

.todo-list li:hover .btn-delete {
  opacity: 1;
}

.empty-list {
  text-align: center;
  color: #95a5a6;
  padding: 2rem 0 !important;
  border-bottom: none !important;
}

.todo-footer {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #7f8c8d;
}

.btn-clear {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}
</style>
