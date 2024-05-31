<script setup lang="ts">
import { markRaw, watch } from "vue";
import sidebarItems from "./sidebarItems";

const sidebarMenu = markRaw(sidebarItems);
const router = useRouter();
const storage = useAuthStore();
var nome = storage.nome;

async function deslogar() {
  if (confirm("Deseja realmente sair?")) {
    try {
      storage.id = null;
      storage.token = null;
      storage.nome = null;
      router.push('/login-sistema')
    } catch (error) {
      console.log(error);
    }
  } else {
    return;
  }
}

const state = reactive({
  nome: "",
});
onMounted(() => {
  state.nome = nome;
});
</script>

<template>

  <perfect-scrollbar class="scrollnavbar">
    <div class="profile">
      <div class="profile-pic py-7 px-3">
        <v-avatar size="45">
          <!-- <img src="/images/profile/user2.jpg" width="50" alt="Julia" /> -->
        </v-avatar>
      </div>
      <div class="profile-name d-flex align-center px-3">
        <h5 class="text-surface font-weight-medium">{{ state.nome }}</h5>
        <div class="ml-auto profile-logout">
          <v-btn variant="text" icon rounded="md" color="surface" @click="deslogar()">
            <PowerIcon size="22" />
          </v-btn>
        </div>
      </div>
    </div>
    <v-list class="py-5 px-4 bg-muted" density="compact">
      <!---Menu Loop -->
      <template v-for="(item, i) in sidebarMenu">
        <!---Item Sub Header -->
        <LayoutSidebarNavGroup :item="item" v-if="item.header" :key="item.title" />
        <!---Single Item-->
        <LayoutSidebarNavItem :item="item" v-else class="leftPadding" />
        <!---End Single Item-->
      </template>
    </v-list>

    <div>
      <LayoutSidebarBuynow />
    </div>

  </perfect-scrollbar>

</template>
