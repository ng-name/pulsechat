<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button" // 确保导入了 Button
import { Sun, Moon } from 'lucide-vue-next'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const isDark = useDark()
const toggleDark = useToggle(isDark)

const route = useRoute()
const router = useRouter()

// 自动生成面包屑数据
const breadcrumbs = computed(() => {
  // route.matched 包含了当前路由的所有嵌套层级
  return route.matched
    .filter(item => item.meta && item.meta.title) // 只显示有标题的路由
    .map(item => ({
      title: item.meta.title as string,
      path: item.path,
      // 判断是否是最后一个（最后一级显示为 Page，不可点击）
      isLast: route.path === item.path || route.matched[route.matched.length - 1] === item
    }))
})

// 处理点击跳转
const navigate = (path: string) => {
  router.push(path)
}

</script>

<template>
  <header class="flex sticky top-0 z-50 w-full justify-between bg-background/80 backdrop-blur-md items-center h-16 shrink-0 pr-1">
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" />
      <Separator
        orientation="vertical"
        class="mr-1 data-[orientation=vertical]:h-4"
      />
       <Breadcrumb>
        <BreadcrumbList>
          <template v-for="(bc, index) in breadcrumbs" :key="bc.path">
            <BreadcrumbItem>
              <!-- 如果不是最后一级，显示为可点击的 Link -->
              <BreadcrumbLink 
                v-if="!bc.isLast" 
                href="#" 
                @click.prevent="navigate(bc.path)"
              >
                {{ bc.title }}
              </BreadcrumbLink>
              
              <!-- 如果是最后一级，显示为不可点击的 Page -->
              <BreadcrumbPage v-else>
                {{ bc.title }}
              </BreadcrumbPage>
            </BreadcrumbItem>

            <!-- 只要不是最后一个，就显示分隔符 -->
            <BreadcrumbSeparator v-if="!bc.isLast" />
          </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <Button 
      variant="ghost" 
      size="icon" 
      @click="toggleDark()"
      class="relative w-9 h-9 flex items-center justify-center mr-2"
    >
      <Sun 
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" 
      />
      <Moon 
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" 
      />
      <span class="sr-only">切换主题</span>
    </Button>
  </header>
</template>