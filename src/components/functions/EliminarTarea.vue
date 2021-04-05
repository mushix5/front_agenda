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
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <v-card
        width="350"
        outlined
      >
        <v-card-title class="headline">Eliminar Tarea</v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
          ¿Desea eliminar la tarea "{{tarea.name}}"?
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn
            @click="Eliminar(tarea)"
            text
            color="error"
          >Eliminar</v-btn>
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
import { mapActions } from "vuex";
export default {
  props: {
    tarea: {
      type: [Array, Object],
      require: true,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions("tarea", ["eliminarTarea"]),
    async Eliminar(item) {
      this.$store.commit("startCargando");
      await this.eliminarTarea(item.id_registro);
      this.$emit("Actualizar", true);
      this.dialog = false;
      this.$store.commit("endCargando");
    },
  },
};
</script>
