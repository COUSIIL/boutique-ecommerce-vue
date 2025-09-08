<template>
  <div class="list3" style="height: 180px;">
    <div
      v-for="(category, index) in categoryList"
      :key="index"
      
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <button class="boxCat" @click="goToCategory(category.name)">
        <img :src="formatImageUrl(category.image)" alt="">
        <p>{{ category.name }}</p>
      </button>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isUpdating = ref(false)
const categoryList = ref([])

onMounted(() => {
getCategory()
})

const router = useRouter()

const goToCategory = (id) => {
router.push(`/category/${id}`)
}

const formatImageUrl = (url) => {
console.log('url: ', url)
if (url.startsWith('/')) {
  return `https://zoxcom.pietycloth.com${url}`
} else {
  return url
}

}

async function getCategory() {
isUpdating.value = true
try {
  const response = await fetch('https://zoxcom.pietycloth.com/backend/api.php?action=getCategory')

  if (!response.ok) {
    console.error('Erreur lors de la récupération des produits:', response.statusText)
    return
  }

  const result = await response.json()
  categoryList.value = result['categories']
  console.log('categoryList.value: ', categoryList.value)
} catch (error) {
  console.error('Une erreur est survenue:', error)
} finally {
  isUpdating.value = false
}
}

// Fonction pour générer une couleur aléatoire douce
const getRandomColor = () => {
const colors = [
  '#F6F0F0', // Khaki
  '#F2E2B1', // Lavender
  '#D5C7A3', // MintCream
  '#BDB395', // LightGray
  '#FCC6FF', // LavenderBlush
  '#FFE6C9', // Beige
  '#FFC785', // LightCyan
  '#FFA09B'  // Soft Orange
]
return colors[Math.floor(Math.random() * colors.length)]
}

const hoverColor = ref(getRandomColor())  // Initial color

// Lors du survol, changer la couleur
const onMouseEnter = () => {
hoverColor.value = getRandomColor()
}

const onMouseLeave = () => {
hoverColor.value = getRandomColor()  // Or set to a fixed color if needed
}
</script>


<style>
.list3 {
display: flex;
flex-wrap: nowrap;
overflow-x: auto;
scroll-snap-type: x mandatory;
gap: 10px;
padding: 10px;
white-space: wrap;
min-width: 100%;
box-sizing: border-box;
align-items: center;
margin-block: 20px;
}

.list3::-webkit-scrollbar {
height: 6px;
background: white;
}

.list3::-webkit-scrollbar-thumb {
background: orangered;
border-radius: 4px;
}

.list3::-webkit-scrollbar-thumb:hover {
background: orange;
}

.boxCat {
position: relative;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 80px;
height: 80px; /* même hauteur que l'image */
border-radius: 10px;
background-color: transparent;
border: none;
overflow: visible;
cursor: pointer;
}

.boxCat img {
max-width: 80px;
max-height: 80px;
min-width: 80px;
min-height: 80px;
object-fit: cover;
border-radius: 50%;
}

.boxCat p {
font-weight: bold;
position: absolute;
top: 100%; /* juste en dessous de la boîte */
text-align: center;
width: 100%;
margin-top: 5px;
font-size: 12px;
color: black;
}


</style>
