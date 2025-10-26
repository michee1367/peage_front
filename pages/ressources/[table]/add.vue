<script setup>
import DynamicForm from "@/components/DynamicForm.vue"
import axios from "axios";
const route = useRoute()
const { create, getAll } = useApi()
const table = route.params.table
const fields = ref({})
const rels = ref({})
const form = ref({})

const submit = async () => {
    //console.log(form.value)
    //return
  await create(table, form.value)
  navigateTo(`/ressources/${table}`)
}
onMounted(async () => {
  await load()
})
  const fetchRel =  async (table) => {
    return await getAll(table)
  }
  const load = async () => {
    
    let {data} = await axios.get("/api/models/all")
    let keyData = Object.keys(data)
    for (let j = 0; j < keyData.length; j++) {
        const key = keyData[j];
        if (key == table) {
          let values = data[key]?.fields??{}
          let relsValues = data[key]?.relations??{}
          let valuesFiltre = {}
          let relValues = {}

          Object.keys(values).forEach(
            keyValue => {
                if (keyValue != "id") {
                    valuesFiltre[keyValue] = values[keyValue]
                    
                }
            }
          )

          let relsKeys = Object.keys(relsValues)

          for (let i = 0; i < relsKeys.length; i++) {
            const relKey = relsKeys[i];
            if(valuesFiltre[relKey]) {
                relValues[relKey] = {
                    options:await fetchRel(relsValues[relKey]),
                    tableName:relsValues[relKey]
                }
            }
            
          }

          fields.value = valuesFiltre
          rels.value = relValues

        }
        
    }
      
  }
</script>

<template>

    <div class="page-wrapper">
        <!-- Page header -->
        <TopNavbar />
        <div class="page-header d-print-none">
        <div class="container-xl">
            <div class="row g-2 align-items-center">
            <div class="col">
                
                <h1 class="text-2xl font-bold mb-4 capitalize">Ajouter un(e)  {{ table }}</h1>
                <NuxtLink :to="`/ressources/${table}`" class="btn btn-sm btn-primary px-5">Retour liste</NuxtLink>
            </div>
            </div>
        </div>
        </div>
        <div class="page-body">
                <div class="container-xl">
                  <div class="row row-cards">
                      <div class="col-md-6 col-sm-12">
                      <div class="card" style="height: 40rem">
                          <div class="card-body card-body-scrollable card-body-scrollable-shadow">
                          <div class="divide-y">
                              <div>
                                <DynamicForm :fields="fields" :rels="rels" v-model="form" />
                                <button class="btn btn-primary rounded" @click="submit">Enregistrer</button>
                            </div>
                        </div>
                          </div>
                      </div>
                      </div>
      
                  </div>
                </div>
        </div>
    </div>
</template>