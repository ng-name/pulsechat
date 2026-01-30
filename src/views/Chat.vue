<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Watermark } from 'watermark-js-plus'
import Mes from '@/components/chat/ChatMes.vue'
import Int from '@/components/chat/ChatInt.vue'
import { useColorMode } from '@vueuse/core'

// 1. 定义引用和变量
const chatAreaRef = ref<HTMLElement | null>(null)
let wm: Watermark | null = null

// 1. 获取当前主题状态 (light, dark, or auto)
const mode = useColorMode()

// 2. 封装一个初始化函数
const initWatermark = () => {
  if (!chatAreaRef.value) return
  
  // 如果已有实例，先销毁
  if (wm) {
    wm.destroy()
  }

  // 根据当前主题决定颜色
  // 暗黑模式用纯白(低透明度)，亮色模式用纯黑(低透明度)
  const isDark = mode.value === 'dark'
  
  wm = new Watermark({
    content: 'PulseChat - epxins',
    width: 300,
    height: 200,
    fontSize: '14px',
    // 关键：动态颜色设置
    fontColor: isDark ? '#ffffff' : '#000000', 
    globalAlpha: isDark ? 0.06 : 0.06, // 暗色模式下透明度可以再调低一点
    rotate: -22,
    // parent: chatAreaRef.value,
    // monitor: true,
    zIndex: 1,
  })

  wm.create()
}

// 3. 监听主题变化，变化时重绘水印
watch(mode, () => {
  // 稍微延迟一下，确保 DOM 样式已更新
  setTimeout(initWatermark, 50)
})
onMounted(() => {
  initWatermark()
})

onBeforeUnmount(() => {
  if (wm) wm.destroy()
})
</script>

<template>
    <div ref="chatAreaRef" class="flex w-full flex-1 min-h-[calc(100vh-104px)] relative">
        <Mes/>
        <Int/>
    </div>
</template>