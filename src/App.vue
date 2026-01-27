<script setup lang="ts">
import { useDark } from '@vueuse/core'
import AppSidebar from "@/components/AppSidebar.vue"
import SiteHeader from "@/components/SiteHeader.vue"
import SiteFooter from "@/components/SiteFooter.vue"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const isDark = useDark()
</script>

<template>
  <!-- :theme 处理整个 Sidebar 的深浅色状态 -->
  <SidebarProvider :theme="isDark ? 'dark' : 'light'">
    <AppSidebar />
    
    <SidebarInset class="flex flex-col min-h-screen">
      <!-- 使用抽离后的 Header -->
      <SiteHeader />

      <!-- 主内容区：使用 flex-1 撑开空间，确保 footer 压到底部 -->
      <main class="flex-1">
        <router-view />
      </main>
      
      <!-- 使用抽离后的 Footer -->
      <SiteFooter />
    </SidebarInset>
  </SidebarProvider>
</template>