<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        outlined
        v-model="fecha"
        :label="nombre"
        readonly
        hide-details="auto"
        dense
        required
        :error-messages="errores"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="fecha"
      :min="fechaMinima"
      :max="fechaMaxima"
      no-title
      scrollable
    ></v-date-picker>
  </v-menu>
</template>
<script>
export default {
  props: {
    fechaFinal: {
      type: Boolean,
      default: false,
    },
    fechaMinima: {
      type: String,
      default: "1910-01-01",
    },
    fechaMaxima: {
      type: String,
      default: "2050-12-31",
    },
    nombre: {
        type: String,
        default: "Fecha"
    },
    errores: {
        type: [Array, Function],
        default: () => []
    }
  },
  data() {
    return {
      menu: false,
      fecha: "",
    };
  },
  watch: {
    fecha(dato) {
      let resultado = 0;
      let regex = /-+/gi;
      if (this.fechaFinal) {
        resultado = dato
          ? Math.round(
              (new Date(dato.replace(regex, "/")).getTime() + 86399000) / 1000
            )
          : null;
      } else {
        resultado = dato
          ? Math.round(new Date(dato.replace(regex, "/")).getTime() / 1000)
          : null;
      }
      this.menu = false;
      this.$emit("fecha", { fecha_timestamp: resultado, fecha: dato });
    },
  },
};
</script>