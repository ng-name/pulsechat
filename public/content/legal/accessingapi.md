## 1. 快速开始

### 1.1 获取 API Key
在开始之前，您需要登录 **PulseChat 开发者控制台** 申请您的 `API_KEY`。

> **⚠️ 注意：** 请妥善保管您的 Key，不要在前端代码或公共代码仓库（如 GitHub）中泄露。

### 1.2 基础 URL
所有接口请求均指向以下基础路径：

```http
https://api.pulsechat.ai/v1
```

## 2. 接口规范
# 聊天对话 (Chat Completions)

**Endpoint:** `/chat/completions`  
**Method:** `POST`

### 请求头 (Headers)

| 参数 | 值 |
| :--- | :--- |
| Content-Type | `application/json` |
| Authorization | `Bearer YOUR_API_KEY` |

### 请求参数示例

```json
{
  "model": "pulse-v2-pro",
  "messages": [
    { 
      "role": "system", 
      "content": "你是一个专业的翻译官，擅长将中文翻译为地道的英文。" 
    },
    { 
      "role": "user", 
      "content": "海豚工作室致力于创造连接未来的智慧。" 
    }
  ],
  "temperature": 0.7,
  "stream": false
}
```

### 2. 关键参数说明

| 参数 | 说明 |
| :--- | :--- |
| **model** | 选用的模型 ID（如 `pulse-v2-pro` 或 `pulse-v2-light`）。 |
| **temperature** | 采样温度（0-2）。值越高回复越随机，值越低回复越聚焦。 |
| **stream** | 是否开启流式响应。开启后将逐字返回内容。 |

### 3. 代码示例 (Python)

```python
import openai

# 初始化客户端
client = openai.OpenAI(
    api_key="YOUR_API_KEY",
    base_url="https://api.pulsechat.ai/v1"
)

# 发起对话请求
response = client.chat.completions.create(
    model="pulse-v2-pro",
    messages=[
        {"role": "user", "content": "你好，PulseChat！"}
    ]
)
# 输出回复内容
print(response.choices[0].message.content)
```


## 4. 错误处理

API 使用标准的 HTTP 状态码来表示请求状态：

| 状态码 | 含义 | 建议 |
| :--- | :--- | :--- |
| **200** | 成功 | 请求处理完成。 |
| **401** | 身份验证失败 | 检查 API Key 是否正确或已失效。 |
| **429** | 触发频率限制 | 请降低请求频率，或检查账户余额。 |
| **500** | 服务器错误 | 海豚工作室正在紧急修复，请稍后重试。 |


## 5. 版本说明

- **当前版本:** `v1.2.5`
- **更新日志:** 优化了中文语境下的长文本逻辑推理能力。

---

## 6. 支持与反馈

如果您在集成过程中遇到任何问题：

- **访问：** [PulseChat 反馈中心](https://support.pulsechat.ai)
- **邮件：** [support@dolphinstudio.com](mailto:support@dolphinstudio.com)
- **官方：** **海豚工作室 (Dolphin Studio)** 荣誉出品

---

> © 2024 - 2026 PulseChat. All Rights Reserved.