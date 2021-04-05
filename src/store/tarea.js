const axios = require('axios');

const store = {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async obtenerTareas({rootState}){
            let datos_usuario = rootState.datos_usuario;
            let result = [];
            try {
                result = await this._vm.$http.get(`tareas/${datos_usuario.id_usuario}`);
                return result.data.resultado;
            } catch (error) {
                console.log(error);
                return result;
            }
        },
        async crearTarea({rootState}, dato){
            let result = [];
            let tarea = dato;
            tarea.id_usuario = rootState.datos_usuario.id_usuario;
            try {
                result = await this._vm.$http.post(`tarea`, tarea,{});
                return result.data;
            } catch (error) {
                console.log(error);
                return result;
            }
        },
        async eliminarTarea(commit, id_registro){
            let result = [];
            try {
                result = await this._vm.$http.put(`tarea/${id_registro}`);
                return result.data.resultado;
            } catch (error) {
                console.log(error);
                return result;
            }
        }
    }
  }
  export default store;