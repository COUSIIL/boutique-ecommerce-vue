<template>

    <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <div ref="container" style="width: 300px; height: 300px;"></div>

        <div style="font-weight: bold; font-size: 3vh;">
            شكراً لطلبك. فريقنا يتكفل بكل شيء، فكر في إبقاء هاتفك بالقرب منك.
        </div>
    </div>



</template>


<script setup>
import lottie from 'lottie-web'
import { onMounted, ref } from 'vue'

const container = ref(null)

onMounted(() => {
  lottie.loadAnimation({
    container: container.value,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: '/animation/completed.json', // Chemin relatif ou absolu
  })
})
</script>
