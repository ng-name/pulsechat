<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

// 定义数据结构
interface Message {
  role: 'user' | 'assistant'
  content: string
  id?: string
}

interface ChatGroup {
  id: string
  title: string
  conversation_id: string
  request_id: string
  messages: Message[]
}

// 模拟数据源 (你可以通过 props 传递进来)
const chatHistoryGop = ref<ChatGroup[]>([
  {
    id: "group-1",
    title: "对话1",
    conversation_id: "conv-001",
    request_id: "req-001",
    messages: [
      { id: '1', role: 'user', content: '你好，请帮我分析一下这段代码。' },
      { id: '2', role: 'assistant', content: '没问题！请把代码发给我，我会为你详细解答。这是对应的红色框区域，通常用于显示 AI 的回复内容。' },
      { id: '3', role: 'user', content: '这是一个关于 Vue3 聊天界面的实现需求。' },
      { id: '4', role: 'assistant', content: '明白了。我们可以使用 Flexbox 布局来区分左右。用户消息靠右（蓝色），AI 消息靠左（红色）。' },
      { id: '3', role: 'user', content: '这是一个关于 Vue3 聊天界面的实现需求。' },
      { id: '4', role: 'assistant', content: '明白了。我们可以使用 Flexbox 布局来区分左右。用户消息靠右（蓝色），AI 消息靠左（红色）。' },
      { id: '3', role: 'user', content: '这是一个关于 Vue3 聊天界面的实现需求。' },
      { id: '4', role: 'assistant', content: '明白了。我们可以使用 Flexbox 布局来区分左右。用户消息靠右（蓝色），AI 消息靠左（红色）。' },
      { id: '3', role: 'user', content: '这是一个关于 Vue3 聊天界面的实现需求。' },
      { id: '4', role: 'assistant', content: '明白了。我们可以使用 Flexbox 布局来区分左右。用户消息靠右（蓝色），AI 消息靠左（红色）。' },
      { id: '3', role: 'user', content: '这是一个关于 Vue3 聊天界面的实现需求。' },
      { id: '4', role: 'assistant', content: '明白了。我们可以使用 Flexbox 布局来区分左右。用户消息靠右（蓝色），AI 消息靠左（红色）。' },
      { id: '3', role: 'user', content: '这是一个关于 Vue3 聊天界面的实现需求。' },
      { id: '4', role: 'assistant', content: '明白了。我们可以使用 Flexbox 布局来区分左右。用户消息靠右（蓝色），AI 消息靠左（红色）。' },
      { id: '3', role: 'user', content: '这是一个关于 Vue3 聊天界面的实现需求。' },
      { id: '4', role: 'assistant', content: '明白了。我们可以使用 Flexbox 布局来区分左右。用户消息靠右（蓝色），AI 消息靠左（红色）。' },

    ]
  }
])

const scrollContainer = ref<HTMLElement | null>(null)

// 自动滚动到底部
const scrollToBottom = async () => {
  await nextTick()
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
  }
}

// 监听消息变化自动滚动
// watch(() => chatHistoryGop.value[0].messages.length, scrollToBottom)

onMounted(scrollToBottom)
</script>

<template>
  <!-- 聊天主容器 -->
  <div class="flex flex-col h-full w-full max-w-[800px] mx-auto overflow-hidden">
    
    <!-- 消息滚动区域 -->
    <div 
      ref="scrollContainer"
      class="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth"
    >
      <!-- 遍历当前对话组的消息 (示例取第一组) -->
      <template v-for="group in chatHistoryGop" :key="group.id">
        <div 
          v-for="(msg, index) in group.messages" 
          :key="index"
          class="flex w-full"
          :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <!-- 消息气泡 -->
          <div 
            class="max-w-[100%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
            :class="[
              msg.role === 'user' 
                ? 'bg-slate-500 dark:bg-slate-800 text-slate-50 rounded-tr-none shadow-sm' 
                : 'text-current'
            ]"
          >
            <!-- 角色标识 (可选) -->
            <div class="text-[10px] uppercase font-bold mb-1 opacity-50">
              {{ msg.role }}
            </div>
            
            <!-- 消息内容 -->
            <div class="whitespace-pre-wrap text-base">
              {{ msg.content }}
            </div>
          </div>
        </div>
      </template>
      
      <!-- 底部占位，防止被输入框遮挡 -->
      <div class="h-20"></div>
    </div>
  </div>
</template>

<style scoped>
/* 优化滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>