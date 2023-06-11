<template>
    <li>
        <p>
            {{ cityData.country + ", " + cityData.name }}
        </p>
        <img v-if="weatherIconUrl" :src="weatherIconUrl" alt="Icon with current weather">
        <span v-else>
            ❓
        </span>
        <p>
            {{ currentWeatherDatas?.temperature }} °C
        </p>
        <p>
            {{ currentWeatherDatas?.humidity }} %
        </p>
        <p>
            {{ currentWeatherDatas?.minTemperature }} °C -
            {{ currentWeatherDatas?.maxTemperature }} °C
        </p>
        <button type="button" class="btn btn-outline-danger"
            @click="removeCity(currentWeatherDatas ? currentWeatherDatas.name.toString() : '')">X</button>
        <button type="button" class="btn btn-success btn-more"
            @click="showMoreDatas(currentWeatherDatas ? currentWeatherDatas.name.toString() : '')">Więcej</button>
    </li>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import type CityDatas from '../types/CityDatas';
import GetCityActualWeather from '../utils/GetCityActualWeather'
import type WeatherShortData from '../types/WeatherShortData'
import { useSelectedCities } from '../stores/selectedCities'
import { useAside } from '../stores/details'

export default defineComponent({
    props: {
        cityData: {
            type: Object as () => CityDatas,
            required: true,
        }
    },
    setup(props) {
        const selectedCitiesStore = useSelectedCities();
        const asideStateStore = useAside();
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

        const removeCity = (cityName: string) => {
            selectedCitiesStore.removeCity(cityName)
        }

        const showMoreDatas = (cityName: string) => {
            if (cityName != '') {
                asideStateStore.setSelectedCountry(props.cityData.name)
                asideStateStore.toggleAsideOpenState()
            }
        }

        return {
            currentWeatherDatas,
            weatherIconUrl,
            removeCity,
            showMoreDatas
        }
    }
}) 
</script>

<style scoped lang="scss">
li {
    width: 100%;
    display: grid;
    grid-template-columns: 4fr repeat(4, 3fr) repeat(2, 2fr);
    justify-items: center;
    align-items: center;
    font-size: 2rem;
    margin-top: auto;
    margin-bottom: auto;

    p {
        font-size: 1.6rem;
    }

    button {
        width: 40%;
        min-width: 48px;
        text-align: center;

        &.btn-outline-danger {
            font-weight: bold;
        }

        &.btn-more {
            width: 70%;
            text-align: center;
        }
    }
}
</style>