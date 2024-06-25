<template>
    <div>
        <q-input v-model="search" ></q-input>
       <q-table
       title="Items"
      :data="rows"
      :columns="columns"
      row-key="name"
      :filter="search"
      :pagination="initialPagination"
       >
       <template v-slot:body="props">
        <q-tr :props="props">
            <q-td key="nombre" :props="props">
                {{ props.row.nombre }}
            </q-td>
            <q-td key="cantidad" :props="props">
                {{ props.row.cantidad }}
            </q-td>
            <q-td key="btnaction" :props="props">
                <q-btn color="primary" label="Ver" @click="cargadatosdeproducto(props.row)" icon-right="send" />
            </q-td>
        </q-tr>
       </template>
       </q-table>


       <q-dialog v-model="veritem" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-primary text-white">
        <q-bar>
            <div class="text-h6">{{prodselect.nombre}}</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          
        </q-card-section>

        <q-card-section class="q-pt-none">
                Precio: <b>{{ prodselect.precio }}</b><br />
                Cantidad:<b>{{ prodselect.cantidad }} </b><br />
                Medida:<b>{{ prodselect.medida }}</b> <br />
                Descripción:<b>{{ prodselect.desc }} </b><br />
                Categoria:<b>{{ prodselect.categoria }}</b> <br />
                Area:<b>{{ prodselect.area }} </b><br />
                Status:<b>{{ prodselect.status }}</b> <br />
                Codigo:<b>{{ prodselect.codigo }} </b><br />

            <q-btn color="green" label="Entrada" @click="actionItem('add')" icon-right="add" />
            <q-btn color="red" label="Salida"  @click="actionItem('remove')" icon-right="remove" />

                <q-card v-if="add" class="card-add">
                    <q-card-section class="text-green">
                            <h5>Entrada de producto</h5>
                            <q-input
                             v-model="sendata.entrada.obs"
                                filled
                                type="textarea"
                                label="Observaciones de entrada"
                                />
                             <q-input  
                               v-model="sendata.entrada.cant"
                                type="number"
                                filled
                                label="Cantidad"
                                />
                                <q-input  
                                v-model="sendata.entrada.id_doc"
                                type="text"                                
                                filled
                                label="Folio Factura o documento"
                                />
                                <q-btn v-if="viewbtn" color="green" label="Guardar" @click="updateItem('entrada',prodselect.id)" />

                                <q-circular-progress  v-if="!viewbtn" 
      indeterminate
      size="75px"
      :thickness="0.6"
      color="lime"
      center-color="grey-8"
      class="q-ma-md"
    />
                    </q-card-section>
                </q-card>
                
                <q-card v-if="remove" class="card-remove">
                    <q-card-section class="text-red">
                        <h5>Salida de producto</h5>
                            <q-input
                                v-model="sendata.salida.obs"
                                filled
                                type="textarea"
                                label="Observaciones de salida"
                                />
                             <q-input  
                                v-model="sendata.salida.cant"
                                type="number"
                                filled
                                label="Cantidad"
                                />
                                <q-input  
                                v-model="sendata.salida.id_doc"
                                type="text"                                
                                filled
                                label="Folio Factura o documento"
                                />
                                <q-btn v-if="viewbtn" color="red" label="Guardar" @click="updateItem('salida',prodselect.id)" />
                                <q-circular-progress  v-if="!viewbtn" 
      indeterminate
      size="75px"
      :thickness="0.6"
      color="lime"
      center-color="grey-8"
      class="q-ma-md"
    />
                    </q-card-section>
                </q-card>
            </q-card-section>
        </q-card>
    </q-dialog>



    </div>
</template>
<script>
import { LocalStorage, SessionStorage } from 'quasar'
export default {
    data(){
        return { 
            viewbtn:true,
            sendata:{
                entrada:{
                    obs:"",
                    cant:0,
                    id_doc:""
                },
                salida:{
                    obs:"",
                    cant:0,
                    id_doc:""
                },
            },
            add:false,
            remove:false,   
            search:"",
            rows:[],
            columns:[
            {  
                 name:'nombre',
                label:'Nombre',
                field: 'nombre'
            },
            {  
                 name:'cantidad',
                label:'Cantidad',
                field: 'cantidad'

            },
            {
                name:'btnaction',
                label:'Accion',
                field:'btnaction'
            },
           
        ],
        initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 15
        // rowsNumber: xx if getting data from a server
      },
      veritem:false,
      prodselect:{}
        }
    },
    methods:{
        actionItem(p){
            switch(p){
                case 'add':
                    this.add=true
                    this.remove=false
                    break;
                case 'remove':
                this.add=false
                this.remove=true
                    break;
            }
        },
       async cargalista(){

           var payload={
            code:SessionStorage.getItem('codigo')
           }
       await fetch('http://win-f5cf5kmknup:8000/api/almacen',{
            method:"POST",
            headers: {
            "Content-Type": "application/json",
            },
            body:JSON.stringify(payload)
        })
        .then(res=>res.json())
        .then((res)=>{
                this.rows=res

        })
        },
        cargadatosdeproducto(p){
            this.veritem=true
            this.prodselect=p
        },
        updateItem(p,item){
this.viewbtn=false
           var payload={
            id_item:item,
            cant:this.sendata[p].cant,
            obs:this.sendata[p].obs,
            movimiento:p,
            id_doc:this.sendata[p].id_doc,
            id_user:SessionStorage.getItem('id_user')
           }

           fetch('http://win-f5cf5kmknup:8000/api/updateInventario',{
            method:"POST",
            headers: {
            "Content-Type": "application/json",
            },
            body:JSON.stringify(payload)
        })
        .then(res=>res.json())
        .then((res)=>{

     
            this.cargalista()
   
            this.sendata[p]={
                    obs:"",
                    cant:0,
                    id_doc:""
                }
                this.viewbtn=true
                this.veritem=false
        })


        }
    },
    created(){
        this.cargalista();
    }
}
</script>
