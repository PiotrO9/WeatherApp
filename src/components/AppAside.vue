<template>
    <div class="asideBackground">
        <aside>
            <button type="button" class="btn btn-outline-danger" @click="closeAside">X</button>
            <p>Wykres zmian temperatury w czasie</p>
            <canvas ref="temperatureChartCanvas" class="temperatureChartContainer"></canvas>
            <p>Wykres zmian wilgotności w czasie</p>
            <canvas ref="humidityChartCanvas" class="humidityChartContainer"></canvas>
        </aside>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useAside } from '../stores/details'
import Chart from 'chart.js/auto';
import GetCityHistorialTemperature from '../utils/GetCityHistorialTemperature';

export default defineComponent({
    props: {
        countryName: {
            type: String,
            required: true
        }
    },
    setup() {
        const temperatureChartCanvas = ref<HTMLCanvasElement | null>(null);
        const humidityChartCanvas = ref<HTMLCanvasElement | null>(null);
        const asideStateStore = useAside()

        onMounted(() => {
            if (temperatureChartCanvas.value && humidityChartCanvas.value) {
                new Chart(temperatureChartCanvas.value.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: ['Red', 'Blue'],
                        datasets: [
                            {
                                label: 'Test',
                                data: [1, 2, 3],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });

                new Chart(humidityChartCanvas.value.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: ['Red', 'Blue'],
                        datasets: [
                            {
                                label: 'Test',
                                data: [1, 2, 3],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        });

        const closeAside = () => {
            asideStateStore.toggleAsideOpenState()
        }

        return {
            temperatureChartCanvas,
            humidityChartCanvas,
            closeAside
        };
    },
});
</script>
  
<style scoped lang="scss">
@import "../GeneralStyles/variables";

.asideBackground {
    height: 100vh;
    width: 100vw;
    background-color: $DarkTransparentBackgroundColor;
    position: absolute;

    aside {
        height: 100vh;
        width: 30vw;
        min-width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        position: absolute;
        right: 0;
        background-color: black;

        button {
            position: absolute;
            top: 10px;
            left: 10px;
            outline: none;
            border: none;
            font-weight: bold;
        }

        p {
            color: white;
            text-align: center;
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        canvas {
            font-size: 2rem;
        }
    }
}
</style>