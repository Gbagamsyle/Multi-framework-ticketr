import { ref } from 'vue';
import { getTickets } from '../lib/api';

export function useTickets() {
  const tickets = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const loadTickets = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await getTickets();
      tickets.value = data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    tickets,
    isLoading,
    error,
    loadTickets
  };
}