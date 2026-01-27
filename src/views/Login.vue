<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils' // shadcn 默认提供的类合并工具

// 1. 定义接口类型
interface TabItem {
  label: string
  path: string
}

const route = useRoute()
const router = useRouter()

// 2. 显式标注数组类型
const tabs: TabItem[] = [
  { label: '登录', path: '/login/signin' },
  { label: '注册', path: '/login/signup' },
  { label: '找回密码', path: '/login/forgot' },
]

// 3. 为函数参数添加 string 类型
const go = (path: string): void => {
  if (route.path !== path) {
    router.push(path)
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-104px)] flex items-center justify-center p-2">
    <div class="w-full max-w-md space-y-6">
      <!-- 顶部 Logo 或 标题区域 -->
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">PulseChat</h1>
        <p class="text-sm text-muted-foreground">欢迎使用 AI 智能助理</p>
      </div>
        <div class="px-12">
            <div class="flex p-1 mb-6 bg-muted rounded-lg">
                <button
                v-for="tab in tabs"
                :key="tab.path"
                @click="go(tab.path)"
                :class="cn(
                    'flex-1 text-sm font-medium py-2 rounded-md transition-all',
                    route.path === tab.path 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                )"
                >
                {{ tab.label }}
                </button>
            </div>
        </div>


        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
        </router-view>
        
    </div>
  </div>
</template>

<style scoped>
/* 定义切换时的淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>