<template>
  <div>
    <h2>Dashboard</h2>
    <div class="cards">
      <div class="card">Total Tickets: {{ total }}</div>
      <div class="card">Open: {{ open }}</div>
      <div class="card">Resolved: {{ closed }}</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getTickets } from './lib/api'

export default {
  setup(){
    const tickets = ref([])
    onMounted(async ()=>{ try{ tickets.value = await getTickets() }catch(e){ tickets.value = [] } })
    const total = () => tickets.value.length
    const open = () => tickets.value.filter(t=>t.status==='open').length
    const closed = () => tickets.value.filter(t=>t.status==='closed').length
    return { tickets, total, open, closed }
  }
}
</script>

<style scoped>
.cards{display:flex;gap:1rem}
.card{background:#fff;padding:1rem;border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,0.06)}
@media(max-width:800px){.cards{flex-direction:column}}
</style>
