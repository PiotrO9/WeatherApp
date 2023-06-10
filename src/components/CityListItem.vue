<template>
    <li>
        <p>
            {{ cityData.country }},
        </p>
        <p>
            {{ cityData.name }}
        </p>
        <img v-if="weatherIconUrl" :src="weatherIconUrl" alt="Icon with current weather">
        <span v-else>
            ❓
        </span>
        <p>
            {{ currentWeatherDatas?.temperature }} °C
        </p>
        <p>
            {{ currentWeatherDatas?.minTemperature }} °C -
            {{ currentWeatherDatas?.maxTemperature }} °C
        </p>
    </li>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
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
        const weatherIconUrl = computed(() => {
            if (currentWeatherDatas.value) {
                const iconCode = currentWeatherDatas.value.imageName
                return `http://openweathermap.org/img/wn/${iconCode}.png`
            } else {
                return ''
            }
        })

        onMounted(async () => {
            currentWeatherDatas.value = await GetCityActualWeather.get(props.cityData.name)
        })

        return {
            currentWeatherDatas,
            weatherIconUrl
        }
    }
}) 
</script>

<style scoped lang="scss">
li {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 2fr;
    justify-items: center;
    align-items: center;
    font-size: 2rem;
}
</style>