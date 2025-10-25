import { inject } from 'vue'

export function useAuth() {
  const auth = inject('auth')
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return auth
}