<template>
    <div class="legend">
        <span>Miasto</span>
        <span>Obecna pogoda</span>
        <span>Temperatura</span>
        <span>Wilgotność</span>
        <span>Min/Max temperatura</span>
        <span>Usuń</span>
        <span>Więcej informacji</span>
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
@import "../GeneralStyles/variables";

div {
    display: grid;
    grid-template-columns: 4fr repeat(4, 3fr) repeat(2, 2fr);

    span {
        font-size: 1.2rem;
        font-weight: bold;
        margin-top: 1rem;
        margin-bottom: auto;

        &:last-child {
            font-size: 1.1rem;
        }

        @media (max-width: $SmallDesktop) {
            font-size: 1rem;
        }
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