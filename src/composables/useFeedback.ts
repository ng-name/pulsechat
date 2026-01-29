// useFeedback.ts
import { reactive, ref } from 'vue'
import { feedbackApi, type BeedbackParams } from '@/api/public'
import { toast } from 'vue-sonner'

export function useFeedback() {
  const isLoading = ref(false)

  // 1. 定义字段名和初始值
  const form = reactive<BeedbackParams>({
    name: '',
    phone: '',
    email: '',
    type: 0,
    title: '',
    content: ''
  })

   // 2. 提交方法
  const handleSubmit = async () => {

    if (form.type < 1) {
      toast.info('请选择反馈类型')
      return
    }

    // 基础非空校验
    if (!form.title.trim() || !form.content.trim()) {
      toast.info('请填写反馈标题和正文内容')
      return
    }

    if (isLoading.value) return
    
    isLoading.value = true
    try {
      // 获取响应结果
      const res: any = await feedbackApi(form)
      
      // 判断业务状态码
      if (res.code === 1) {
        toast.success('提交成功', {
          description: '感谢您的反馈，我们将在 72 小时内处理。'
        })
        resetForm() // 只有 code 为 1 时才重置表单
      } else {
        // 处理业务上的失败（例如：code 为 0 或其他）
        toast.error(res.msg || '提交失败', {
          description: '请检查填写内容或稍后再试。'
        })
      }
      
    } catch (error: any) {
      // 处理网络层级的错误（如 404, 500 等）
      console.error('提交异常:', error)
      toast.error('请求异常', {
        description: error?.message || '网络连接失败，请稍后重试。'
      })
    } finally {
      isLoading.value = false
    }
  }

  // 重置表单
  const resetForm = () => {
    form.name = ''
    form.phone = ''
    form.email = ''
    form.type = 1 // 重置回数字 1
    form.title = ''
    form.content = ''
  }

  const ExpRegulations = ref([
    {
        step: '01',
        title: '第一步：留下您的声音',
        content: '在反馈中心填写您的发现或建议。无论是微小的体验细节，还是对未来的期待，您的每一句话对我们都很重要。'
    },
    {
        step: '02',
        title: '第二步：即刻受理',
        content: '提交完成后，我们的系统会立即为您开启专属反馈通道，确保每一份声音都能被记录在案。'
    },
    {
        step: '03',
        title: '第三步：精细化分拣',
        content: '我们的值班小伙伴会仔细阅读您的内容，确保将它交到最懂这个问题的产品经理或工程师手中。'
    },
    {
        step: '04',
        title: '第四步：用心调研与核实',
        content: '针对您提到的每一个点，我们都会在内部进行模拟测试和深度调研，致力于为您找到最优的解决办法。'
    },
    {
        step: '05',
        title: '第五步：72 小时闪电回音',
        content: '我们尊重您的每一份等待，承诺在 72 小时内给出阶段性的处理反馈，让您的声音“落地有声”。'
    },
    {
        step: '06',
        title: '第六步：持续陪伴，直至解决',
        content: '如果问题比较复杂，我们的服务不会就此停止。我们会与您保持联系，直到问题最终圆满解决，共建更好的产品体验。'
    }
    ])

  return {
    form,
    isLoading,
    ExpRegulations,
    handleSubmit,
    resetForm
  }
}