<script setup lang="ts">

// 1. 定义接口类型
interface TabItem {
  label: string
  path: string
}

// 2. 显式标注数组类型
const tabs: TabItem[] = [
  { label: '用户协议', path: '/docs/useragreement' },
  { label: '隐私保护', path: '/docs/privacypolicy' },
]


</script>

<template>
    <div>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>