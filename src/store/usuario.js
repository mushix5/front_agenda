const store = {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async iniciarSesion({dispatch, commit}, datos){
            let result = false;
            let datos_usuario = false;
            try {
                let parametros={datos: await dispatch("encriptar",datos, {root: true})};
                result = await this._vm.$http.post(`login`,parametros,{});
                datos_usuario = await dispatch("desencriptar",result.data.resultado, {root: true});
            } catch (error) {
                console.log(error)
            } finally{
                commit("cargandoUsuario",datos_usuario,{root: true});
                return datos_usuario ? datos_usuario.login : datos_usuario;
            }
        },
        async cerrarSesion(){

        },
        async obtenerUsuarios({ rootState }){
            let datos_usuario = rootState.datos_usuario;
            if(datos_usuario.id_roll != 1){
                return [];
            }
            let result = [];
            try {
                result = await this._vm.$http.get(`usuarios`);
            } catch (error) {
                console.log(error)
            } finally{
                return result.data.resultado;
            }
        },
        async cambiarStatus({ rootState }, datos){
            let result = {
                mensaje: "",
                estatus: false
            };
            let datos_usuario = rootState.datos_usuario;
            if(datos_usuario.id_usuario === datos.id_usuario){
                result.mensaje = "No es posible cambiar el estatus de tu propio usuario";
                return result;
            }
            if(datos.id_roll === 1){
                result.mensaje = "No es posible cambiar el estatus de un usuario administrador";
                return result;
            }
            try {
                await this._vm.$http.put(`usuario/${datos.id_usuario}`);
                result.estatus=true;
                return result;
            } catch (error) {
                console.log(error);
                result.mensaje = "No se pudo realizar el cambio";
                return result;
            }
        },
        async registrarUsuario({dispatch}, datos){
            let result = [];
            let param = {datos: await dispatch("encriptar",datos, {root: true})};
            try {
                result = await this._vm.$http.post(`usuario/registrar`, param,{});
                if(result.status === 200){
                    return {mensaje: result.data.mensaje, estatus: false};
                }
                return {mensaje: result.data.mensaje, estatus: true};
            } catch (error) {
                console.log("Error: ",error)
                return {mensaje: error.message, estatus: false};
            }
        }
    }
  }
  export default store;