<script setup lang="ts">
import type { Component } from "vue"
import { useRouter } from 'vue-router'

import { ChevronsUpDown, House } from "lucide-vue-next"
import { ref } from "vue"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const router = useRouter()

const props = defineProps<{
  teams: {
    name: string
    logo: Component
    plan: string
  }[]
}>()

function BackHome(){
    router.push('/')
}

const activeTeam = ref(props.teams[0])
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton
            @click="BackHome"
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <component :is="House" class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">
                PulseChat
              </span>
              <span class="truncate text-xs">
                epxins
              </span>
            </div>
            <House class="ml-auto" />
          </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
