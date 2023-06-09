<template>
    <ul>
        <CityListItem v-for="(city, index) in selectedCities" :key="index" :cityData="city" />
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CityListItem from './CityListItem.vue'
import type CityDatas from '../types/CityDatas'

export default defineComponent({
    props: {
        selectedCities: {
            type: Array<CityDatas>,
            required: true
        }
    },
    components: {
        CityListItem
    },
    setup() {

    },
    created() {
        console.log(this.$props.selectedCities)
    }
}) 
</script>

<style scoped lang="scss">
ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    list-style-type: none;
}
</style>