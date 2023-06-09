<template>
    <li>
        {{ name }}
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        }
    },
    setup() {

    }
}) 
</script>

<style lang="scss"></style>