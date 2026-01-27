<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Vue3Lottie } from 'vue3-lottie'
import ChatAnimation from '@/assets/animations/businessteam.json'
import { MessageSquare, HelpCircle, Sparkles } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <!-- 容器：最小高度屏，居中显示 -->
  <div class="relative flex flex-col items-center justify-center min-h-[calc(100vh-104px)] px-4 pt-5 pb-12 overflow-hidden">
    
    <!-- 背景装饰 (可选：增加一点 AI 科技感) -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>

    <!-- 1. Lottie 动画区域 -->
    <div class="transition-transform hover:scale-105 duration-500">
      <Vue3Lottie 
        :animationData="ChatAnimation" 
        :height="300" 
        :width="300" 
        :loop="true"
        :autoPlay="true"
      />
    </div>

    <!-- 2. 大标题 (Hero Title) -->
    <div class="text-center max-w-3xl space-y-6">
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-3xl">
         <span class="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">PulseChat AI</span> 
        <br />
        开启 灵感对话
      </h1>

      <!-- 3. 副标题/简介 (Subheading) -->
      <p class="text-xl md:text-1xl text-muted-foreground font-medium">
        你的全能智能助理
      </p>
      
      <!-- 4. 详细描述 (Description) -->
      <p class="max-w-[42rem] mx-auto leading-normal text-muted-foreground leading-8">
        基于先进大语言模型构建，支持实时对话、文案创作、代码生成。
        让 PulseChat 成为你工作与生活的智能核心，随时随地激发无限创意。
      </p>

      <!-- 5. 按钮组 (CTA Buttons) -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
        <Button class="h-12 px-8 text-sm gap-2" @click="router.push('/chat')">
          <MessageSquare class="w-5 h-5" />
          开始聊天
        </Button>
        
        <Button variant="outline" class="h-12 px-8 text-sm gap-2">
          <HelpCircle class="w-5 h-5" />
          使用帮助
        </Button>
      </div>
    </div>

    <!-- 6. 底部特性微标签 (Optional) -->
    <div class="mt-16 flex items-center gap-6 text-sm text-muted-foreground font-medium">
      <div class="flex items-center gap-1">
        <Sparkles class="w-4 h-4 text-primary" />
        深度学习驱动
      </div>
      <div class="flex items-center gap-1">
        <Sparkles class="w-4 h-4 text-primary" />
        实时快速响应
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 如果需要特殊的字体微调可以写在这里 */
</style>