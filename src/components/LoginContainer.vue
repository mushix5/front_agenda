<template>
  <v-app>
    <app-view />
    <app-loading />
  </v-app>
</template>
<script>
import AppView from "@/components/layout/AppView";
import AppLoading from "@/components/layout/AppLoading";
export default {
  components: {
    AppView,
    AppLoading
  }
};
</script>