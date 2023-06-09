<template>
    <main>
        <nav>
            <input type="text" class="form-control" v-model="searchInput" placeholder="Wyszukaj miasto" />
            <select v-if="citiesToSelect.length > 0" class="form-control" id="exampleFormControlSelect1"
                v-model="selectedCity" @change="handleCitySelection">
                <option disabled selected value="">Wybierz miasto</option>
                <option v-for="(city, index) in citiesToSelect" :key="index">
                    {{ city }}
                </option>
            </select>
        </nav>
        <div class="CitiesList">
            <h1>Wybrane miasta</h1>
            <div class="CitiesList__selected">
                <div v-if="selectedCities.length == 0">
                    <span>Nie wybrano miast</span>
                </div>
                <div v-else>
                    <!-- <span v-for="(city, index) in selectedCities" :key="index">
                        {{ city }}
                    </span> -->
                    <CitiesList :selectedCities="selectedCities" />
                </div>
            </div>
        </div>
        <div>

        </div>
    </main>
    <aside>

    </aside>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import jsonData from '../assets/current.city.list.json'
import type CityDatas from '../types/CityDatas'
import CitiesList from '../components/CitiesList.vue'

export default defineComponent({
    components: {
        CitiesList
    },
    setup() {
        const cityDatas = ref<CityDatas[]>([])
        const citiesToSelectOriginal = ref<string[]>([])
        const searchInput = ref("")
        const selectedCity = ref("")
        const selectedCities = ref<string[]>([])

        onMounted(() => {
            cityDatas.value = jsonData
            citiesToSelectOriginal.value = cityDatas.value.map((city: CityDatas) => {
                return city.country + ", " + city.name;
            })
        })

        const handleCitySelection = () => {
            if (selectedCity.value) {
                selectedCities.value.push(selectedCity.value);
                selectedCity.value = '';
            }

            console.log(selectedCities.value)
        };

        const citiesToSelect = computed(() => {
            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm.length === 0) {
                return [];
            } else {
                return citiesToSelectOriginal.value.filter(city => {
                    const cityString = city.toLowerCase().slice(4);
                    return cityString.startsWith(searchTerm);
                });
            }
        });

        return {
            citiesToSelect,
            searchInput,
            handleCitySelection,
            selectedCity,
            selectedCities
        }
    }
})
</script>

<style scoped lang="scss">
@import "../GeneralStyles/_variables.scss";

main {
    @include SquareSize(100%);
    display: flex;
    flex-direction: column;
    align-items: center;

    nav {
        width: 65%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 2rem;

        select {
            width: 80%;
            margin-top: 0.5em;
        }
    }

    .CitiesList {
        width: 65%;
        text-align: center;

        h1 {
            margin-top: 2rem;
        }

        &__selected {
            height: 300px;
            margin-top: 2rem;
            background-color: $CremeBackgroundColor;
            border-radius: 1rem;
        }
    }
}
</style>