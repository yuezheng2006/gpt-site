import Link from "next/link";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <h1 className="home-title"> GPT-3 开放功能演示</h1>
      <div className="nav">
        <p>
          <Link href="/">文本</Link>
          <Link href="/art">绘画</Link>
        </p>
      </div>
      <Component {...pageProps} />
      <div className="footer">
        <h5>Author: yuezheng2006@gmail.com</h5>
      </div>
    </>
  );
}
