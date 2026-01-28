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
import { Loader2 } from 'lucide-vue-next' // 引入一个加载图标

// 导入刚才写的逻辑
import { useLoginForm } from '@/composables/useLoginForm' // 根据实际路径修改

const { formData, isSubmitting, handleSubmit } = useLoginForm()
</script>

<template>
    <div class="auth-container w-[400px] m-auto relative">
        <Card class="w-full">
            <CardHeader class="space-y-1 px-5">
            <CardTitle class="text-2xl">登录您的账号</CardTitle>
            <CardDescription>
                在下方输入您的登录账号
            </CardDescription>
            </CardHeader>
            <CardContent class="px-5">
            <!-- 绑定提交事件 -->
            <form @submit.prevent="handleSubmit">
                <div class="grid w-full items-center gap-4">
                <!-- 昵称/用户名 -->
                <div class="flex flex-col space-y-1.5">
                    <Label for="username">昵称/用户名</Label>
                    <Input 
                        id="username" 
                        v-model="formData.username"
                        type="text" 
                        placeholder="请输入用户名" 
                        autocomplete="off" 
                    />
                </div>
                
                <!-- 密码字段 -->
                <div class="flex flex-col space-y-1.5">
                    <div class="flex items-center">
                    <Label for="password">密码</Label>
                    <router-link
                        to="/login/forgot"
                        class="ml-auto inline-block text-sm underline underline-offset-4 hover:text-primary transition-colors"
                    >
                        忘记密码？
                    </router-link>
                    </div>
                    <Input 
                        id="password" 
                        v-model="formData.password"
                        type="password" 
                        placeholder="请输入密码" 
                        autocomplete="current-password" 
                    />
                </div>
                </div>

                <div class="flex w-full items-center gap-2 pt-5">
                    <!-- Checkbox 复选框绑定 -->
                    <Checkbox id="terms" v-model="formData.agreed"/>
                    <div class="flex items-center gap-1 text-sm leading-none">
                        <Label for="terms" class="cursor-pointer">
                            已阅读并同意
                        </Label>
                        <RouterLink to="/docs/useragreement" class="text-primary hover:underline decoration-primary/50">《用户协议》</RouterLink>
                        <span class="text-muted-foreground">与</span>
                        <RouterLink to="/docs/privacypolicy" class="text-primary hover:underline decoration-primary/50">《隐私条款》</RouterLink>
                    </div>
                </div>
                
                <!-- 隐形提交按钮，允许回车触发 submit -->
                <button type="submit" class="hidden"></button>
            </form>
            </CardContent>
            
            <CardFooter class="flex flex-col gap-2 px-5">
            <!-- 登录按钮绑定 loading 状态 -->
            <Button 
                class="w-full" 
                :disabled="isSubmitting" 
                @click="handleSubmit"
            >
                <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
                {{ isSubmitting ? '登录中...' : '登录' }}
            </Button>
            </CardFooter>
        </Card>
    </div>
</template>