<template>
  <div class="page page-center">
      <div class="container container-tight py-4">
        <div class="text-center mb-4">
          
        </div>
        <div class="card card-md pb-5 mt-5" >
          <div class="card-body text-center py-4 p-sm-5">
            <img src="/static/illustrations/undraw_sign_in_e6hj.svg" height="120" class="mb-n2" alt="">
            <h1 class="mt-5">Bienvenu !</h1>
            <p class="text-warning" v-if="userIsVisitor">
              Votre demande de création de compte a été reçue. Veuillez contacter l’administrateur pour finaliser le processus et activer votre compte.
            </p>
          </div>
          <div class="hr-text hr-text-center hr-text-spaceless">Vos stats</div>
          <div class="card-body" v-if="!userIsVisitor">
            <a class="card card-link" href="#" @click.prevent="goToFeatures">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-auto">
                        <span class="avatar rounded">V</span>
                      </div>
                      <div class="col">
                        <div class="font-weight-medium">Fonctionnalités</div>
                      </div>
                    </div>
                  </div>
            </a>
          </div>
        </div>

        <div class="row align-items-center mt-3">
          <div class="col-4">
            <div class="progress d-none" >
              <div class="progress-bar" style="width: 25%" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" aria-label="25% Complete">
                <span class="visually-hidden">25% Complete</span>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="btn-list justify-content-end">
              <a href="/logout" class="btn btn-link link-secondary">Se deconnecter</a>
              
              <NuxtLink 
                  v-if="userIsAdmin"
                  :to="{name:'visits'}" 
                  class="btn btn-sm btn-primary px-5"
                  >
                  {{ "Adminitration" }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import Axios from "axios";
import TopNavbar from '~/components/TopNavbar.vue'
import { useUserConnectStore } from "@/stores/user";
import * as userManager from '@/tools/user';
const router = useRouter()
// ✅ Déclaration du middleware Nuxt 3
definePageMeta({
  middleware: ['auth']
})

const userStore = useUserConnectStore()
const countsVisits = ref(0)
const userIsAdmin = ref(false)
const userIsVisitor = ref(false)

const fetchVisits = async () => {
    try {
      //const { data } = await Axios.get("/api/models/records/visit/save?per_page=100")
      const { data } = await Axios.get("/api/visits?per_page=100")
      
      countsVisits.value = data.pagination?.total

    } catch (err) {
      console.error(err)
    }
  }

  const goToFeatures = () => {
    router.push("/ressources")
  }

// Charger les provinces au montage
onMounted(() => {
  let user = userStore.user
  userIsAdmin.value = userManager.is_admin(user.value)
  userIsVisitor.value = userManager.is_visitor(user.value)
  fetchVisits()
})
</script>


<style>

</style>
