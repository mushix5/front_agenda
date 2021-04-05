import Vue from 'vue'
import Vuex from 'vuex'

import roles from './roles';
import tarea from './tarea';
import usuario from './usuario';

let jwt = require('jsonwebtoken');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cargando: false,
    datos_usuario: false
  },
  mutations: {
    startCargando(store) {
      store.cargando = true;
    },
    endCargando(store) {
      store.cargando = false;
    },
    cargandoUsuario(store, datos){
      store.datos_usuario =  datos;
    },
    cerrarSession(store){
      store.datos_usuario =  false;
    }
  },
  getters:{
    datosUsuario(store){
      return store.datos_usuario;
    }
  },
  actions: {
    encriptar(commit, dato) {
      var token = jwt.sign(dato, process.env.VUE_APP_SECRET_RES);
      return token;
    },
    desencriptar(commit, dato) {
      let token;
      try {
        token = jwt.verify(dato, process.env.VUE_APP_SECRET_RES);
        console.log('error: ', error)
        token = false
      } catch (error) {
        return token;
      }
    },
  },
  modules: {
    roles,
    tarea,
    usuario
  }
})