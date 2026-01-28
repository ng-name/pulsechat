import { ref, reactive, onUnmounted, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { toast } from 'vue-sonner'
import { securityQuestions } from './useRegisterForm' // 复用注册页的问题列表
// 假设你的 API 接口如下
// import { verifySecurityApi, resetPasswordApi } from '@/api/member'

export function useResetPassword() {
  const currentStep = ref(1) // 当前步骤：1, 2, 3
  const isSubmitting = ref(false)
  const tempToken = ref('') // 步骤1拿到的临时Token
  
  // 倒计时相关
  const MAX_TIME = 60 // 60秒有效时间
  const timeLeft = ref(MAX_TIME)
  let timer: number | null = null

  const formData = reactive({
    username: '',
    questionIndex: '',
    answer: '',
    newPassword: '',
    confirmPassword: ''
  })

  // 计算进度条百分比 (倒计时)
  const progressValue = computed(() => (timeLeft.value / MAX_TIME) * 100)

  // 开始倒计时
  const startTimer = () => {
    stopTimer()
    timeLeft.value = MAX_TIME
    timer = window.setInterval(() => {
      timeLeft.value--
      if (timeLeft.value <= 0) {
        stopTimer()
        handleExpire()
      }
    }, 1000)
  }

  const stopTimer = () => {
    if (timer) clearInterval(timer)
  }

  // 验证过期处理
  const handleExpire = () => {
    toast.error('操作超时，请重新验证身份')
    tempToken.value = ''
    currentStep.value = 1
  }

  // --- 步骤 1：验证密保 ---
  const submitStep1 = useDebounceFn(async () => {
    if (!formData.username || !formData.questionIndex || !formData.answer) {
      toast.info('请填写完整的验证信息')
      return
    }

    isSubmitting.value = true
    try {
      // 模拟请求 API
      // const res = await verifySecurityApi({ ... })
      // 假设成功返回 token
      const fakeRes = { code: 200, token: 'temp_token_123' }
      
      if (fakeRes.code === 200) {
        tempToken.value = fakeRes.token
        currentStep.value = 2
        startTimer() // 进入步骤2，开启倒计时
        toast.success('身份验证成功')
      }
    } catch (e) {
      toast.error('验证失败')
    } finally {
      isSubmitting.value = false
    }
  }, 500)

  // --- 步骤 2：重置密码 ---
  const submitStep2 = useDebounceFn(async () => {
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,16}$/

    if (!passwordRegex.test(formData.newPassword)) {
      toast.info('新密码需为 8-16 位英文、数字或符号')
      return
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.info('两次输入的密码不一致')
      return
    }

    isSubmitting.value = true
    try {
      // 模拟提交
      // await resetPasswordApi({ token: tempToken.value, password: formData.newPassword })
      stopTimer()
      currentStep.value = 3
    } catch (e) {
      toast.error('修改失败')
    } finally {
      isSubmitting.value = false
    }
  }, 500)

  onUnmounted(() => stopTimer())

  return {
    currentStep,
    formData,
    isSubmitting,
    timeLeft,
    submitStep1,
    submitStep2,
    securityQuestions
  }
}