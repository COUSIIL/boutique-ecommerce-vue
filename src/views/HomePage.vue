<template>
  <div class="catalogue-container">

    <!-- Barre de recherche -->
    <SearchBar v-model="searchQuery" />

    <Category :modelValue="categoryList"/>

  </div>

  <div style="display: flex; justify-content: space-between; align-items: center; margin-inline: 15px;">
    <h1 class="title-shop">
      SHOP
    </h1>
    
    <div style="display: flex; justify-content: center; align-items: center; background-color: whitesmoke; border-radius: 8px; padding: 5px; cursor: pointer;" @click="goToCatalog">
      catalogue
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
        <path d="M3.88884 9.66294C4.39329 10 5.09552 10 6.49998 10C7.90445 10 8.60668 10 9.11113 9.66294C9.32951 9.51702 9.51701 9.32952 9.66292 9.11114C9.99998 8.60669 9.99998 7.90446 9.99998 6.5C9.99998 5.09554 9.99998 4.39331 9.66292 3.88886C9.51701 3.67048 9.32951 3.48298 9.11113 3.33706C8.60668 3 7.90445 3 6.49998 3C5.09552 3 4.39329 3 3.88884 3.33706C3.67046 3.48298 3.48296 3.67048 3.33705 3.88886C2.99998 4.39331 2.99998 5.09554 2.99998 6.5C2.99998 7.90446 2.99998 8.60669 3.33705 9.11114C3.48296 9.32952 3.67046 9.51702 3.88884 9.66294Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        <path d="M14.8888 9.66294C15.3933 10 16.0955 10 17.5 10C18.9044 10 19.6067 10 20.1111 9.66294C20.3295 9.51702 20.517 9.32952 20.6629 9.11114C21 8.60669 21 7.90446 21 6.5C21 5.09554 21 4.39331 20.6629 3.88886C20.517 3.67048 20.3295 3.48298 20.1111 3.33706C19.6067 3 18.9044 3 17.5 3C16.0955 3 15.3933 3 14.8888 3.33706C14.6705 3.48298 14.483 3.67048 14.337 3.88886C14 4.39331 14 5.09554 14 6.5C14 7.90446 14 8.60669 14.337 9.11114C14.483 9.32952 14.6705 9.51702 14.8888 9.66294Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        <path d="M3.88884 20.6629C4.39329 21 5.09552 21 6.49998 21C7.90445 21 8.60668 21 9.11113 20.6629C9.32951 20.517 9.51701 20.3295 9.66292 20.1111C9.99998 19.6067 9.99998 18.9045 9.99998 17.5C9.99998 16.0955 9.99998 15.3933 9.66292 14.8889C9.51701 14.6705 9.32951 14.483 9.11113 14.3371C8.60668 14 7.90445 14 6.49998 14C5.09552 14 4.39329 14 3.88884 14.3371C3.67046 14.483 3.48296 14.6705 3.33705 14.8889C2.99998 15.3933 2.99998 16.0955 2.99998 17.5C2.99998 18.9045 2.99998 19.6067 3.33705 20.1111C3.48296 20.3295 3.67046 20.517 3.88884 20.6629Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        <path d="M14.8888 20.6629C15.3933 21 16.0955 21 17.5 21C18.9044 21 19.6067 21 20.1111 20.6629C20.3295 20.517 20.517 20.3295 20.6629 20.1111C21 19.6067 21 18.9045 21 17.5C21 16.0955 21 15.3933 20.6629 14.8889C20.517 14.6705 20.3295 14.483 20.1111 14.3371C19.6067 14 18.9044 14 17.5 14C16.0955 14 15.3933 14 14.8888 14.3371C14.6705 14.483 14.483 14.6705 14.337 14.8889C14 15.3933 14 16.0955 14 17.5C14 18.9045 14 19.6067 14.337 20.1111C14.483 20.3295 14.6705 20.517 14.8888 20.6629Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
    </svg>
    </div>
  </div>
  <Catalogue :modelValue="filteredProducts"/>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import Catalogue from '../components/CatalogueList.vue'
import Category from '../components/CategoryList.vue'
import { useRouter } from 'vue-router'

const productList = ref([])
const categoryList = ref([])
const searchQuery = ref('')
const loading = ref(true)
const baseURL = 'https://zoxcom.pietycloth.com'
const router = useRouter()

// Produits filtrés selon la recherche
const filteredProducts = computed(() => {
  return productList.value.filter(product => {
    const matchSearch = !searchQuery.value || 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const isActive = product.prodActive == 1
    return matchSearch && isActive
  })
})


const goToCatalog = () => {
  router.push(`/produits`)
}

// Récupération des produits depuis l’API
const getProducts = async () => {
  try {
    loading.value = true
    const response = await fetch(`${baseURL}/backend/api.php?action=getProducts`)

    if (!response.ok) {
      console.error('Erreur lors de la récupération des produits:', response.statusText)
      return
    }

    const result = await response.json()
    productList.value = result.data
  } catch (error) {
    console.error('Une erreur est survenue:', error)
  } finally {
    loading.value = false
  }
}



onMounted(() => {
  getProducts()
})
</script>

<style scoped>
.catalogue-container {
  padding: 20px;
}

.title-shop {
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  color: var(--dark-color);
}

.title-shop::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 105%;
  width: 72px;
  height: 2px;
  background-color: var(--dark-color);
}

.title {
  font-size: 3vh;
  margin-bottom: 20px;
  text-align: center;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.product-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  text-align: center;
}

.product-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.product-name {
  margin-top: 10px;
  font-size: 1rem;
}

.product-price {
  font-weight: bold;
  color: #8c52ff;
}
</style>
