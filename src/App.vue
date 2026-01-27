<script setup lang="ts">
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
</script>

<template>
  <SidebarProvider>
           <div class="m-10 p-10 bg-purple-600 text-white text-3xl font-bold underline rounded-xl shadow-2xl">
        Tailwind 测试 123
      </div>
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
         Tailwind head
      </header>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped>
</style>
