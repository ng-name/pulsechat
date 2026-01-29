<script setup lang="ts">
import { useFeedback } from '@/composables/useFeedback'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'

import { Loader2 } from 'lucide-vue-next'

const { form, isLoading, ExpRegulations, handleSubmit, resetForm } = useFeedback()

</script>

<template>
<div class="flex min-h-[calc(100vh-104px)] items-center justify-center">
    <div class="w-[840px] flex items-end gap-6 border p-6 rounded-xl">
        <div class="w-[426px]">
            <form @submit.prevent="handleSubmit">
                <FieldGroup>
                    <!-- 第一部分：用户信息 -->
                    <FieldSet>
                    <FieldLegend>反馈中心</FieldLegend>
                    <FieldDescription>
                        请填写以下信息，帮助我们更好地改进服务。
                    </FieldDescription>
                    
                    <FieldGroup>
                        <!-- 姓名与手机号并排 -->
                        <div class="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel for="fb-name">用户姓名</FieldLabel>
                            <Input id="fb-name" v-model="form.name" placeholder="请输入您的姓名" autocomplete="off" />
                        </Field>
                        <Field>
                            <FieldLabel for="fb-phone">手机号</FieldLabel>
                            <Input id="fb-phone" v-model="form.phone" placeholder="请输入联系电话" type="tel" autocomplete="off" />
                        </Field>
                        </div>

                        <!-- 邮箱 -->
                        <Field>
                        <FieldLabel for="fb-email">电子邮箱</FieldLabel>
                        <Input id="fb-email" v-model="form.email" placeholder="example@domain.com" type="email" autocomplete="off" />
                        </Field>
                    </FieldGroup>
                    </FieldSet>

                    <!-- 第二部分：反馈内容 -->
                    <FieldSet>
                    <FieldGroup>
                        <!-- 反馈类型 -->
                        <Field>
                        <FieldLabel for="fb-type">反馈类型</FieldLabel>
                        <Select :default-value="1" v-model="form.type">
                            <SelectTrigger id="fb-type">
                            <SelectValue placeholder="请选择反馈类型" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem :value="1">问题反馈 (Bug)</SelectItem>
                            <SelectItem :value="2">功能建议</SelectItem>
                            <SelectItem :value="3">内容错误</SelectItem>
                            <SelectItem :value="4">其他</SelectItem>
                            </SelectContent>
                        </Select>
                        </Field>

                        <!-- 标题 -->
                        <Field>
                        <FieldLabel for="fb-title">标题</FieldLabel>
                        <Input id="fb-title" v-model="form.title" placeholder="请简要概括您的问题" autocomplete="off" />
                        </Field>

                        <!-- 正文 -->
                        <Field>
                        <FieldLabel for="fb-content">正文内容</FieldLabel>
                        <Textarea
                            id="fb-content"
                            v-model="form.content"
                            placeholder="请详细描述您的建议或遇到的问题..."
                            class="min-h-[120px] resize-none"
                            autocomplete="off"
                        />
                        </Field>
                    </FieldGroup>
                    </FieldSet>

                    <!-- 操作按钮 -->
                    <Field orientation="horizontal" class="pt-0 flex justify-end">
                         <Button variant="outline" type="button" @click="resetForm" :disabled="isLoading">
                        重置
                        </Button>
                        <Button type="submit" :disabled="isLoading">
                            <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                            {{ isLoading ? '提交中...' : '提交反馈' }}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
        
        <div class="flex-1">
            <Alert class="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm border transition-colors duration-300">
                <AlertTitle class="text-lg font-bold flex items-center gap-2 mb-4">
                您的每一份反馈，我们都在认真倾听
                </AlertTitle>
                <AlertDescription>
                <div class="space-y-6">
                    <div v-for="item in ExpRegulations" :key="item.step" class="group">
                    <h4 class="font-bold text-sm mb-1 text-zinc-900 dark:text-zinc-100">
                        {{ item.title }}
                    </h4>
                    <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {{ item.content }}
                    </p>
                    </div>
                </div>
                </AlertDescription>
            </Alert>
        </div>

    </div>
</div>
</template>