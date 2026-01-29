<template>
    <div class="flex w-full justify-center items-center min-h-[calc(100vh-104px)] py-12">
    
    <!-- 主容器：垂直居中对齐 -->
    <div class="flex flex-col items-center text-center space-y-8 max-w-[600px] px-4">
      
      <!-- 1. Logo 区域 -->
      <div class="relative group">
        <img 
          class="w-[180px] md:w-[220px] transition-transform duration-500 group-hover:scale-105" 
          src="@/assets/logo.png" 
          alt="PulseChat Logo"
        >
      </div>

      <!-- 2. 品牌与标题 -->
      <div class="space-y-2">
        <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl text-zinc-900 dark:text-zinc-50">
          PulseChat
        </h1>
        <p class="text-xl text-blue-600 font-medium tracking-widest uppercase">
          智能 AI 对话助手
        </p>
      </div>

      <!-- 3. 公司/产品简介 -->
      <div class="max-w-[480px]">
        <p class="text-zinc-500 dark:text-zinc-400 leading-relaxed">
          PulseChat 致力于通过前沿的深度学习技术，为用户提供流畅、专业且富有情感的交互体验。
          无论是创意写作、代码编写还是日常闲谈，我们都能为您提供精准的智能支持，连接未来智慧的每一种可能。
        </p>
      </div>

      <!-- 4. 底部信息盒子 (对应草图中的矩形区域) -->
      <div class="w-full pt-8 mt-8 border-t border-zinc-100 dark:border-zinc-800">
        <div class="space-y-3">
          <!-- 版权信息 -->
          <p class="text-sm text-zinc-400">
            © 1996 - 2026 PulseChat. All Rights Reserved.
          </p>
          
          <!-- 详细信息标签组 -->
          <div class="flex flex-wrap justify-center items-center gap-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
            <span class="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
              当前版本 v1.2.5 Stable
            </span>
            <span class="flex items-center gap-1">
              <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              海豚工作室 (Dolphin Studio) 荣誉出品
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 针对品牌文字添加一点渐变效果，可选 */
h1 {
  background: linear-gradient(to bottom right, #000, #666);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark h1 {
  background: linear-gradient(to bottom right, #fff, #999);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>