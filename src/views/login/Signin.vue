<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <Card class="w-[400px] m-auto max-w-sm">
    <CardHeader class="space-y-1 px-5">
      <CardTitle class="text-2xl">登录您的账号</CardTitle>
      <CardDescription>
        在下方输入您的电子邮箱以登录账号
      </CardDescription>
    </CardHeader>
    <CardContent class="px-5">
      <form @submit.prevent>
        <div class="grid w-full items-center gap-4">
          <!-- 邮箱字段 -->
          <div class="flex flex-col space-y-1.5">
            <Label for="email">电子邮箱</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
          
          <!-- 密码字段 -->
          <div class="flex flex-col space-y-1.5">
            <div class="flex items-center">
              <Label for="password">密码</Label>
              <!-- 使用 router-link 跳转到找回密码页 -->
              <router-link
                to="/login/forgot"
                class="ml-auto inline-block text-sm underline underline-offset-4 hover:text-primary transition-colors"
              >
                忘记密码？
              </router-link>
            </div>
            <Input id="password" type="password" placeholder="请输入密码" />
          </div>
        </div>
        <div class="flex w-full items-center gap-2 pt-5">
            <!-- Checkbox 复选框 -->
            <Checkbox id="terms" :default-checked="true" />
            
            <!-- 文字容器 -->
            <div class="flex items-center gap-1 text-sm leading-none">
                <Label 
                for="terms" 
                class="text-sm font-medium leading-none cursor-pointer"
                >
                已阅读并同意
                </Label>
                <a @click="router.push('/docs/useragreement')" class="text-primary hover:underline decoration-primary/50">《用户协议》</a>
                <span class="text-muted-foreground">与</span>
                <a @click="router.push('/docs/privacypolicy')" class="text-primary hover:underline decoration-primary/50">《隐私条款》</a>
            </div>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex flex-col gap-2 px-5">
      <Button class="w-full">
        登录
      </Button>
    </CardFooter>
  </Card>
</template>
