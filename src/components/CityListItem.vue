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
            const refreshInterval = 60 * 1000;
            currentWeatherDatas.value = await GetCityActualWeather.get(props.cityData.name)

            setInterval(async () => {
                currentWeatherDatas.value = await GetCityActualWeather.get(props.cityData.name)
                console.log(currentWeatherDatas.value)
            }, refreshInterval)
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
@import "../GeneralStyles/variables";

li {
    width: 100%;
    display: grid;
    grid-template-columns: 4fr repeat(4, 3fr) repeat(2, 2fr);
    justify-items: center;
    align-items: center;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 2rem;

    @media (max-width: $SmallDesktop) {
        grid-template-columns: 3fr 2fr repeat(3, 3fr) repeat(2, 2fr);
    }

    p {
        font-size: 1.6rem;

        @media (max-width: $MediumDesktop) {
            font-size: 1.3rem;
        }

        @media (max-width: $SmallDesktop) {
            font-size: 1.1rem;
        }

        @media (max-width: $MediumMobile) {
            font-size: 0.9rem;
        }
    }

    button {
        width: 40%;
        min-width: 48px;

        &.btn-outline-danger {
            font-weight: bold;

            @media (max-width: $MediumDesktop) {
                width: 60%;
                min-width: 0px;
            }

            @media (max-width: $MediumMobile) {
                width: 80%;
                max-width: 26px;
                max-height: 26px;
                padding-top: 0px;
                padding-left: 8px;
            }

            @media (max-width: $SmallMobile) {
                width: 100%;
            }
        }

        &.btn-more {
            width: 70%;
            text-align: center;

            @media (max-width: $MediumDesktop) {
                width: 85%;
                font-size: 1rem;
            }

            @media (max-width: $SmallDesktop) {
                width: 60%;
                padding-left: 0.4rem;
                font-size: 0.75rem;
            }
        }
    }
}
</style>