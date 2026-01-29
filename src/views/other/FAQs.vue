<script setup lang="ts">
import { ref } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// 会员常见问题数据 (12条)
const memberFaqs = ref([
  {
    id: 'm-1',
    question: '如何开通或续费会员服务？',
    answer: '您可以通过个人中心点击“开通会员”按钮，选择合适的订阅周期（月度/季度/年度）并通过微信或支付宝完成支付。'
  },
  {
    id: 'm-2',
    question: '会员积分的获取规则是什么？',
    answer: '每消费 1 元可获得 1 积分，此外每日签到、完成评价任务或参与官方限时活动均可获得额外积分奖励。'
  },
  {
    id: 'm-3',
    question: '积分可以兑换哪些礼品？',
    answer: '积分可在“积分商城”中兑换会员延长时长券、周边礼品、第三方平台代金券或抵扣部分现金支付。'
  },
  {
    id: 'm-4',
    question: '会员等级是如何划分的？',
    answer: '会员等级基于成长值计算。分为普通、黄金、铂金、钻石四个等级，等级越高享受的折扣力度和专属资源越多。'
  },
  {
    id: 'm-5',
    question: '可以多个设备同时登录会员账号吗？',
    answer: '为了保障您的账号安全，同一个会员账号最多支持在 3 台设备登录，且同一时间仅允许 2 台设备在线使用。'
  },
  {
    id: 'm-6',
    question: '会员到期后积分会失效吗？',
    answer: '会员到期不影响已获得的积分，但积分具有年度有效期，每年 12 月 31 日将清空前一年度未使用的积分。'
  },
  {
    id: 'm-7',
    question: '如何查看我的成长值进度？',
    answer: '进入“个人中心”->“会员等级”，即可查看当前成长值、距离下一等级所需分值及当前等级特权。'
  },
  {
    id: 'm-8',
    question: '支持自动续费吗？如何取消？',
    answer: '开通时勾选“自动续费”可享受首充优惠。如需取消，可在“设置”->“订阅管理”中随时关闭续费开关。'
  },
  {
    id: 'm-9',
    question: '会员专属客服的在线时间？',
    answer: '钻石及以上等级会员享有 7*24 小时人工通道，普通及黄金会员在线时间为每日 9:00 - 21:00。'
  },
  {
    id: 'm-10',
    question: '可以转让我的会员账号给他人吗？',
    answer: '会员服务仅限本人使用。账号严禁租赁、转让或售卖，一经系统检测违规，可能会导致账号被永久封禁。'
  },
  {
    id: 'm-11',
    question: '生日当天有什么特殊福利？',
    answer: '会员生日当天可领取“生日大礼包”，内含全场 8 折券及当日登录双倍积分奖励，请确保已填写生日信息。'
  },
  {
    id: 'm-12',
    question: '会员服务开通后支持退款吗？',
    answer: '由于会员属于虚拟数字产品，开通成功后通常不支持退款。如因系统故障导致重复扣费，请联系客服核实处理。'
  }
])

// 其他常见问题数据 (12条)
const otherFaqs = ref([
  {
    id: 'o-1',
    question: '忘记登录密码该怎么办？',
    answer: '请在登录页面点击“忘记密码”，通过绑定的手机号或邮箱接收验证码，验证成功后即可重新设置新密码。'
  },
  {
    id: 'o-2',
    question: '支持哪些支付方式？',
    answer: '我们目前支持支付宝、微信支付、云闪付以及主流银行的储蓄卡/信用卡支付。'
  },
  {
    id: 'o-3',
    question: '如何注销我的账号？',
    answer: '在“个人设置”底部可找到“注销账号”选项。请注意，注销后所有数据、积分及会员权益将永久删除无法找回。'
  },
  {
    id: 'o-4',
    question: '为什么收不到手机验证码？',
    answer: '请检查手机号是否填写正确、信号是否正常。此外请确认验证码是否被手机管家拦截，或在 60 秒后重试。'
  },
  {
    id: 'o-5',
    question: '如何开具发票？',
    answer: '支付成功后，您可以在“订单中心”找到对应订单，选择“申请发票”，填写电子发票抬头信息后即可下载。'
  },
  {
    id: 'o-6',
    question: '系统对浏览器版本有要求吗？',
    answer: '为了获得最佳体验，建议使用 Chrome、Edge 或 Safari 的最新版本。IE 浏览器可能存在部分功能不兼容。'
  },
  {
    id: 'o-7',
    question: '如何修改绑定的手机号？',
    answer: '进入“安全中心”，点击“修改绑定”，需先验证原手机号。如原手机已无法使用，请提交人工申诉。'
  },
  {
    id: 'o-8',
    question: '发现系统 Bug 应该如何反馈？',
    answer: '您可以前往“反馈中心”提交详细描述，并附带截图。一旦采纳，我们将给予一定的积分奖励。'
  },
  {
    id: 'o-9',
    question: 'APP 无法打开或频繁闪退怎么办？',
    answer: '建议尝试清理缓存或卸载重装。如果问题依旧，请记录您的设备型号及系统版本号告知技术支持。'
  },
  {
    id: 'o-10',
    question: '退款成功后，钱款多久到账？',
    answer: '原路返回通常需要 1-3 个工作日，具体到账时间取决于银行或支付平台的处理速度。'
  },
  {
    id: 'o-11',
    question: '我们的隐私策略是如何保护您的？',
    answer: '我们严格遵守相关法律法规，未经您的许可不会向任何第三方提供您的个人隐私数据，所有传输均经过加密处理。'
  },
  {
    id: 'o-12',
    question: '如何联系在线人工客服？',
    answer: '点击页面右下角的“客服图标”，在弹窗中回复“人工”或在菜单中选择“联系专人”即可接入。'
  }
])
</script>

<template>
    <!-- 修正了 calc 的拼写 -->
    <div class="flex w-full justify-center items-center min-h-[calc(100vh-104px)] py-8">
        <div class="flex w-[860px] gap-8">
            
            <!-- 左侧：会员常见问题 -->
            <div class="flex-1">
                <Card class="w-full h-fit">
                    <CardHeader>
                        <CardTitle>会员常见问题</CardTitle>
                        <CardDescription>
                            关于会员等级、积分及专属权益的说明
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible class="w-full">
                            <AccordionItem v-for="item in memberFaqs" :key="item.id" :value="item.id">
                                <AccordionTrigger class="text-left">{{ item.question }}</AccordionTrigger>
                                <AccordionContent class="text-zinc-500 leading-relaxed">
                                    {{ item.answer }}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>

            <!-- 右侧：其他常见问题 -->
            <div class="flex-1">
                <Card class="w-full h-fit">
                    <CardHeader>
                        <CardTitle>其他常见问题</CardTitle>
                        <CardDescription>
                            关于支付、退款及系统使用的通用指南
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible class="w-full">
                            <AccordionItem v-for="item in otherFaqs" :key="item.id" :value="item.id">
                                <AccordionTrigger class="text-left">{{ item.question }}</AccordionTrigger>
                                <AccordionContent class="text-zinc-500 leading-relaxed">
                                    {{ item.answer }}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>

        </div>
    </div>
</template>

<style scoped>
/* 确保手风琴触发器文字过长时不会显得太拥挤 */
:deep(.AccordionTrigger) {
  text-align: left;
}
</style>