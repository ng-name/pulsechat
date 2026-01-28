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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useRegisterForm } from '@/composables/useRegisterForm'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { CheckCircle2Icon } from 'lucide-vue-next'

const { 
  formData, 
  securityQuestions, 
  isSubmitting, 
  isSuccess, 
  handleSubmit, 
  resetForm 
} = useRegisterForm()
</script>

<template>
    <div class="w-[600px] m-auto relative">
        <Card class="w-full mb-4">
            <CardHeader class="space-y-1 px-5">
            <CardTitle class="text-2xl">注册成为会员</CardTitle>
            <CardDescription>在下方输入会员信息完成注册</CardDescription>
            </CardHeader>

            <CardContent class="px-5">
            <form @submit.prevent="handleSubmit">
                <div class="grid grid-cols-2 gap-5">
                <!-- 左侧：账号信息 -->
                <div class="space-y-4">
                    <div class="flex flex-col space-y-1.5">
                    <Label for="username">昵称/用户名</Label>
                    <Input id="username" v-model="formData.username" placeholder="请输入用户名" required autocomplete="off" />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                    <Label for="password">密码</Label>
                    <Input id="password" type="password" v-model="formData.password" placeholder="请输入密码" required autocomplete="new-password" />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                    <Label for="passwordre">重复密码</Label>
                    <Input id="passwordre" type="password" v-model="formData.confirmPassword" placeholder="再次输入密码" required autocomplete="new-password" />
                    </div>
                </div>

                <!-- 右侧：安全与扩展 -->
                <div class="space-y-4">
                    <div class="flex flex-col space-y-1.5">
                    <Label>密保问题</Label>
                    <Select v-model="formData.questionIndex">
                        <SelectTrigger><SelectValue placeholder="请选择问题" /></SelectTrigger>
                        <SelectContent>
                        <SelectItem v-for="(q, i) in securityQuestions" :key="i" :value="i.toString()">
                            {{ q }}
                        </SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <div class="flex flex-col space-y-1.5">
                    <Label for="answer">密保答案</Label>
                    <Input id="answer" v-model="formData.answer" placeholder="请输入答案" required autocomplete="off"/>
                    </div>
                    <div class="flex flex-col space-y-1.5">
                    <Label for="invite">邀请码 (可选)</Label>
                    <Input id="invite" v-model="formData.inviteCode" placeholder="如有请填写" autocomplete="off"/>
                    </div>
                </div>
                </div>

                <!-- 协议勾选 -->
                <div class="flex w-full items-center gap-2 pt-6">
                <Checkbox id="terms" v-model="formData.agreed" />
                <div class="flex items-center gap-1 text-sm leading-none">
                    <Label for="terms" class="cursor-pointer">已阅读并同意</Label>
                    <RouterLink to="/docs/useragreement" class="text-primary hover:underline">《用户协议》</RouterLink>
                    <span class="text-muted-foreground">与</span>
                    <RouterLink to="/docs/privacypolicy" class="text-primary hover:underline">《隐私条款》</RouterLink>
                </div>
                </div>
            </form>
            </CardContent>

            <CardFooter class="flex flex-row-reverse gap-4 px-5 pb-8">
            <!-- 重置按钮 -->
            <Button variant="outline" @click="resetForm" :disabled="isSubmitting">
                重置
            </Button>
            <!-- 注册按钮 -->
            <Button @click="handleSubmit" :disabled="isSubmitting">
                <span v-if="isSubmitting">注册中...</span>
                <span v-else>立即注册</span>
            </Button>
            </CardFooter>
        </Card>
         <!-- 成功提示：增加过度动画 -->
        <Transition name="slide-fade">
            <Alert v-if="isSuccess" class="border-green-500 bg-green-50 dark:bg-green-950/20">
                <CheckCircle2Icon class="h-4 w-4 text-green-600" />
                <AlertTitle class="text-green-800 dark:text-green-400">注册成功！</AlertTitle>
                <AlertDescription class="text-green-700 dark:text-green-500">
                    您的账号已成功创建，现在可以前往登录页面开启您的旅程。
                </AlertDescription>
            </Alert>
        </Transition>
    </div>
</template>


<style scoped>
/* 定义右侧滑动淡入动画 */
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>