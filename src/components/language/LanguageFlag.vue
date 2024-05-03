<template>
    <AdvancedImage :cld-img="$cld.image('web/languages/' + language.iso)" :height="height"/>
</template>

<script>
import {AdvancedImage} from "@cloudinary/vue";

export default {
    name: "LanguageFlag",
    components: {AdvancedImage},
    props: {
        language: Object,
        height: {
            type: Number,
            default: 23
        }
    }
}
</script>

<style scoped>

</style>
