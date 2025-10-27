const USERS_KEY = 'ticketapp_users'

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function findUserByEmail(email) {
  const users = getUsers()
  return users.find(u => u.email === email)
}

export function createUser({ email, password, name }) {
  const users = getUsers()
  if (findUserByEmail(email)) {
    const err = new Error('Email already exists')
    err.code = 409
    throw err
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password, // In a real app, this should be hashed
    name: name || email.split('@')[0],
    createdAt: Date.now()
  }

  users.push(newUser)
  saveUsers(users)
  return newUser
}