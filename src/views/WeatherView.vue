<template>
    <main>
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <p class="navbar-brand mb-0 text-truncate">Aplikacja pogodowa</p>
            <div class="ml-auto">
                <button type="button" class="btn btn-info" @click="logout">Wyloguj</button>
            </div>
        </nav>
        <div class="CountrySelection">
            <div>
                <input type="text" class="form-control" v-model="searchInput" placeholder="Wyszukaj miasto" />
            </div>
            <select v-if="citiesToSelect.length > 0" class="form-control" id="exampleFormControlSelect1"
                v-model="selectedCity" @change="handleCitySelection">
                <option disabled selected value="">Wybierz miasto</option>
                <option v-for="(city, index) in citiesToSelect" :key="index">
                    {{ city }}
                </option>
            </select>
        </div>
        <div class="CitiesList">
            <h1>Wybrane miasta</h1>
            <div class="CitiesList__selected">
                <div v-if="selectedCitiesStore.$state.SelectedCities.length == 0" class="CitiesList__selected--empty">
                    <span>Nie wybrano miast</span>
                </div>
                <div v-else tag="CitiesList" class="CitiesList__selected--list">
                    <CitiesList :selectedCities="selectedCitiesStore.$state.SelectedCities" />
                </div>
            </div>
        </div>
    </main>
    <AppAside v-if="asideStateStore.getAsideOpenState" />
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, onMounted, computed } from 'vue'
import jsonData from '../assets/current.city.list.json'
import type CityDatas from '../types/CityDatas'
import CitiesList from '../components/CitiesList.vue'
import { useRouter } from 'vue-router';
import { useSelectedCities } from '../stores/selectedCities'
import { useLogin } from '../stores/loging'
import { useAsideStore } from '../stores/details'
import AppAside from '../components/AppAside.vue'

export default defineComponent({
    components: {
        CitiesList,
        AppAside
    },
    setup() {
        const router = useRouter();
        const selectedCitiesStore = useSelectedCities()
        const loginStore = useLogin()
        const asideStateStore = useAsideStore()

        const data = {
            cityDatas: ref<CityDatas[]>([]),
            citiesToSelectOriginal: ref<string[]>([]),
            searchInput: ref(""),
            selectedCity: ref(""),
            selectedCities: ref<string[]>([]),
            selectedCitiesFullData: ref<CityDatas[]>([])
        }

        const { cityDatas, citiesToSelectOriginal, searchInput, selectedCity, selectedCities } = toRefs(data)

        onMounted(() => {
            cityDatas.value = jsonData
            citiesToSelectOriginal.value = cityDatas.value.map((city: CityDatas) => {
                return city.country + ", " + city.name;
            })

            if (!loginStore.isLogged) {
                if (!loginStore.isRemembered) {
                    router.push({ name: "home" })
                }
            }
        })

        const handleCitySelection = () => {
            if (selectedCity.value) {
                if (isValueExisting(selectedCity.value.slice(4))) {
                    selectedCity.value = '';
                    return;
                }

                selectedCities.value.push(selectedCity.value);
                const trimmedCityName = selectedCity.value.slice(4);
                selectedCity.value = '';

                const selectedCityFullData: CityDatas | undefined = cityDatas.value.find((city: CityDatas) => {
                    if (city.name === trimmedCityName) {
                        return city
                    }
                })

                if (selectedCityFullData) {
                    const selectedCitiesFromStore = selectedCitiesStore.getSelectedCities
                    selectedCitiesFromStore.push(selectedCityFullData)
                    selectedCitiesStore.setSelectedCities(selectedCitiesFromStore)
                }
            }
        };

        const isValueExisting = (cityName: string): boolean => {
            let resultArr: CityDatas[] = []
            for (const city of selectedCitiesStore.getSelectedCities) {
                if (city.name == cityName) {
                    resultArr.push(city)
                }
            }

            return (resultArr.length == 0) ? false : true;
        }

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
            ...data,
            citiesToSelect,
            selectedCitiesStore,
            asideStateStore,
            handleCitySelection,
            logout,
        }
    }
})
</script>

<style scoped lang="scss">
@import "../GeneralStyles/_variables.scss";

* {
    font-family: $PTSans;
}

main {
    @include SquareSize(100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $TealBackgroundColor;
    background-image: url("../../public/circles-background.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    nav {
        width: 100%;
    }

    .CountrySelection {
        width: 75%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 4rem;

        div {
            width: 100%;
            display: flex;
            flex-direction: row;

            input {
                width: 100%
            }
        }

        select {
            width: 100%;
            max-height: 200px;
            cursor: pointer;
        }
    }

    .CitiesList {
        width: 75%;
        text-align: center;

        @media (max-width: $SmallDesktop) {
            width: 90%;
        }

        @media (max-width: $BigMobile) {
            width: 100%;
        }

        h1 {
            margin-top: 2rem;
        }

        &__selected {
            height: max-content;
            min-height: 300px;
            margin-top: 2rem;
            border-radius: 1rem;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
            background: linear-gradient(135deg, rgba(42, 157, 244, 0.1) rgba(42, 157, 244, 0));
            border: 2px solid #003366;


            @media (max-width: $BigMobile) {
                padding-right: 4px;
                border-radius: 0px;
                border-width: 3px;
            }

            span {
                font-size: 1.6rem;
                font-family: $Sora;
            }
        }
    }
}
</style>