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
      <main class="flex-1 overflow-x-hidden"> <!-- 防止动画时出现横向滚动条 -->
        <router-view v-slot="{ Component }">
          <!-- mode="out-in" 确保旧组件先消失，新组件再进入 -->
          <transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      
      <!-- 使用抽离后的 Footer -->
      <SiteFooter />
    </SidebarInset>
  </SidebarProvider>
</template>


<style scoped>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: all 0.3s ease-out;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px); /* 从下方 10px 处浮现 */
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px); /* 向上方消失 */
}
</style>