import { ref, reactive } from 'vue'
import { signupApi, type SignupParams } from '@/api/member'
import { useDebounceFn } from '@vueuse/core'
import { toast } from 'vue-sonner'

export const securityQuestions = [
  "您父亲的出生地是哪座城市？",      
  "您小学六年级班主任的姓氏是？",    
  "您人生中第一份工作的公司全称是？", 
  "您拥有的第一辆车（或电动车）的品牌是？",
  "您童年居住过的第一条街道名称是？",
  "您初中时期最好的朋友叫什么名字？"
]

export function useRegisterForm() {
  // 初始化空表单数据
  const initialData = {
    username: '',
    password: '',
    confirmPassword: '', // 仅限前端校验用
    questionIndex: '',   // Select 绑定通常用字符串
    answer: '',
    inviteCode: '',
    agreed: false         // 用户协议勾选
  }

  // 使用 reactive 处理表单状态
  const formData = reactive({ ...initialData })
  
  // 交互状态
  const isSubmitting = ref(false)
  const isSuccess = ref(false)

  // 重置表单方法
  const resetForm = () => {
    Object.assign(formData, initialData)
  }

  // 提交逻辑（使用 useDebounceFn 防抖，防止短时间内重复点击）
  const handleSubmit = useDebounceFn(async () => {

    // --- 1. 用户名校验 ---
    const username = formData.username.trim()
    const usernameRegex = /^[a-zA-Z\u4e00-\u9fa5]{2,8}$/

    // 1. 基本校验
    if (!formData.agreed){
        toast.info('请先同意用户协议')
        return
    }
    if (!username){
        toast.info('用户名不能为空')
        return
    }
    if (!usernameRegex.test(username)) {
      toast.info('用户名需为 2-8 位中英文字符，不能包含符号')
      return
    }
    // --- 2. 密码校验 ---
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,16}$/

    if (!formData.password){
        toast.info('密码不能为空')
        return
    }
    if (!passwordRegex.test(formData.password)) {
      toast.info('密码需为 8-16 位英文、数字或常用符号')
      return
    }
    if (formData.password !== formData.confirmPassword){
        toast.info('两次输入的密码不一致')
        return
    }
    if (!formData.questionIndex){
        toast.info('请选择密保问题')
        return
    }

    isSubmitting.value = true

    try {
      // 2. 构造发送给后端的 Payload (符合 SignupParams 接口)
      const payload: SignupParams = {
        username: formData.username,
        password: formData.password,
        questionIndex: Number(formData.questionIndex),
        answer: formData.answer,
        inviteCode: formData.inviteCode || undefined
      }

      const res = await signupApi(payload)

      if (res.code === 200) {
        isSuccess.value = true
        // 可以在这里跳转页面或清空表单
        resetForm()
      } else {
        toast.info(res.msg || '注册失败')
      }
    } catch (err) {
      toast.info('网络请求失败，请稍后再试')
    } finally {
      isSubmitting.value = false
    }
  }, 500) // 500毫秒防抖

  return {
    formData,
    securityQuestions,
    isSubmitting,
    isSuccess,
    handleSubmit,
    resetForm
  }
}