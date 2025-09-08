<template>
  <div class="shop-container">
    
    <main class="bd-grid">
      <div
        v-for="product in props.modelValue"
        :key="product.id"
        
        @click="goToProduct(product.id)"
      >
        <div class="card">
          <div>
            <div class="card-img">
              <img :src="getImage(product.image)" :alt="product.name" />
            </div>

            <div class="card-content">
              <p class="card-name">{{ product.name }}</p>
              <div class="card-prices" v-if="getPromoPrice(product) == 0">
                <span>{{ getBeforePrice(product) }} DA</span>
                
              </div>
              <div v-else class="card-promo">
                <span class="old-price">{{ getBeforePrice(product) }} DA</span>
                <span class="new-price">{{ getPromoPrice(product) }} DA</span>
              </div>
            </div>

            <a href="#" class="card-icon">
              <ion-icon name="cart-outline"></ion-icon>
            </a>
          </div>
          

          <div class="buyBtn">
            اشتري
          </div>
        </div>
        
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
})

//console.log('props: ', props.modelValue)

const router = useRouter()

const getImage = (image) => {
  if (!image) return '/images/placeholder.png'
  return image.startsWith('https') ? image : `https://zoxcom.pietycloth.com${image}`
}

const formatPrice = (value) => {
  if (value === '' || value === null || value === undefined) return ''
  return Number(value) % 1 === 0 ? parseInt(value) : value
}

const getBeforePrice = (product) => {
  const price = product.models?.[0]?.original || product.models?.[0]?.sell || ''
  return formatPrice(price)
}

const getPromoPrice = (product) => {
  const promo = product.models?.[0]?.promo || ''
  return formatPrice(promo)
}


const goToProduct = (id) => {
  router.push(`/produits/${id}`)
}
/*
const getRandomColor = () => {
  const colors = [
    '#F6F0F0', '#F2E2B1', '#D5C7A3', '#BDB395',
    '#FCC6FF', '#FFE6C9', '#FFC785', '#FFA09B'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}*/
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;700&display=swap");

:root {
  --dark-color: #161616;
  --accent-color: #ff5151;
  --body-font: "Open Sans", sans-serif;
}

.shop-container {
  padding: 1rem;
}

.buyBtn{
  width: 90%;
  height: 30px;
  padding: 5px;
  margin: 5px;
  background-color: #ffdcc9;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}


.bd-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* <-- modifié ici */
  gap: 0.5rem;
  margin: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  min-height: 250px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgb(242, 242, 242);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}


.card-img {
  margin-block: 1px;
}

.card-img img {
  width: calc(100% - 20px);
  object-fit: cover;
  padding: 0.5rem;
  border-radius: 1rem 1rem 0 0;
}

.card-content {
  text-align: center;
}

.card-name {
  font-weight: bold;
  color: var(--dark-color);
  margin-block: 5px;
  font-size: 20px;
}

.card-prices {
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #8c52ff;
}

.card-price-before {
  text-decoration: line-through;
  color: gray;
}

.card-price-now {
  color: var(--accent-color);
  font-weight: 600;
}

.card-icon {
  margin-top: 0.5rem;
  color: var(--dark-color);
  font-size: 1.5rem;
}

.old-price {
  text-decoration: line-through;
  color: #888; /* gris pour le prix barré */
  margin-right: 8px;
}

.new-price {
  color: #e60023; /* rouge ou couleur promo */
  font-weight: bold;
}
</style>