<template>
    <header class="header">
      <img class="logo" src="../../public/logo.png" alt="" @click="goToCategory">
      
    </header>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const goToCategory = () => {
    router.push('/')
  }
  // rien à importer ici pour le moment
  </script>
  
  <style scoped>
    .header {
      height: 150px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      backdrop-filter: blur(4px); /* si tu veux un effet flou derrière */
      box-shadow: 0 4px 8px rgba(143, 175, 180, 0.4); /* ombre douce en option */
    }
  

    .logo {
      width: 150px;
      min-width: 80px;
      cursor: pointer;
    }
  /* Style personnalisé si besoin */
  </style>
  