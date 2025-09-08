import { ref } from 'vue';

const BASE_URL = 'https://zoxcom.pietycloth.com/backend/api.php';

export function useApi(action, options = {}) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const execute = async (body = null, queryParams = '') => {
    loading.value = true;
    error.value = null;
    try {
      const url = `${BASE_URL}?action=${action}${queryParams}`;
      const fetchOptions = {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      };

      if (body) {
        fetchOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url, fetchOptions);

      

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      data.value = await response.json();

      console.log('data.value: ', data.value)
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    execute,
  };
}
