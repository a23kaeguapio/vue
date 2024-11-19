<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <v-app-bar title="Cercador Pel·lícules"></v-app-bar>

      <v-navigation-drawer class="h-800">
        <v-list>
          <v-list-item title="Navigation drawer"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="d-flex align-center justify-center h-800">
        <v-container>
          <v-row  >
            <v-col cols="12" class="d-inline-flex align-center mt-5 mp-5">
              <v-text-field
                v-model="Cercador"
                label="Títol a Cercar"
              ></v-text-field>
              <v-btn class="ma-5" @click="fetchPelis">CERCA PEL·LÍCULA</v-btn>
            </v-col>
          </v-row>

          <v-row v-if="pelis && pelis.length">
            <v-col v-for="(peli, index) in pelis" :key="index" cols="12" md="4">
              <v-card>
                <v-img
                  :src="peli.Poster"
                  height="300px"
                  alt="Poster de la película"
                ></v-img>
                <v-card-title>{{ peli.Title }}</v-card-title>
                <v-card-subtitle>{{ peli.Year }}</v-card-subtitle>
                <v-card-actions>

                  <v-dialog max-width="500">
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-btn
                        @click="verDetalles(peli.imdbID)"
                        v-bind="activatorProps"
                        text="MÉS INFO"
                        variant="flat"
                      ></v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                      <v-card title="Informació pel·lícula">
                        <v-card-title>{{ detalles.Title }}</v-card-title>
                        <v-list-item-subtitle  class="mx-5">Any: {{ detalles.Year }}</v-list-item-subtitle>
                        <v-list-item-subtitle class="mx-5">Classificat: {{ detalles.Rated }}</v-list-item-subtitle>
                        <v-list-item-subtitle class="mx-5">Realitzat: {{ detalles.Released }}</v-list-item-subtitle> 
                        <v-list-item-subtitle class="mx-5 ">Trama: {{ detalles.Plot }}</v-list-item-subtitle> 


                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            text="Cerrar"
                            @click="isActive.value = false"
                          ></v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>

                  </v-dialog>

                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { getPelis, getPelisById } from "@/services/communicationManager";
import { ref, onMounted } from "vue";

const pelis = ref([]);
const Cercador = ref("");
const detalles = ref({});

const fetchPelis = async () => {
  if (!Cercador.value) return;
  try {
    const data = await getPelis(Cercador.value);
    console.log(data);
    pelis.value = data.Search;
  } catch (error) {
    console.error("Error al obtener las películas", error);
  }
};

const verDetalles = async (imdbID) => {
  try {
    const data = await getPelisById(imdbID);
    detalles.value = data;
    console.log("Detalles de la pel·lícula", detalles.value);
  } catch (error) {
    console.error("Error al obtener los detalles", error);
  }
};

onMounted(() => {
  fetchPelis();
});
</script>
