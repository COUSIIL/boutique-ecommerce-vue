<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: String
})

const searchQuery = ref(props.modelValue)

watch(searchQuery, (val) => {
  emit('update:modelValue', val)
})
</script>

<template>
  <form class="form" @submit.prevent>
    <input
    class="input"
      type="search"
      v-model="searchQuery"
      placeholder="Search here ..."
    />
    <svg class="fa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path d="M15 15L16.5 16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16.9333 19.0252C16.3556 18.4475 16.3556 17.5109 16.9333 16.9333C17.5109 16.3556 18.4475 16.3556 19.0252 16.9333L21.0667 18.9748C21.6444 19.5525 21.6444 20.4891 21.0667 21.0667C20.4891 21.6444 19.5525 21.6444 18.9748 21.0667L16.9333 19.0252Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16.5 9.5C16.5 5.63401 13.366 2.5 9.5 2.5C5.63401 2.5 2.5 5.63401 2.5 9.5C2.5 13.366 5.63401 16.5 9.5 16.5C13.366 16.5 16.5 13.366 16.5 9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </form>
</template>

  

<style>

.form{
    position: relative;
    top: 10px;
    left: 50%;
    transform: translate(-50%,-50%);
    transition: all 1s;
    width: 50px;
    height: 50px;
    background: white;
    box-sizing: border-box;
    border-radius: 25px;
    border: 4px solid white;
    padding: 5px;
    width: 50%;
    min-width: 200px;
    max-width: 400px;
}

.input{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;;
    height: 42.5px;
    line-height: 30px;
    outline: 0;
    border: 0;
    display: none;
    font-size: 1em;
    border-radius: 20px;
    padding: 0 20px;
    display: block;
}

.fa{
    box-sizing: border-box;
    padding: 10px;
    width: 42.5px;
    height: 42.5px;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    color: #8c52ff;
    text-align: center;
    transition: all 1s;
    
}

.fa:hover{
    background: #8c52ff;
    color: white;
    cursor: pointer;
}
/*
form:hover{
    width: 300px;
    cursor: pointer;
}

form:hover input{
    display: block;
}

form:hover .fa{
    background: #8c52ff;
    color: white;
}*/
</style>