import { v4 as uuidv4 } from 'uuid'

const SESSION_KEY = 'ticketapp_session'
const TICKETS_KEY = 'ticketapp_tickets'

function delay(ms = 300){ return new Promise(res => setTimeout(res, ms)) }

function readSession(){ try{ return JSON.parse(localStorage.getItem(SESSION_KEY)) }catch(e){ return null } }
function requireAuthOrThrow(){ const s = readSession(); if(!s || s.expiresAt < Date.now()){ localStorage.removeItem(SESSION_KEY); const err = new Error('Unauthorized'); err.code = 401; throw err } return s }

export async function login({ email, password }){
  await delay(400)
  if(email === 'test@example.com' && password === 'Password123!'){
    const token = Math.random().toString(36).slice(2)
    const expiresAt = Date.now() + 1000 * 60 * 60
    const session = { token, username: email, expiresAt }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    return session
  }
  const err = new Error('Invalid credentials'); err.code = 400; throw err
}

export async function signup(creds){ await delay(600); return login(creds) }
export async function logout(){ await delay(100); localStorage.removeItem(SESSION_KEY); return true }

export async function getTickets(){ await delay(300); requireAuthOrThrow(); return JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]') }
export async function createTicket(payload){ await delay(300); requireAuthOrThrow(); if(!payload.title || !payload.status){ const err = new Error('Validation error'); err.code = 422; throw err } const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]'); const now = Date.now(); const ticket = { id: uuidv4(), title: payload.title, description: payload.description||'', status: payload.status, priority: payload.priority||null, createdAt: now, updatedAt: now }; tickets.unshift(ticket); localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets)); return ticket }
export async function updateTicket(id, payload){ await delay(250); requireAuthOrThrow(); const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]'); const idx = tickets.findIndex(t=> t.id===id); if(idx===-1){ const err = new Error('Not found'); err.code = 404; throw err } tickets[idx] = { ...tickets[idx], ...payload, updatedAt: Date.now() }; localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets)); return tickets[idx] }
export async function deleteTicket(id){ await delay(200); requireAuthOrThrow(); let tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]'); tickets = tickets.filter(t=> t.id !== id); localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets)); return true }
