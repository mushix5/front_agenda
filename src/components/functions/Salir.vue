<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="350"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </template>
      <v-card
        width="350"
        outlined
      >
        <v-card-title class="headline">Cerrar session</v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
          ¿Desea salir de la aplicacion?
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn
            @click="salir()"
            text
            color="success"
          >Si</v-btn>
          <v-btn
            @click="dialog = false"
            text
            color="warning"
          >Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    salir() {
      this.$store.commit("cerrarSession", {});
      this.$router.push({ name: "login" });
    },
  },
};
</script>
