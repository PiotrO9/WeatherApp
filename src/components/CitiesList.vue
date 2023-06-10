<template>
    <div class="legend">
        <span>Państwo</span>
        <span>Miasto</span>
        <span>Obecna pogoda</span>
        <span>Temperatura</span>
        <span>Min/Max temperatura</span>
    </div>
    <hr>
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
div {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 2fr;

    span {
        font-size: 1.2rem;
        font-weight: bold;
    }
}

hr {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
}

ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    list-style-type: none;
}
</style>