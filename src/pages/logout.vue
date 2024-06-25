<template>
    <div>
        Cerrando sesión
    </div>
</template>
<script>
import { LocalStorage, SessionStorage } from 'quasar'
export default {
    data(){
        return {

        }
    },
    created(){
        this.cerrandoSesion()
    },
    methods:{
        cerrandoSesion(){
            console.log('finalizando sesion')
            //// finaliza todo cambio de sesionstorage
            SessionStorage.remove('session_email')
            SessionStorage.remove('codigo')
            SessionStorage.remove('permiso')
            SessionStorage.remove('area')
            this.$store.commit('module/updatelogin',false)
            this.$store.commit('module/datoncuenta',{})

            this.$router.push('/')
        }
    }
}
</script>