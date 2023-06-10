<template>
    <main>
        <nav>
            <div>
                <input type="text" class="form-control" v-model="searchInput" placeholder="Wyszukaj miasto" />
                <button type="button" class="btn btn-info" @click="logout">Wyloguj</button>
            </div>
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
                <div v-if="selectedCitiesStore.$state.SelectedCities.length == 0" class="CitiesList__selected--empty">
                    <span>Nie wybrano miast</span>
                </div>
                <div v-else class="CitiesList__selected--list">
                    <CitiesList :selectedCities="selectedCitiesStore.$state.SelectedCities" />
                </div>
            </div>
        </div>
    </main>
    <AppAside />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import jsonData from '../assets/current.city.list.json'
import type CityDatas from '../types/CityDatas'
import CitiesList from '../components/CitiesList.vue'
import { useRouter } from 'vue-router';
import { useSelectedCities } from '../stores/selectedCities'
import { useLogin } from '../stores/loging'
import AppAside from '../components/AppAside.vue'

export default defineComponent({
    components: {
        CitiesList,
        AppAside
    },
    setup() {
        const router = useRouter();
        const cityDatas = ref<CityDatas[]>([])
        const citiesToSelectOriginal = ref<string[]>([])
        const searchInput = ref("")
        const selectedCity = ref("")
        const selectedCities = ref<string[]>([])
        const selectedCitiesFullData = ref<CityDatas[]>([])
        const selectedCitiesStore = useSelectedCities()
        const loginStore = useLogin()

        onMounted(() => {
            cityDatas.value = jsonData
            citiesToSelectOriginal.value = cityDatas.value.map((city: CityDatas) => {
                return city.country + ", " + city.name;
            })

            if (!loginStore.isLogged) {
                if (!loginStore.isRembered) {
                    router.push({ name: "home" })
                }
            }
        })

        const handleCitySelection = () => {
            if (selectedCity.value) {
                selectedCities.value.push(selectedCity.value);
                const trimmedCityName = selectedCity.value.slice(4);
                selectedCity.value = '';

                const selectedCityFullData: CityDatas | undefined = cityDatas.value.find((city: CityDatas) => {
                    if (city.name === trimmedCityName) {
                        return city
                    }
                })

                if (selectedCityFullData != undefined) {
                    const selectedCitiesFromStore = selectedCitiesStore.getSelectedCities
                    selectedCitiesFromStore.push(selectedCityFullData)
                    selectedCitiesStore.setSelectedCities(selectedCitiesFromStore)
                }
            }
        };

        const citiesToSelect = computed(() => {
            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm.length === 0) {
                return [];
            } else {
                return citiesToSelectOriginal.value.filter((city: string) => {
                    const cityString = city.toLowerCase().slice(4);
                    return cityString.startsWith(searchTerm);
                });
            }
        });

        const logout = (): void => {
            loginStore.logoutUser()
            router.push({ name: "home" });
        }

        return {
            citiesToSelect,
            searchInput,
            handleCitySelection,
            selectedCity,
            selectedCities,
            selectedCitiesFullData,
            selectedCitiesStore,
            logout
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
        width: 75%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 2rem;

        div {
            width: 100%;
            display: flex;
            flex-direction: row;
            gap: 2%;

            input {
                width: 80%
            }

            button {
                width: 18%;
            }

        }

        select {
            width: 100%;
            margin-top: 0.5em;
        }
    }

    .CitiesList {
        width: 75%;
        text-align: center;

        h1 {
            margin-top: 2rem;
        }

        &__selected {
            height: max-content;
            min-height: 300px;
            margin-top: 2rem;
            background-color: $CremeBackgroundColor;
            border-radius: 1rem;

            &--empty {
                height: 100%;

                span {
                    font-size: 1.4rem;
                }
            }
        }
    }
}
</style>