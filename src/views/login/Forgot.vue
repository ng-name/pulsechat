<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2Icon, Loader2, AlertCircle } from 'lucide-vue-next'
import { useResetPassword } from '@/composables/useResetPassword'

const { 
  currentStep, 
  formData, 
  isSubmitting, 
  timeLeft, 
  submitStep1, 
  submitStep2, 
  securityQuestions 
} = useResetPassword()
</script>

<template>
  <div class="w-[400px] m-auto relative">
    <Card class="w-full mb-4">
      <CardHeader class="space-y-1 px-5">
        <CardTitle class="text-2xl">重置密码</CardTitle>
        <CardDescription v-if="currentStep === 1">验证您的密保信息以继续</CardDescription>
        <CardDescription v-if="currentStep === 2">请在有效期内设置您的新密码</CardDescription>
        <CardDescription v-if="currentStep === 3">您的密码已重置成功</CardDescription>
      </CardHeader>
      
      <CardContent class="px-5">
        <!-- 步骤 1：验证身份 -->
        <div v-if="currentStep === 1" class="grid gap-4">
          <div class="space-y-1.5">
            <Label>用户名</Label>
            <Input v-model="formData.username" placeholder="请输入用户名" />
          </div>
          <div class="space-y-1.5">
            <Label>密保问题</Label>
            <Select v-model="formData.questionIndex">
              <SelectTrigger>
                <SelectValue placeholder="请选择密保问题" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="(q, i) in securityQuestions" :key="i" :value="String(i)">
                  {{ q }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-1.5">
            <Label>答案</Label>
            <Input v-model="formData.answer" placeholder="请输入您的答案" />
          </div>
          <Button @click="submitStep1" :disabled="isSubmitting" class="w-full mt-2">
            <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
            下一步
          </Button>
        </div>

        <!-- 步骤 2：设置新密码 -->
        <div v-if="currentStep === 2" class="grid gap-4">
          <!-- 倒计时进度条 -->
          <div class="space-y-2">
            <div class="flex justify-between text-xs text-muted-foreground">
              <span>凭证有效剩余时间</span>
              <span :class="timeLeft < 10 ? 'text-destructive font-bold' : ''">{{ timeLeft }}秒</span>
            </div>
            <Progress :model-value="(timeLeft / 60) * 100" class="h-1" />
          </div>

          <div class="space-y-1.5">
            <Label>新密码</Label>
            <Input v-model="formData.newPassword" type="password" placeholder="8-16位字符" />
          </div>
          <div class="space-y-1.5">
            <Label>确认新密码</Label>
            <Input v-model="formData.confirmPassword" type="password" placeholder="请再次输入" />
          </div>
          <Button @click="submitStep2" :disabled="isSubmitting" class="w-full mt-2">
             <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
             确认重置
          </Button>
        </div>

        <!-- 步骤 3：完成 -->
        <div v-if="currentStep === 3" class="py-4 text-center">
            <div class="flex flex-col items-center gap-4">
                <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2Icon class="h-8 w-8 text-green-600" />
                </div>
                <p class="text-sm text-muted-foreground">新密码已生效，请妥善保管。</p>
                <Button variant="outline" class="w-full" @click="$router.push('/login')">
                    返回登录
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>

    <!-- 底部成功提示（仅在步骤3显示） -->
    <Transition name="slide-fade">
      <Alert v-if="currentStep === 3" class="border-green-500 bg-green-50">
        <CheckCircle2Icon class="h-4 w-4 text-green-600" />
        <AlertTitle class="text-green-800">重置完成</AlertTitle>
        <AlertDescription class="text-green-700">
          您可以点击上方按钮返回登录页面。
        </AlertDescription>
      </Alert>
    </Transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}
</style>