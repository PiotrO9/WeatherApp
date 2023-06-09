<template>
    <li>
        {{ cityData.country }},
        {{ cityData.name }}
        {{ currentWeatherDatas?.temperature }}
        {{ currentWeatherDatas?.minTemperature }} -
        {{ currentWeatherDatas?.maxTemperature }}
    </li>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import type CityDatas from '../types/CityDatas';
import GetCityActualWeather from '../utils/GetCityActualWeather'
import type WeatherShortData from '../types/WeatherShortData'

export default defineComponent({
    props: {
        cityData: {
            type: Object as () => CityDatas,
            required: true,
        }
    },
    setup(props) {
        const currentWeatherDatas = ref<WeatherShortData | null>(null)

        onMounted(async () => {
            currentWeatherDatas.value = await GetCityActualWeather.get(props.cityData.name)
        })

        return {
            currentWeatherDatas
        }
    }
}) 
</script>

<style scoped lang="scss">
li {
    font-size: 2rem;
}
</style>