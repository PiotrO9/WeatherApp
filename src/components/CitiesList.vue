<template>
    <ul>
        <CityListItem v-for="(city, index) in selectedCities" :key="index" :name=city />
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CityListItem from './CityListItem.vue'

export default defineComponent({
    props: {
        selectedCities: {
            type: Array<string>,
            required: true
        }
    },
    components: {
        CityListItem
    },
    setup() {

    }
}) 
</script>

<style scoped lang="scss">
ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
}
</style>