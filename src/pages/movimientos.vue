<template>
    <div>
        <h6>Movimientos de producto</h6>
        <q-input v-model="search" ></q-input>
        <q-table
       title="Movimientos"
      :data="rows"
      row-key="name"
      :filter="search"

       >

       <template v-slot:body="props">
        <q-tr :props="props">
            <q-td key="id" :props="props">
                {{ props.row.id }}
            </q-td>
            <q-td key="created_at" :props="props">
                {{ props.row.created_at }}
            </q-td>
            <q-td key="updated_at" :props="props">
                {{ props.row.updated_at }}
            </q-td>
            <q-td key="id_item" :props="props">
               <q-btn class="primary" @click="cargadetallesitem(props.row.id_item)"> Producto: {{ props.row.id_item }}</q-btn>
            </q-td>
            <q-td key="cant" :props="props">
                {{ props.row.cant }}
            </q-td>
            <q-td key="obs" :props="props">
                {{ props.row.obs }}
            </q-td>
            <q-td key="movimiento" :props="props">
                {{ props.row.movimiento }}
            </q-td>
            <q-td key="id_doc" :props="props">
                {{ props.row.id_doc }}
            </q-td>
            <q-td key="id_user" :props="props">
                {{ props.row.id_user }}

                <q-btn class="primary" @click="cargadetallesUsuario(props.row.id_user)"> User: {{ props.row.id_user }}</q-btn>
            </q-td>
        </q-tr>
       </template>


       </q-table>

       <q-dialog v-model="verItem" persistent transition-show="flip-down" transition-hide="flip-up">
        <q-card class="bg-primary text-white">
        <q-bar>
            <div class="text-h6">{{ this.itemSelect.nombre }}</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
            Precio: <b>{{ this.itemSelect.precio }}</b><br />
                Cantidad:<b>{{ this.itemSelect.cantidad }} </b><br />
                Medida:<b>{{ this.itemSelect.medida }}</b> <br />
                Descripción:<b>{{ this.itemSelect.desc }} </b><br />
                Categoria:<b>{{ this.itemSelect.categoria }}</b> <br />
                Area:<b>{{ this.itemSelect.area }} </b><br />
                Status:<b>{{ this.itemSelect.status }}</b> <br />
                Codigo:<b>{{ this.itemSelect.codigo }} </b><br />
        </q-card-section>
        </q-card>
       </q-dialog>




       <q-dialog v-model="verUser" persistent transition-show="flip-down" transition-hide="flip-up">
        <q-card class="bg-primary text-white">
        <q-bar>
            <div class="text-h6">Detalles de usuario</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
           Nombre: <b>{{ this.userSelect.name }}</b><br />
                Correo:<b>{{ this.userSelect.email }} </b><br />
              
        </q-card-section>
        </q-card>
       </q-dialog>

        </div>
</template>
<script>
    export default {
        data(){
            return {
                verItem:false,
                search:"",  
                itemSelect:{},
                rows:[],
                userSelect:{},
                verUser:false
            }
        },
        methods:{
            cargaMovimientos(){
                var payload={

                }
                fetch('http://win-f5cf5kmknup:8000/api/movimientos',
                    {
                        method:'POST',
                        headers:{
                            'Content-type':'application/json'
                        },
                        body:JSON.stringify(payload)
                    }
                    
                )
                .then(res=>res.json())
                    .then((res)=>{
                        this.rows=res
                        
                    })
            },
            cargadetallesitem(p){
                let payload={
                    id:p
                }
                fetch('http://win-f5cf5kmknup:8000/api/detallesitem',
                    {
                        method:'POST',
                        headers:{
                            'Content-type':'application/json'
                        },
                        body:JSON.stringify(payload)
                    }
                    
                )
                .then(res=>res.json())
                    .then((res)=>{
                        this.itemSelect=res
                            this.verItem=true
                    })
            },
            cargadetallesUsuario(p){
                let payload={
                    id:p
                }
                fetch('http://win-f5cf5kmknup:8000/api/detallesUser',
                    {
                        method:'POST',
                        headers:{
                            'Content-type':'application/json'
                        },
                        body:JSON.stringify(payload)
                    }
                    
                )
                .then(res=>res.json())
                    .then((res)=>{
                        this.userSelect=res
                            this.verUser=true
                            console.log(this.userSelect)
                    })
            }
        },
        mounted(){
            this.cargaMovimientos()


            
        }
    }

    </script>