const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.OPENAI;
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

// 服务处理逻辑
export default async function handler(req, res) {
  console.log("apiKey", apiKey);
  if (!apiKey) {
    res.status(400).json({ text: "please provide openai key" });
  }
  if (typeof req.body.prompt === "string") {
    try {
      // 参考 https://platform.openai.com/docs/models
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.prompt,
        temperature: 0,
        max_tokens: 1024,
      });
      const resText = response.data.choices[0].text;
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
