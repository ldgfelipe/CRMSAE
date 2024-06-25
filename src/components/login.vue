<template>
    
    <q-card  dark bordered class="bg-grey-9 my-card" >
        <q-card-section class="blue white--text"> 
            <b>Login</b>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section class="blue white--text text-center"> 
            <b>Codigo usuario</b><br />
            <q-input  outlined v-model="code" label="Ingrese el codigo" style="background: white; color:white;" class=" text-center" /><br />
            <q-btn color="white" text-color="black" label="Entrar" @click="ValidarSesion()"/>
        </q-card-section>
    </q-card>

</template>
<script>
import { LocalStorage, SessionStorage } from 'quasar'
export default {
    data() {
        return {
            code:""
        }
    },
    methods:{
    ValidarSesion(){
        var payload={
            code:this.code
            }

        fetch('http://win-f5cf5kmknup:8000/api/login',{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
      
            },
            body:JSON.stringify(payload)
        })
        .then(res=>res.json())
        .then((res)=>{
           
                console.log(res.res)
            SessionStorage.set('id_user', res.res.id)
            SessionStorage.set('session_email', res.res.email)
            SessionStorage.set('codigo', res.res.codelogin)
            SessionStorage.set('permiso', res.res.permisos)
            SessionStorage.set('area', res.res.area)
             
            this.$store.commit('module/updatelogin',true)
            this.$store.commit('module/datoncuenta',res.res)
        })
    }
}
}
</script>
<style  scoped>
.my-card{
  width:100%;
  max-width:250px;
  background: white;
}
</style>