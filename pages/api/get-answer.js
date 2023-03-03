const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.OPENAI;
const OPENAI_MODEL = "gpt-3.5-turbo"; // 使用的模型
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

// 服务处理逻辑
export default async function handler(req, res) {
  if (!apiKey) {
    res.status(400).json({ text: "please provide openai key" });
  }
  // 获取输入参数
  const content = req.body.prompt;
  if (typeof content === "string") {
    const messages = [
      {"role": "system", "content": "You are a helpful assistant."},
      {
      role: "user",
      content: content.trim()
    }]
    
    try {
      // 参考 https://platform.openai.com/docs/models
      const response = await openai.createChatCompletion({
        model:OPENAI_MODEL,
        messages:messages,
        temperature: 0,
        max_tokens: 1024,
      });
      const resText = response.data.choices[0].message.content;
      
      res.status(200).json({ text: resText });
    } catch (error) {
      let errMsg = "";
      if (error.response) {
        errMsg = error.response.data;
        res.status(error.response.status).json({ text: errMsg });
      } else {
        errMsg = error.message;
        res.status(500).json({ text: errMsg });
      }
    }
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
}
