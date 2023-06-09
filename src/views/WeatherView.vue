<template>
    <main>
        <nav>
            <input type="text" class="form-control" v-model="searchInput" placeholder="Wybierz miasto"
                @input="inputChange" />
            <select v-if="citiesToSelect.length > 0" class="form-control" id="exampleFormControlSelect1">
                <option v-for="(city, index) in citiesToSelect" :key="index">
                    {{ city }}
                </option>
            </select>
        </nav>
        <div class="CitiesList">
            <h1>Wybrane miasta</h1>
            <div class="CitiesList__selected">
                <div v-if="citiesToSelect == null">
                    <span>test</span>
                </div>
                <div v-else>
                    <!-- <span v-for="(city, index) in citiesToSelect" :key="index">
                        {{ city }}
                    </span> -->
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
import { defineComponent, ref, onMounted } from 'vue'
import jsonData from '../assets/current.city.list.json'
import type CityDatas from '../types/CityDatas'

export default defineComponent({
    setup() {
        const cityDatas = ref<CityDatas[]>([])
        const citiesToSelectOriginal = ref<string[]>([])
        const citiesToSelect = ref<string[]>([])
        const searchInput = ref("")

        onMounted(() => {
            cityDatas.value = jsonData
            citiesToSelectOriginal.value = cityDatas.value.map((city: CityDatas) => {
                return city.country + ", " + city.name;
            })
        })

        const inputChange = () => {
            const serachTerm = searchInput.value.toLowerCase()

            if (serachTerm.length != 0) {
                citiesToSelect.value = citiesToSelectOriginal.value.filter(city => {
                    const cityString = city.toLowerCase().slice(4);
                    return cityString.startsWith(serachTerm);
                });
            }
            else {
                citiesToSelect.value = [];
            }
        }

        return {
            citiesToSelect,
            searchInput,
            inputChange
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
        margin-top: 2rem;
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