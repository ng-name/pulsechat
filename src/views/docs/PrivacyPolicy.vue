<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 在 TS 中，这种引入方式需要 tsconfig.json 中开启 "esModuleInterop": true (默认通常是开启的)
import MarkdownIt from 'markdown-it'

const html = ref<string>('')

// 实例化，可以标注类型（可选，TS 会自动推导）
const md: MarkdownIt = new MarkdownIt({ 
  html: true, 
  linkify: true, 
  typographer: true 
})

onMounted(async () => {
  try {
    const res = await fetch('/content/legal/privacy.md')
    if (!res.ok) throw new Error('Failed to fetch markdown')
    const text = await res.text()
    html.value = md.render(text)
  } catch (error) {
    console.error('Markdown 加载失败:', error)
  }
})
</script>

<template>
  <div class="min-h-screen pt-20 pb-12">
    <div class="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">
      <!-- 
        注意：你使用了 prose 类名，
        请确保项目中安装了 @tailwindcss/typography 插件
      -->
      <div
        class="
            prose
            prose-neutral
            max-w-none
            leading-relaxed
            prose-h1:text-2xl prose-h1:font-bold prose-h1:mt-6
            prose-h2:text-xl  prose-h2:font-semibold prose-h2:mt-5
            prose-h3:text-lg  prose-h3:font-semibold prose-h3:mt-4
            prose-ul:pl-6 prose-ul:my-2 prose-li:my-1 list-disc
            prose-ol:pl-6 prose-ol:my-2 list-decimal
            prose-hr:my-6 prose-hr:border-muted
        "
        v-html="html"
      />
    </div>
  </div>
</template>