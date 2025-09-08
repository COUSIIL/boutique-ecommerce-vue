import { ref } from 'vue';

const API_BASE_URL = 'https://zoxcom.pietycloth.com/backend/api.php';

export default function useApi() {
  const loading = ref(false);
  const error = ref(null);

  const request = async (action, method = 'GET', body = null) => {
    loading.value = true;
    error.value = null;
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let url = `${API_BASE_URL}?action=${action}`;
      if (method === 'GET' && body) {
        // For GET requests, params are in URL, for POST they are in body
        url += `&${new URLSearchParams(body).toString()}`;
      } else if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
<<<<<<< HEAD

      data.value = await response.json();

      console.log('data.value: ', data.value)
=======
      return await response.json();
>>>>>>> a2da8cf0bae37ce7b3e163b25a7a7826d312d900
    } catch (e) {
      error.value = e.message;
      console.error(`API call failed for action ${action}:`, e);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const get = (action, params = null) => request(action, 'GET', params);
  const post = (action, body) => request(action, 'POST', body);

  return { get, post, loading, error };
}
