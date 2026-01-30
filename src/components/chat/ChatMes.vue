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
          class="flex w-full mb-6" 
          :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <!-- ================= 用户消息 ================= -->
          <template v-if="msg.role === 'user'">
            <div class="max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed bg-slate-500 dark:bg-slate-800 text-slate-50 rounded-tr-none shadow-sm">
              <div class="whitespace-pre-wrap text-base">
                {{ msg.content }}
              </div>
            </div>
          </template>

          <!-- ================= AI 消息 ================= -->
          <!-- ================= AI 消息 ================= -->
          <template v-else>
            <div class="flex flex-col items-start max-w-[95%] w-full">
              <!-- 角色标识 -->
              <div class="flex items-center gap-2 mb-1.5 ml-1">
                <div class="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white">P</div>
                <span class="text-xs font-bold opacity-60 uppercase tracking-wider">PulseChat AI</span>
              </div>

              <!-- AI 响应容器 -->
              <div class="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 shadow-sm rounded-tl-none">
                
                <!-- 1. 思考中/生成中状态 (仅在 loading 时显示) -->
                <div class="mb-3">
                  <div class="flex flex-col gap-2">
                    <!-- 类似图片中的 Thoughts 框 -->
                    <div class="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50/50 dark:bg-slate-800/30">
                      <div class="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-slate-700">
                        <div class="flex items-center gap-2 text-blue-500">
                          <!-- 闪烁的小星星图标 -->
                          <svg class="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span class="text-xs font-medium">Thoughts</span>
                        </div>
                        <span class="text-[10px] text-slate-400">正在思考并生成响应...</span>
                      </div>
                      <div class="px-3 py-2">
                        <div class="flex items-center gap-2">
                          <div class="flex gap-1">
                            <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                            <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                            <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
                          </div>
                          <span class="text-sm text-slate-500 dark:text-slate-400">内容生成中...</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- 实时计时器 (位于下方) -->
                    <div class="flex items-center gap-1.5 ml-1">
                      <div class="w-1 h-1 bg-slate-300 rounded-full"></div>
                      <span class="text-[11px] text-slate-400 font-mono tracking-tighter">
                        {{ msg.elapsedTime || '0.0' }}s
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 2. 正式内容区域 -->
                <div v-if="msg.content" class="whitespace-pre-wrap text-base mb-3 transition-all duration-300">
                  {{ msg.content }}
                </div>

                <!-- 3. 免责声明 (生成完成后显示) -->
                <div v-if="msg.status !== 'loading'" class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                  <span class="text-[11px] text-slate-400 italic select-none">以上内容由 AI 生成，仅供参考。</span>
                </div>
              </div>
            </div>
          </template>
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