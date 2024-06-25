<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn  v-if="this.$store.state.module.is_login"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
         
        </q-toolbar-title>

        <div>ERPSAECSA v{{ versioerp }} area:{{ area }} | permiso {{ permiso }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="this.$store.state.module.is_login "
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list >
        <q-item-label
          header
          class="text-grey-8"
        >
        Enlaces
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          v-show="link.permiso===permiso || link.permiso === 0  || permiso === 1 "
          v-if="link.area === area || link.area===0"
          :key="link.title"
          v-bind="link" 
      
        />
      </q-list>
    </q-drawer>

    <q-page-container>
     <div class="q-pa-md row items-start q-gutter-md">
      <Login v-if="!this.$store.state.module.is_login"></Login>
     </div>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage, SessionStorage } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'
import Login from 'components/login.vue'
const linksData = [
  {
    title: 'Inicio',
    caption: 'dashboard',
    icon: 'home',
    link: '#/',
    area: 0,
    permiso: 2
  },
  {
    title: 'Almacen',
    caption: 'Inventarios',
    icon: 'inventory',
    link: '#/almacen',
    area: 2,
    permiso: 0
  },
  {
    title: 'Compras',
    caption: 'Proveedores',
    icon: 'shopping_cart',
    link: '#/compras',
     area: 1,
     permiso: 0
  },
  {
    title: 'Usuarios',
    caption: 'adminuser',
    icon: 'person',
    link: '#/usuarios',
    area:0,
    permiso: 2
  },
  {
    title: 'Config',
    caption: 'Configuración',
    icon: 'settings',
    link: '#/config',
    area:0,
    permiso: 2
  },
  {
    title: 'Movimientos',
    caption: 'movimientos',
    icon: 'logout',
    link: '#/movimientos',
    area:0,
    permiso: 0
  },
  {
    title: 'Salir',
    caption: 'logout',
    icon: 'logout',
    link: '#/logout',
    area:0,
    permiso: 0
  },
]

export default {
  name: 'MainLayout',
  components: {
    EssentialLink,
    Login
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      versioerp:"0.01.01",
      area:0,
      permiso:0
    }
  },
  updated(){
    this.area=SessionStorage.getItem('area')
    this.permiso=SessionStorage.getItem('permiso')

  },
  created(){
    this.area=SessionStorage.getItem('area')
    this.permiso=SessionStorage.getItem('permiso')
    var value = SessionStorage.getItem('session_email')
    if(value){
      this.$store.commit('module/updatelogin',true)
    }else{
      this.$store.commit('module/updatelogin',false)
    }
  
   
    console.log("area selected "+this.area)
  }


}
</script>
