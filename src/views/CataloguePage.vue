<template>
  <SearchBar v-model="searchQuery" />

  <Catalogue :modelValue="filteredProducts"/>
</template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import SearchBar from '../components/SearchBar.vue'
  import Catalogue from '../components/CatalogueList.vue'
  
  const productList = ref([])
  const searchQuery = ref('')

  // Produits filtrés selon la recherche
  const filteredProducts = computed(() => {
    if (!searchQuery.value) return productList.value
    return productList.value.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  
  const getProducts = async () => {
    try {
      const response = await fetch('https://zoxcom.pietycloth.com/backend/api.php?action=getProducts', {
        method: 'GET',
      });
  
      if (!response.ok) {
        console.error('Erreur lors de la récupération des produits:', response.statusText);
        return;
      }
  
      const result = await response.json();
      productList.value = result.data
    } catch (error) {
      console.error('Une erreur est survenue:', error)
    }
  }
  
  onMounted(() => {
    getProducts()
  })
  </script>
  
  <style scoped>
  .catalogue-container {
    max-width: 1200px;
    margin: auto;
    padding: 2rem 1rem;
  }
  
  .title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    text-align: center;
    color: #333;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }
  
  .product-card {
    border: none;
    background: #fff;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s ease;
    cursor: pointer;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
  }
  
  .product-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  .product-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #444;
    margin-bottom: 0.5rem;
  }
  
  .product-price {
    font-size: 1rem;
    color: #e67e22;
    font-weight: bold;
  }
  </style>
  