import { ref, reactive } from 'vue'
import { signinApi, type SigninParams } from '@/api/member' // 假设你有 loginApi
import { useDebounceFn } from '@vueuse/core'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'

export function useLoginForm() {
  const router = useRouter()

  // 初始化表单数据
  const formData = reactive({
    username: '',
    password: '',
    agreed: false
  })

  // 交互状态
  const isSubmitting = ref(false)

  // 提交逻辑
  const handleSubmit = useDebounceFn(async () => {
    // 1. 同意协议校验
    if (!formData.agreed) {
      toast.info('请先阅读并同意用户协议与隐私条款')
      return
    }

    // 2. 用户名校验 (参考注册逻辑的正则)
    const username = formData.username.trim()
    const usernameRegex = /^[a-zA-Z\u4e00-\u9fa5]{2,8}$/
    
    if (!username) {
      toast.info('请输入用户名')
      return
    }
    if (!usernameRegex.test(username)) {
      toast.info('用户名格式不正确')
      return
    }

    // 3. 密码校验
    if (!formData.password) {
      toast.info('请输入密码')
      return
    }
    // 登录时通常不严格校验密码正则，只需非空即可，但为了安全也可以加上
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,16}$/
    if (!passwordRegex.test(formData.password)) {
        toast.info('密码格式不正确')
        return
    }

    isSubmitting.value = true

    try {
      const payload: SigninParams = {
        username: formData.username,
        password: formData.password
      }

      const res = await signinApi(payload)

      if (res.code === 200) {
        toast.success('登录成功')
        // 这里通常需要存储 token，例如：
        // localStorage.setItem('token', res.data.token)
        
        // 跳转到首页或来源页
        router.push('/')
      } else {
        toast.error(res.msg || '登录失败，请检查账号密码')
      }
    } catch (err) {
      toast.error('网络请求失败，请稍后再试')
    } finally {
      isSubmitting.value = false
    }
  }, 500)

  return {
    formData,
    isSubmitting,
    handleSubmit
  }
}