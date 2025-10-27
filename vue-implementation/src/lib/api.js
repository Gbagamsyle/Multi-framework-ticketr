import { v4 as uuidv4 } from 'uuid'


const SESSION_KEY = 'ticketapp_session'
const TICKETS_KEY = 'ticketapp_tickets'
const USERS_KEY = 'ticketapp_users'


function delay(ms = 300){
  return new Promise(res => setTimeout(res, ms))
}


function readSession(){
  try{ 
    return JSON.parse(localStorage.getItem(SESSION_KEY)) 
  }catch(e){ 
    console.warn('Failed to parse session:', e.message)
    return null 
  }
}


function requireAuthOrThrow(){
  const s = readSession()
  if(!s || s.expiresAt < Date.now()){
    localStorage.removeItem(SESSION_KEY)
    const err = new Error('Unauthorized')
    err.code = 401
    throw err
  }
  return s
}


export async function login({ email, password }){
  await delay(500)
  // Look up users from localStorage
  const usersRaw = localStorage.getItem(USERS_KEY) || '[]'
  let users = []
  try { users = JSON.parse(usersRaw) } catch (e) { users = [] }

  const found = users.find(u => u.email === email)
  if (!found || found.password !== password) {
    const err = new Error('Invalid credentials')
    err.code = 400
    throw err
  }

  const token = Math.random().toString(36).slice(2)
  // Set expiry to 24 hours from now
  const expiresAt = Date.now() + (24 * 60 * 60 * 1000)
  const session = {
    token,
    username: found.email,
    expiresAt,
    user: {
      email: found.email,
      name: found.name || found.email
    }
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  // Initialize empty tickets array if not exists
  if (!localStorage.getItem(TICKETS_KEY)) {
    localStorage.setItem(TICKETS_KEY, '[]')
  }
  return session
}


export async function signup({ email, password, name }){
  await delay(700)
  // Basic validation
  if (!email || !password) {
    const err = new Error('Email and password are required')
    err.code = 422
    throw err
  }

  // load users
  const usersRaw = localStorage.getItem(USERS_KEY) || '[]'
  let users = []
  try { users = JSON.parse(usersRaw) } catch (e) { users = [] }

  if (users.find(u => u.email === email)) {
    const err = new Error('User already exists')
    err.code = 409
    throw err
  }

  // create user
  const user = {
    id: uuidv4(),
    email,
    password,
    name: name ? String(name).trim() : email.split('@')[0]
  }
  users.push(user)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))

  // Auto-login newly created user
  return login({ email, password })
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
  const ticket = { 
    id: uuidv4(), 
    title: payload.title, 
    description: payload.description || '', 
    status: payload.status, 
    priority: payload.priority || null, 
    createdAt: now, 
    updatedAt: now 
  }
  tickets.unshift(ticket)
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
  return ticket
}


export async function updateTicket(id, payload){
  await delay(300)
  requireAuthOrThrow()
  const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
  const idx = tickets.findIndex(t => t.id === id)
  if(idx === -1){ 
    const err = new Error('Not found')
    err.code = 404
    throw err 
  }
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
