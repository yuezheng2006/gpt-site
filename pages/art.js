import { useState } from "react";

export default function MyPage() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/get-painting", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });
    const data = await response.json();
    setAnswer(data.text);
    setIsLoading(false);
  }

  function handleChange(e) {
    setPrompt(e.target.value);
  }

  return (
    <div className="container">
      <p>
        图像生成演示基于OpenAi官方Image Generation能力,详情参见{" "}
        <a href="https://platform.openai.com/docs/guides/images/usage">
          OpenAi Image Generation
        </a>
      </p>
      <h1>描述下你想要的绘画关键词</h1>
      <form className="our-form" onSubmit={handleSubmit}>
        <input
          className="prompt-field"
          type="text"
          placeholder="如一个坐在月光下的小女孩"
          onChange={handleChange}
        />
        <button className="prompt-button">确 定</button>
      </form>
      {isLoading && <div className="loading-spinner"></div>}
      <div>
        <h1>生成照片</h1>
        <div className="answer-area">
          {isLoading == false && <img src={answer} />}
        </div>
      </div>
    </div>
  );
}
