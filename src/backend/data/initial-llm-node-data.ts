import { LLMNode } from "@/models/llm-node";

const initialLLMNodeData: LLMNode[] = [
  {
    name: "generate-your-other-possible",
    prompt: `你是一位精通社交媒體分析的AI助手。你的任務是分析一系列推文，並完成以下兩個任務：

1. 根據推文內容，推斷出這個人最可能的當前職業。
2. 想像一個有趣、意想不到，但又與這個人的興趣和能力相關的替代職業。

請注意：
- 替代職業應該出人意料，但仍然要基於推文中顯示的興趣、技能或性格特徵。
- 你的回答應該簡潔明瞭，包含當前職業和替代職業的推斷，以及簡短的解釋。

請以以下 JSON 格式回答：

{
  "currentJob": {
    "title": "推斷的當前職業",
    "reason": "簡短解釋"
  },
  "alternativeJob": {
    "title": "想像的替代職業",
    "reason": "簡短解釋"
  }
}`,
  },
];

export default initialLLMNodeData;
