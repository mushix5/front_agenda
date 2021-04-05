<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          text
        >
          Registrarme
        </v-btn>
      </template>
      <v-card
        width="600"
        outlined
      >
        <v-card-title class="headline">Registro de usuario</v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
          <v-row
            justify="center"
            align="center"
            class="mt-2"
          >
            <v-col cols="12">
              <v-text-field
                outlined
                v-model="usuario.correo"
                label="Correo"
                dense
                hide-details="auto"
                placeholder="Correo electronico"
                @blur="$v.usuario.correo.$touch()"
                :error-messages="erroresCorreo"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                outlined
                v-model="usuario.nombre"
                label="Nombre"
                dense
                hide-details="auto"
                placeholder="Nombre completo"
                @blur="$v.usuario.nombre.$touch()"
                :error-messages="erroresNombre"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                outlined
                v-model="usuario.pass"
                label="Contraseña"
                dense
                placeholder="Contraseña"
                hide-details="auto"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                @blur="$v.usuario.pass.$touch()"
                :error-messages="erroresPass"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                outlined
                v-model="usuario.ver_pass"
                dense
                label="Contraseña"
                hide-details="auto"
                placeholder="Verifica Contraseña"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                @blur="$v.usuario.ver_pass.$touch()"
                :error-messages="erroresVerPass"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="registrar(usuario)"
            text
            color="success"
          >Registrar</v-btn>
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
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs,
} from "vuelidate/lib/validators";
import {mapActions} from "vuex";
export default {
  data() {
    return {
      dialog: false,
      show1: false,
      usuario: {
        nombre: "",
        correo: "",
        pass: "",
        ver_pass: "",
      },
    };
  },
  methods: {
      ...mapActions('usuario', ['registrarUsuario']),
    async registrar(usuario) {
      if (this.$v.usuario.$invalid) {
        this.$v.usuario.$touch();
        return 0;
      }
      this.$store.commit("startCargando");
      let result = await this.registrarUsuario(usuario);
      if(result.estatus){
          this.$swal(
              "Usuario creado",
              result.mensaje,
              "success"
            );
            this.dialog = false;
            this.$store.commit("endCargando");
            return;
      }
      this.$swal(
              "Usuario no registrado",
              result.mensaje,
              "warning"
            );
            this.$store.commit("endCargando");
            return;
    },
  },
  validations: {
    usuario: {
      nombre: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(50),
      },
      correo: {
        required,
        email,
      },
      pass: {
        minLength: minLength(8),
        maxLength: maxLength(20),
        required,
      },
      ver_pass: {
        required,
        sameAs: sameAs("pass"),
      },
    },
  },
  computed: {
    erroresNombre() {
      let errores = [];
      if (!this.$v.usuario.nombre.$dirty) {
        return errores;
      }
      if (!this.$v.usuario.nombre.required) {
        errores.push("El nombre es requerido");
      }
      if (!this.$v.usuario.nombre.maxLength) {
        errores.push("La longitud maxima es de 50 caracteres");
      }
      if (!this.$v.usuario.nombre.minLength) {
        errores.push("La longitud minima es de 6 caracteres");
      }
      return errores;
    },
    erroresCorreo() {
      let errores = [];
      if (!this.$v.usuario.correo.$dirty) {
        return errores;
      }
      if (!this.$v.usuario.correo.required) {
        errores.push("El correo es requerido");
      }
      if (!this.$v.usuario.correo.email) {
        errores.push("No es un formato de correo valido");
      }
      return errores;
    },
    erroresPass() {
      let errores = [];
      if (!this.$v.usuario.pass.$dirty) {
        return errores;
      }
      if (!this.$v.usuario.pass.required) {
        errores.push("La contraseña es requerida");
      }
      if (!this.$v.usuario.pass.minLength) {
        errores.push("La longitud minima es de 8 caracteres");
      }
      if (!this.$v.usuario.pass.maxLength) {
        errores.push("La longitud maxima es de 20 caracteres");
      }
      return errores;
    },
    erroresVerPass() {
      let errores = [];
      if (!this.$v.usuario.ver_pass.$dirty) {
        return errores;
      }
      if (!this.$v.usuario.ver_pass.required) {
        errores.push("La validación es requerida");
      }
      if (!this.$v.usuario.ver_pass.sameAs) {
        errores.push("La contraseña no es igual");
      }
      return errores;
    },
  },
};
</script>
