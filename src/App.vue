<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
import { useDark } from '@vueuse/core'
import AppSidebar from "@/components/AppSidebar.vue"
import SiteHeader from "@/components/SiteHeader.vue"
import SiteFooter from "@/components/SiteFooter.vue"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const isDark = useDark()
</script>

<template>
  <SidebarProvider :theme="isDark ? 'dark' : 'light'">
    <AppSidebar />
    <SidebarInset class="flex flex-col min-h-screen">
      <SiteHeader />

      <main class="flex-1 overflow-x-hidden">
        <RouterView/>
      </main>
      
      <SiteFooter />
    </SidebarInset>
  </SidebarProvider>
  <Toaster position="top-right"/>
</template>


<style scoped>
</style>