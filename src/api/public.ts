// src/api/public.ts

import { API_BASE_URL } from './conf'

// --- 1. 定义类型接口 ---

export interface BeedbackParams {
  type: number;
  name: string;
  phone: string;
  email: string;
  title: string;
  content: string;
}

export interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T
}
// --- 2. 应用到函数中 ---

/**
 * feedback 相关接口
 * 反馈表单
 */


export async function feedbackApi(data: BeedbackParams): Promise<ApiResponse> {
  const res = await fetch( API_BASE_URL + '/api/feedback/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}
