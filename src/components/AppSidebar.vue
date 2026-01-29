<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar"

import {
  BookOpen,
  Bot,
  LogIn,
  GalleryVerticalEnd,
  MessageSquare, // 新增：用于聊天
  FileText,      // 新增：用于文档
  MoreHorizontal // 新增：用于其他
} from "lucide-vue-next"
import NavMain from "@/components/NavMain.vue"
import NavUser from "@/components/NavUser.vue"
import TeamSwitcher from "@/components/TeamSwitcher.vue"


import {
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
})


// This is sample data.
const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "应用",
      url: "#",
      icon: MessageSquare,
      isActive: true,
      items: [
        {
          title: "聊天 / Chat",
          url: "/chat",
        },
      ],
    },
    {
      title: "模型",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "入门介绍",
          url: "/models/intro",
        },
        {
          title: "接入API",
          url: "/models/api",
        },
        {
          title: "限制QS",
          url: "/models/limits",
        },
        {
          title: "价格表",
          url: "/models/pricing",
        },
      ],
    },
    {
      title: "文档",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "用户协议",
          url: "/docs/useragreement",
        },
        {
          title: "隐私条款",
          url: "/docs/privacypolicy",
        },
      ],
    },
    {
      title: "其他",
      url: "#",
      icon: MoreHorizontal,
      items: [
        {
          title: "关于我们",
          url: "/other/about",
        },
        {
          title: "反馈意见",
          url: "/other/feedback",
        },
        {
          title: "常见问题",
          url: "/other/faqs",
        },
      ],
    },
  ],
  // 如果你的侧边栏底部还有 projects 区域，可以清空或保留
  projects: [], 
}

const se = false;

</script>

<template>
    <Sidebar v-bind="props">
        <SidebarHeader>
            <TeamSwitcher :teams="data.teams" />
        </SidebarHeader>
        <SidebarContent>
            <NavMain :items="data.navMain" />
            <!-- <NavMain :items="data.navMain" /> -->
            <!-- <NavProjects :projects="data.projects" /> -->
        </SidebarContent>
        <SidebarFooter>
            <NavUser v-if="se" :user="data.user" />
             <div v-else class="p-0 w-full">
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton as-child>
                <RouterLink to="/login/signin">
                    <LogIn class="mr-2 size-4" />
                    <span>立即登录</span>
                </RouterLink>
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
        </div>
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
</template>