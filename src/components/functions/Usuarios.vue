<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      fullscreen
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          @click="cargarUsuarios()"
          icon
        >
          <v-icon>mdi-account-box</v-icon>
        </v-btn>
      </template>
      <v-card
        outlined
      >
        <v-card-title class="headline">Administración de usuarios <v-spacer></v-spacer>
          <v-btn
            icon
            @click="dialog = false"
          >
            <v-icon color="red">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
          <v-row
            justify="center"
            align="center"
          >
            <v-col cols="11">
              <v-data-table
                :headers="headers"
                :items="datos"
              >
                <template v-slot:item.accion="{item}">
                  <v-btn
                    @click="estatusUsuario(item)"
                    icon
                  >
                    <v-icon>mdi-cached</v-icon>
                  </v-btn>
                </template>
                <template v-slot:item.activo="{item}">
                  <v-chip
                    :color="item.activo ? 'green':'red'"
                    text-color="white"
                  >{{item.activo ? 'Activo':'Desactivado'}}</v-chip>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      headers: [
        { value: "id_usuario", text: "Número de usuario", align: "center" },
        { value: "nombre", text: "Nombre", align: "center" },
        { value: "correo", text: "Correo", align: "center" },
        { value: "activo", text: "Estatus", align: "center" },
        { value: "accion", text: "Cambiar Estatus", align: "center" },
      ],
      datos: [],
    };
  },
  methods: {
    ...mapActions("usuario", ["obtenerUsuarios", "cambiarStatus"]),
    async cargarUsuarios() {
      let datos = await this.obtenerUsuarios();
      this.datos = datos;
    },
    async estatusUsuario(item) {
    let result = await this.cambiarStatus(item);
    if(!result.estatus){
        this.$swal(
              "Acción no realizada",
              result.mensaje,
              "warning"
            );
        return;
    }
    this.cargarUsuarios();
  },
  },
  mounted() {
    this.cargarUsuarios();
  }
};
</script>
