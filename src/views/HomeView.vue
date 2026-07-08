<template>
  <div class="home-wrapper">
    <section class="hero">
      <div class="hero-content">
        <h1>Encuentra tareas rápidas o consigue quién las haga</h1>
        <p>
          FreeTime conecta a quienes necesitan ayuda con tareas de corta duración
          con personas listas para trabajar por hora o por día.
        </p>
        <div class="hero-actions">
          <button class="btn-primary" @click="goRegister">
            <i class="pi pi-user-plus"></i> Crear cuenta
          </button>
          <button class="btn-secondary" @click="goCatalog">
            <i class="pi pi-search"></i> Buscar tareas
          </button>
        </div>
      </div>
    </section>

    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon bg-blue"><i class="pi pi-briefcase"></i></div>
        <div class="stat-info">
          <h3>Publica en minutos</h3>
          <p>Formulario de máximo 6 campos, listo en menos de 3 minutos.</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-green"><i class="pi pi-shield"></i></div>
        <div class="stat-info">
          <h3>Usuarios verificados</h3>
          <p>Cuentas confirmadas por correo o teléfono antes de operar.</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-yellow"><i class="pi pi-star"></i></div>
        <div class="stat-info">
          <h3>Reputación real</h3>
          <p>Calificaciones y reseñas después de cada tarea finalizada.</p>
        </div>
      </div>
    </section>

    <section class="how-it-works">
      <div class="section-header">
        <h2>¿Cómo funciona?</h2>
      </div>

      <div class="steps-grid">
        <div class="step-item">
          <span class="step-number">1</span>
          <h4>Regístrate y verifica tu cuenta</h4>
          <p>Crea tu perfil como trabajador o empleador y confirma tu identidad.</p>
        </div>
        <div class="step-item">
          <span class="step-number">2</span>
          <h4>Publica o busca tareas</h4>
          <p>Filtra por categoría, ubicación, pago y fecha para encontrar lo que buscas.</p>
        </div>
        <div class="step-item">
          <span class="step-number">3</span>
          <h4>Conecta y trabaja</h4>
          <p>Acepta postulaciones, coordina la tarea y recibe tu pago.</p>
        </div>
        <div class="step-item">
          <span class="step-number">4</span>
          <h4>Califica la experiencia</h4>
          <p>Deja una reseña y construye tu reputación en la plataforma.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goRegister() {
  router.push('/register')
}

function goCatalog() {
  router.push('/tasks')
}
</script>

<style scoped>
.home-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.hero {
  text-align: center;
  padding: 3rem 1rem 2.5rem;
}

.hero-content h1 {
  margin: 0 0 1rem;
  font-size: 2.25rem;
  color: #1e293b;
  line-height: 1.2;
}

.hero-content p {
  margin: 0 auto 2rem;
  max-width: 560px;
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #f1f5f9;
  color: #334155;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: #e2e8f0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.stat-icon {
  width: 60px;
  height: 60px;
  min-width: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.bg-blue { background-color: #eff6ff; color: #3b82f6; }
.bg-green { background-color: #f0fdf4; color: #22c55e; }
.bg-yellow { background-color: #fefce8; color: #eab308; }

.stat-info h3 {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
  color: #1e293b;
}

.stat-info p {
  margin: 0;
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
}

.how-it-works {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.section-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.section-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #0f172a;
}

.steps-grid {
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.step-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}

.step-item h4 {
  margin: 0;
  color: #334155;
  font-size: 0.95rem;
}

.step-item p {
  margin: 0;
  color: #64748b;
  font-size: 0.85rem;
  line-height: 1.5;
}
</style>