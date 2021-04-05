<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      max-width="800"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon>mdi-calendar-plus</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog" outlined>
        <v-card-title class="headline">Agregar Tarea<v-spacer></v-spacer>
          <v-btn
            icon
            @click="dialog = false"
          >
            <v-icon color="red">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
          <v-expansion-panels v-model="panel">
            <v-expansion-panel :key="1">
              <v-expansion-panel-header>
                Datos de tarea
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row
                  justify="center"
                  align="center"
                >
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      label="Titulo"
                      v-model="tarea.titulo"
                      placeholder="Titulo de la tarea"
                      hide-details="auto"
                      dense
                      @blur="$v.tarea.titulo.$touch()"
                      :error-messages="erroresTitulo"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="tarea.descripcion"
                      outlined
                      rows="3"
                      hide-details="auto"
                      label="Descripción de la tarea"
                      @blur="$v.tarea.descripcion.$touch()"
                      :error-messages="erroresDescripcion"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel :key="2">
              <v-expansion-panel-header>
                Fecha de tarea
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row
                  justify="center"
                  align="center"
                >
                  <v-col
                    lg="5"
                    md="5"
                    sm="12"
                  >
                    <v-row
                      justify="center"
                      align="center"
                    >
                      <v-col cols="12">
                        <fecha
                          nombre="Fecha Inicial"
                          :fechaMaxima="fechas.final.fecha"
                          @fecha="fechaInicial"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-time-picker
                          format="24hr"
                          full-width
                          v-model="fechas.inicial.hora"
                        ></v-time-picker>
                      </v-col>
                    </v-row>
                  </v-col>
                  
                  <v-col
                    lg="5"
                    md="5"
                    sm="12"
                  >
                    <v-row
                      justify="center"
                      align="center"
                    >
                      <v-col cols="12">
                        <fecha
                          nombre="Fecha final"
                          @fecha="fechaFinal"
                          :fechaMinima="fechas.inicial.fecha"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-time-picker
                          format="24hr"
                          full-width
                          v-model="fechas.final.hora"
                        ></v-time-picker>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="registrar(tarea)"
            text
            color="success"
          >Agregar</v-btn>
          <v-btn
            @click="dialog = false"
            text
            color="red"
          >Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import fecha from "@/components/info/Fecha.vue";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  components: {
    fecha,
  },
  data() {
    return {
      dialog: false,
      panel: 0,
      fechas: {
        inicial: {
          fecha: "",
          hora: "",
        },
        final: {
          fecha: "",
          hora: "",
        },
      },
      tarea: {
        titulo: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        fi: 0,
        ff: 0,
      },
    };
  },
  validations: {
    tarea: {
      titulo: {
        required,
        maxLength: maxLength(30),
      },
      descripcion: {
        maxLength: maxLength(500),
      },
    },
  },
  computed: {
    erroresTitulo() {
      let errores = [];
      if (!this.$v.tarea.titulo.$dirty) {
        return errores;
      }
      if (!this.$v.tarea.titulo.required) {
        errores.push("El Titulo es requerido");
      }
      if (!this.$v.tarea.titulo.maxLength) {
        errores.push("La longitud maxima es de 500 caracteres");
      }
      return errores;
    },
    erroresDescripcion() {
      let errores = [];
      if (!this.$v.tarea.descripcion.$dirty) {
        return errores;
      }
      if (!this.$v.tarea.descripcion.maxLength) {
        errores.push("La longitud maxima es de 100 caracteres");
      }
      return errores;
    },
  },
  watch: {
    "fechas.inicial.fecha"(dato) {
      this.validar();
    },
    "fechas.inicial.hora"(dato) {
      this.validar();
    },
    "fechas.final.fecha"(dato) {
      this.validar();
    },
    "fechas.final.hora"(dato) {
      this.validar();
    },
  },
  methods: {
    ...mapActions('tarea', ['crearTarea']),
    fechaInicial(fecha) {
      this.fechas.inicial.fecha = fecha.fecha;
    },
    fechaFinal(fecha) {
      this.fechas.final.fecha = fecha.fecha;
    },
    validar() {
      let fecha = this.fechas;
      let fi = fecha.inicial.fecha;
      let ff = fecha.final.fecha;
      let hi = fecha.inicial.hora;
      let hf = fecha.final.hora;
      if (fi && hi) {
        this.tarea.fecha_inicio = `${fi} ${hi}`;
        this.tarea.fi = new Date(`${fi} ${hi}`).getTime() / 1000;
      }
      if (ff && hf) {
        this.tarea.fecha_fin = `${ff} ${hf}`;
        this.tarea.ff = new Date(`${ff} ${hf}`).getTime() / 1000;
      }
      return;
    },
    async registrar(tarea) {
      if (this.$v.tarea.$invalid) {
        this.$v.tarea.$touch();
        this.panel = 0;
        return 0;
      }

      if (
        tarea.fi === 0 ||
        tarea.ff === 0 ||
        tarea.fi > tarea.ff ||
        tarea.fi === tarea.ff
      ) {
        let dif = tarea.fi - tarea.ff;
        let mensaje =
          (dif > 0)
            ? "Fecha final debe ser mayor a inicial"
            : "Se debe ingresar un rango de fechas con minimo un minuto de diferencia";
        this.panel = 1;
        this.$swal("Error con fecha", mensaje, "warning");
        return;
      }
      this.$store.commit("startCargando");
      let result = await this.crearTarea(tarea);
      if(result){
        this.$emit('Actualizar', true);
          this.$swal(
              "",
              result.mensaje,
              "success"
            );
      this.$store.commit("endCargando");
      }
      this.$store.commit("endCargando");
    },
  },
};
</script>
