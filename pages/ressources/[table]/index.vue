<script setup>
import { useRoute } from "vue-router"
const route = useRoute()
const table = route.params.table
const { getAll } = useApi()
const data = ref([])
const fields = ref([])
import axios from "axios";

definePageMeta({
    middleware: ['auth', "can-table"]
  })


onMounted(async () => {
  await load()
  data.value = await getAll(table)
})
  const load = async () => {
    
    let {data} = await axios.get("/api/models/all")
    Object.keys(data).forEach(
      (key) => {
        if (key == table) {
          fields.value = Object.keys(data[key]?.fields??{})
          console.log("##########################")
          console.log(fields.value)
          console.log("##########################")
        }
      }
    ) 
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
                  
                    <h1 class="text-2xl font-bold mb-4 capitalize">Liste des {{ table }}</h1>
                    <NuxtLink :to="`/ressources/${table}/add`" class="btn btn-sm btn-primary px-5">Ajouter</NuxtLink>
                </div>
              </div>
            </div>
          </div>

        <div class="page-body">
                <div class="container-xl">
                  <div class="row row-cards">
                      <div class="col-12">
                      <div class="card" style="height: 40rem">
                          <div class="card-body card-body-scrollable card-body-scrollable-shadow">
                          <div class="divide-y">
                              <div>
                                <div class="table-responsive">
                                    <table class="table table-vcenter card-table table-striped">
                                    <thead>
                                        <tr>
                                        <th v-for="key in fields" :key="key">{{ key }}</th>
                                        <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="row in data" :key="row.id" class="border-t">
                                        <td v-for="key in fields" :key="key">{{ row[key] }}</td>
                                        <td>
                                            <!--NuxtLink :to="`/${table}/${row.id}`">👁️</NuxtLink> |
                                            <NuxtLink :to="`/${table}/edit/${row.id}`">✏️</NuxtLink-->
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
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
