import { useState } from "react";

export default function MyPage() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setAnswer("");
    console.log("------handleSubmit---");
    const response = await fetch("/api/get-answer", {
      method: "POST",
      timeout: 20000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    try {
      const data = await response.json();
      if (response.ok) {
        setAnswer(data.text.trim());
      } else {
        setAnswer("搜索出错: " + data.text.error.message);
      }
      setIsLoading(false);
    } catch (error) {
      setAnswer("搜索出错: " + error.message);
      setIsLoading(false);
    }
  }

  function handleChange(e) {
    setPrompt(e.target.value);
  }

  return (
    <div className="container">
      <p>
        文本搜索演示基于GPT-3最新Model,详情参见{" "}
        <a href="https://platform.openai.com/docs/models/gpt-3">
          OpenAi Models
        </a>
      </p>
      <h1>提出你的问题</h1>
      <form className="our-form" onSubmit={handleSubmit}>
        <textarea
          className="prompt-field"
          rows="4"
          cols="50"
          onChange={handleChange}
        />
        <button className="prompt-button">确 定</button>
      </form>
      {isLoading && <div className="loading-spinner"></div>}
      <div>
        <h1>搜索结果</h1>
        <div className="answer-area">{answer}</div>
      </div>
    </div>
  );
}
