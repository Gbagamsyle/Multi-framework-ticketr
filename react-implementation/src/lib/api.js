import { v4 as uuidv4 } from 'uuid'
import { findUserByEmail, createUser } from './users'

const SESSION_KEY = 'ticketapp_session'
const TICKETS_KEY = 'ticketapp_tickets'

function delay(ms = 300) {
  return new Promise(res => setTimeout(res, ms))
}

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch(e) {
    console.warn('Failed to parse session:', e.message)
    return null
  }
}

function requireAuthOrThrow() {
  const s = readSession()
  if(!s || s.expiresAt < Date.now()) {
    localStorage.removeItem(SESSION_KEY)
    const err = new Error('Unauthorized')
    err.code = 401
    throw err
  }
  return s
}

export async function login({ email, password }) {
  await delay(500)
  
  const user = findUserByEmail(email)
  if (!user || user.password !== password) {
    const err = new Error('Invalid credentials')
    err.code = 400
    throw err
  }

  const token = Math.random().toString(36).slice(2)
  const expiresAt = Date.now() + 1000 * 60 * 60 // 1 hour
  const session = { 
    token,
    userId: user.id,
    username: user.name || user.email,
    email: user.email,
    expiresAt
  }
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export async function signup({ email, password, name }) {
  await delay(700)
  
  try {
    const user = createUser({ email, password, name })
    return login({ email, password })
  } catch(err) {
    if (err.code === 409) {
      const error = new Error('Email already exists')
      error.code = 409
      throw error
    }
    throw err
  }
}


export async function logout(){
await delay(100)
localStorage.removeItem(SESSION_KEY)
return true
}


export async function getTickets(){
await delay(350)
requireAuthOrThrow()
const raw = localStorage.getItem(TICKETS_KEY) || '[]'
return JSON.parse(raw)
}


export async function createTicket(payload){
await delay(350)
requireAuthOrThrow()
if(!payload.title || !payload.status) {
const err = new Error('Validation error')
err.code = 422
throw err
}
const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
const now = Date.now()
const ticket = { id: uuidv4(), title: payload.title, description: payload.description || '', status: payload.status, priority: payload.priority || null, createdAt: now, updatedAt: now }
tickets.unshift(ticket)
localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
return ticket
}


export async function updateTicket(id, payload){
await delay(300)
requireAuthOrThrow()
const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
const idx = tickets.findIndex(t => t.id === id)
if(idx === -1){ const err = new Error('Not found'); err.code = 404; throw err }
tickets[idx] = { ...tickets[idx], ...payload, updatedAt: Date.now() }
localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
return tickets[idx]
}


export async function deleteTicket(id){
await delay(250)
requireAuthOrThrow()
let tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
tickets = tickets.filter(t => t.id !== id)
localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
return true
}