<template>
  <v-dialog
    v-model="vista"
    persistent
    fullscreen
  >
    <v-container
      fluid
      class="fill-height degradado"
    >
      <v-row
        justify="center"
        align="center"
      >
      <v-col cols="12">
        <div class="text-center">
          <v-progress-circular
          :size="200"
          :width="20"
          color="success"
          rotate="0"
          indeterminate
          class="mt-2"
        >
          <v-progress-circular
            :size="150"
            :width="15"
            color="secondary"
            rotate="0"
            indeterminate
          >
            <v-progress-circular
              :size="100"
              :width="10"
              color="primary"
              rotate="0"
              indeterminate
            >
              <v-avatar size="100">
                <v-img src="@/views/assets/Logo.svg"></v-img>
              </v-avatar>
            </v-progress-circular>
          </v-progress-circular>
        </v-progress-circular>
        </div>
      </v-col>
        <v-col sm="12" md="6" lg="4" xl="4" class="mt-3"><div class="text-center texto">Espere un momento por favor...</div></v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {},
  computed: {
    vista() {
      return this.$store.state.cargando;
    },
  },
};
</script>
<style>
.degradado {
  background-color: rgba(0, 0, 0, 0.623);
}
.texto {
  background-color: rgba(255, 255, 255, 0.623);
  color: rgb(0, 0, 0);
}
</style>