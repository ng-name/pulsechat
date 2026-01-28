// src/api/member.ts

import { API_BASE_URL } from './conf'

// --- 1. 定义类型接口 ---

// 登录请求数据
export interface SigninParams {
  username: string
  password: string
}

// 注册请求数据
export interface SignupParams {
  username: string
  password: string
  questionIndex: number  // 后端通常要数字
  answer: string
  inviteCode?: string    // 加个问号表示“可选”
}

// 定义通用的响应结构（假设你的后端返回 { code, data, msg }）
export interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T
}

// --- 2. 应用到函数中 ---

/**
 * signin 相关接口
 * 登陆
 */

export async function signinApi(data: SigninParams): Promise<ApiResponse> {
  const res = await fetch( API_BASE_URL + '/api/user/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

/**
 * signup 相关接口
 * 注册
 */

export async function signupApi(data: SignupParams): Promise<ApiResponse> {
  const res = await fetch( API_BASE_URL + '/api/user/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}
