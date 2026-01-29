<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ArrowUpIcon, Loader2 } from 'lucide-vue-next'

const message = ref('')
const isLoading = ref(false)
const textareaRef = ref<any>(null)
const shouldScroll = ref(false)

// 配置参数
const MIN_HEIGHT = 72  // 默认 & 最小高度
const MAX_LINES = 5
const LINE_HEIGHT = 22 // 根据实际字体大小调整，通常为 20-24px
const PADDING = 16     // 上下 padding 之和 (py-2 = 8px*2)
const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT + PADDING 

const adjustHeight = () => {
  const el = textareaRef.value?.$el as HTMLTextAreaElement
  if (!el) return

  // 1. 重置高度为最小值，以便重新计算最新的 scrollHeight
  el.style.height = `${MIN_HEIGHT}px`
  
  const contentHeight = el.scrollHeight

  // 2. 只有当内容高度超过 5 行 (MAX_HEIGHT) 时才固定高度并显示滚动条
  if (contentHeight > MAX_HEIGHT) {
    el.style.height = `${MAX_HEIGHT}px`
    shouldScroll.value = true
  } else {
    // 3. 否则跟随内容高度，但由于上面重置了 MIN_HEIGHT，
    // 如果内容很少，scrollHeight 也会返回至少接近 MIN_HEIGHT 的值
    el.style.height = `${Math.max(contentHeight, MIN_HEIGHT)}px`
    shouldScroll.value = false
  }
}

watch(message, () => {
  nextTick(adjustHeight)
})

onMounted(() => {
  adjustHeight()
})

const handleSend = async () => {
  if (!message.value.trim() || isLoading.value) return
  isLoading.value = true
  
  // 模拟发送
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  message.value = ''
  isLoading.value = false
  nextTick(adjustHeight) // 重置高度
}
</script>

<template>
    <div class="fixed h-0 bottom-10 left-[255px] right-0">

        <div class="w-[600px] flex items-end gap-3 absolute bottom-2 left-[50%] ml-[-300px] rounded-2xl">
             <Textarea 
                name="txtint"
                ref="textareaRef"
                v-model="message"
                class="bg-background/80 backdrop-blur-md"
                placeholder="Type your message here. Press Enter to send." 
                :class="[
                    'min-h-[72px] resize-none py-2 transition-[height] duration-100',
                    shouldScroll ? 'overflow-y-auto' : 'overflow-hidden'
                ]"
                @input="adjustHeight"
                />
                
            <Button 
            variant="outline" 
            size="icon" 
            class="flex-shrink-0 bg-background/80 backdrop-blur-md"
            :disabled="isLoading || !message.trim()"
            @click="handleSend"
            >
            <!-- 发送中显示转圈圈 -->
                <Loader2 v-if="isLoading" class="h-4 w-4 animate-spin" />
                <ArrowUpIcon v-else class="h-4 w-4" />
            </Button>
        </div>

    </div>
</template>

<style scoped>
/* 确保滚动条在达到 max-height 后才出现 */
.textarea {
  scrollbar-width: thin;
}
</style>