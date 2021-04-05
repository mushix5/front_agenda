<template>
    <v-app>
        <app-header/>
        <app-view/>
        <app-loading/>
    </v-app>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader";
import AppView from "@/components/layout/AppView";
import AppLoading from "@/components/layout/AppLoading";
export default {
    components:{
        AppHeader,
        AppView,
        AppLoading
    }
}
</script>