<template>
    <aside>
        <canvas ref="temperatureChartCanvas" class="temperatureChartContainer"></canvas>
        <canvas ref="humidityChartCanvas" class="humidityChartContainer"></canvas>
    </aside>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
    setup() {
        const temperatureChartCanvas = ref<HTMLCanvasElement | null>(null);
        const humidityChartCanvas = ref<HTMLCanvasElement | null>(null);

        onMounted(() => {
            if (temperatureChartCanvas.value && humidityChartCanvas.value) {
                new Chart(temperatureChartCanvas.value.getContext('2d'), {
                    type: 'bar',
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
                    // Konfiguracja drugiego wykresu (wilgotność)
                });
            }
        });

        return {
            temperatureChartCanvas,
            humidityChartCanvas,
        };
    },
});
</script>
  
<style lang="scss">
aside {
    height: 300px;
    width: 100%;

    canvas {
        font-size: 2rem;
    }
}
</style>