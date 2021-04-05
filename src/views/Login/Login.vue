<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      dense
      justify="center"
      align-content="center"
    >
      <v-card
        elevation="10"
        outlined
        max-width="500px"
      >
        <v-card-title>Iniciar sesión</v-card-title>
        <v-card-text class="text-center">
          <v-row
            justify="center"
            align="center"
          >
            <v-col>
              <v-avatar size="150">
                <v-img src="@/views/assets/Logo.svg"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="12">
              <v-text-field
                outlined
                dense
                label="Usuario"
                hide-details
                v-model="key.correo"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                outlined
                dense
                label="Contraseña"
                hide-details
                v-model="key.pass"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-col
              xs="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
            >
              <v-list-item two-line>
                <v-list-item-content>
                  <!-- <a @click="loading">Registrarme</a> -->
                  <registrar/>
                </v-list-item-content>
              </v-list-item>
              <v-btn
                small
                block
                color="success"
                @click="Iniciar(key)"
              >Iniciar</v-btn>
            </v-col>
            <v-col cols="12">
              <v-divider />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
import registrar from "@/components/functions/AgregarUsuario.vue";

export default {
  components: {
    registrar
  },
  data() {
    return {
      show1: false,
      archivo: true,
      key: { correo: "", pass: "" },
    };
  },
  methods: {
 ...mapActions("usuario", ["iniciarSesion"]),
    async Iniciar(key) {
        if(!key.correo || !key.pass){
            console.log("error")
            return;
        }
    this.$store.commit("startCargando");
      let respuesta = await this.iniciarSesion(key);
      if (respuesta) {
        this.$store.commit("endCargando");
        this.$router.push({ name: "home" });
      }
      this.$store.commit("endCargando");
    },
    loading() {
      this.$store.commit("startCargando");
    },
  },
};
</script>