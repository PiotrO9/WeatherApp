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
import GetCityHistorialHumidity from '../utils/GetCityHistorialHumidity';

export default defineComponent({
    setup() {
        const temperatureChartCanvas = ref<HTMLCanvasElement | null>(null);
        const humidityChartCanvas = ref<HTMLCanvasElement | null>(null);
        const asideStateStore = useAside()

        onMounted(async () => {
            if (temperatureChartCanvas.value) {
                const response = await GetCityHistorialTemperature.get(asideStateStore.getSelectedCityName);
                const upcomingTemperatureDatas = ref(response);

                new Chart(temperatureChartCanvas.value.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: upcomingTemperatureDatas.value.datas,
                        datasets: [
                            {
                                label: 'Temperatura',
                                data: upcomingTemperatureDatas.value.temperatures,
                                borderWidth: 1,
                                backgroundColor: "white",
                                borderColor: "white"
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                ticks: {
                                    color: "white"
                                },
                                beginAtZero: true,
                                color: "white",
                            },
                            x: {
                                ticks: {
                                    color: "white"
                                }
                            }
                        },
                    },
                });
            }

            if (humidityChartCanvas.value) {
                const response = await GetCityHistorialHumidity.get(asideStateStore.getSelectedCityName);
                const UpcomingHumidityDatas = ref(response);

                new Chart(humidityChartCanvas.value.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: UpcomingHumidityDatas.value.datas,
                        datasets: [
                            {
                                label: 'Wilgotność',
                                data: UpcomingHumidityDatas.value.humidities,
                                borderWidth: 1,
                                backgroundColor: "white",
                                borderColor: "white"
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                ticks: {
                                    color: "white"
                                },
                                beginAtZero: true,
                                color: "white",
                            },
                            x: {
                                ticks: {
                                    color: "white"
                                }
                            }
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
        width: 50%;
        min-width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        position: absolute;
        right: 0;
        background-color: $DarkBackgroundColor;

        button {
            position: absolute;
            top: 10px;
            left: 10px;
            outline: none;
            border: none;
            font-weight: bold;
            font-family: $Sora;
        }

        p {
            color: white;
            text-align: center;
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        canvas {
            max-height: 35%;
            margin-bottom: 3rem;
            background-color: $DarkBackgroundColor;
            font-size: 2rem;
        }
    }
}
</style>