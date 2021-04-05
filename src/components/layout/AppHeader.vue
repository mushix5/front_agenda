<template>
  <v-app-bar
    app
    absolute
    color="#d91414"
    dark
    prominent
    src="https://picsum.photos/1920/1080?random"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(205,92,92,.5), rgba(25,32,72,.5)"
      ></v-img>
    </template>

    <v-spacer></v-spacer>
    <v-btn v-if="vista" icon >
        <usuarios/>
    </v-btn>
    <v-btn icon>
    <salir/>
    </v-btn>
  </v-app-bar>
</template>
<script>
import Salir from '@/components/functions/Salir.vue';
import Usuarios from '@/components/functions/Usuarios.vue';
export default {
components:{
    Salir,
    Usuarios
},
  data() {
    return {
    };
  },
  methods: {
    enrutar(ruta){
      this.$router.push({ name: ruta});
    }
  },
  computed:{
    vista() {
      let info = this.$store.state.datos_usuario
      if(!info){
        return false;
      } else if(info.id_roll === 1){
        return true
      }
      return false;
    },
  },
};
</script>