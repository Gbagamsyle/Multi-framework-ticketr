<template>
  <div>
    <h2>Tickets</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <button class="btn primary" @click="showForm = true">Create New Ticket</button>
      <div v-if="showForm" class="ticket-form">
        <input v-model="form.title" placeholder="Title" />
        <select v-model="form.status">
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <textarea v-model="form.description" placeholder="Description"></textarea>
        <button @click="submit">Save</button>
        <button @click="cancel">Cancel</button>
      </div>
      <div class="ticket-list">
        <div v-for="t in tickets" :key="t.id" class="ticket-card">
          <h4>{{ t.title }}</h4>
          <p>{{ t.description }}</p>
          <small>{{ t.status }}</small>
          <div>
            <button @click="edit(t)">Edit</button>
            <button @click="remove(t)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as api from '../lib/api'

export default {
  setup(){
    const tickets = ref([])
    const loading = ref(true)
    const showForm = ref(false)
    const form = ref({ title:'', description:'', status:'open' })
    const selected = ref(null)

    async function load(){ loading.value = true; try{ tickets.value = await api.getTickets() }catch(e){ tickets.value = [] } finally{ loading.value = false } }
    onMounted(load)

    async function submit(){ try{ if(selected.value){ await api.updateTicket(selected.value.id, form.value) } else { await api.createTicket(form.value) } await load(); showForm.value=false; selected.value=null; form.value = { title:'', description:'', status:'open' } }catch(e){ alert(e.message || 'Failed') } }
    function cancel(){ showForm.value=false; selected.value=null }
    function edit(t){ selected.value = t; form.value = { title:t.title, description:t.description, status:t.status }; showForm.value = true }
    async function remove(t){ if(confirm('Delete this ticket?')){ await api.deleteTicket(t.id); await load() } }

    return { tickets, loading, showForm, form, submit, cancel, edit, remove }
  }
}
</script>

<style scoped>
.ticket-card{border-radius:10px;padding:1rem;background:#fff;margin:1rem 0}
.ticket-form{margin:1rem 0;display:flex;flex-direction:column;gap:.5rem}
</style>
