<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
useHead({
    title: "MASTER - Admin",
    link: [
        {
            href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
            rel: "stylesheet",
            integrity: "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
            crossorigin: "anonymous"
        }],
    script: [
        {
            src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
            integrity: "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL",
            crossorigin: "anonymous"
        }
    ],
});
const drawer = ref(undefined || true);
const innerW = window.innerWidth;
const { mdAndUp, mdAndDown } = useDisplay();
onMounted(() => {
    if (innerW < 950) {
        drawer.value = !drawer.value;
    }
});
</script>
<template>
    <div>
        <v-app>
            <!-- ---------------------------------------------- -->
            <!---Header -->
            <!-- ---------------------------------------------- -->
            <v-app-bar elevation="0" color="primary">
                <div class="pe-5">
                    <div class="d-sm-flex d-none">
                        <LayoutLogo />
                    </div>
                    <div class="pr-2 pt-2 d-sm-none d-flex">
                        <LayoutLogoIcon />
                    </div>
                </div>
                <v-app-bar-nav-icon class="" @click="drawer = !drawer" />
                <v-spacer />
                <LayoutHeader />
            </v-app-bar>
            <v-main>
                <!-- ---------------------------------------------- -->
                <!---Sidebar -->
                <!-- ---------------------------------------------- -->
                <v-navigation-drawer left :permanent="mdAndUp" class="leftSidebar" elevation="10" app :temporary="mdAndDown"
                    v-model="drawer" expand-on-hover>
                    <LayoutSidebar />
                </v-navigation-drawer>
                <v-container fluid class="page-wrapper">
                    <div class="maxWidth">
                        <NuxtPage />

                    </div>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

function useHead(arg0: { title: string; link: { href: string; rel: string; }[]; script: { src: string; integrity: string; crossorigin: string; }[]; }) {
  throw new Error("Function not implemented.");
}

function useHead(arg0: { title: string; link: { href: string; rel: string; }[]; script: { src: string; integrity: string; crossorigin: string; }[]; }) {
  throw new Error("Function not implemented.");
}
<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

body {
    background-color: #000;
}</style>