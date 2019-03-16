import Document, { Head, Main, NextScript } from 'next/document';

// 当前组件类
export default class _document extends Document {
  public render = (): JSX.Element => {
    return (
      <html lang="zh-CN">
        <Head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <meta httpEquiv="X-UA-Compatible" content="edge"/>
          <meta name="theme-color" content="#eab105"/>
          <meta name="keywords" content="新创文化艺术品"/>
          <meta name="description" content="新文化艺术品"/>
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
          <link rel="stylesheet" href="//cdn.bootcss.com/Swiper/4.5.0/css/swiper.min.css"/>
          <script src="//cdn.bootcss.com/Swiper/4.5.0/js/swiper.min.js"/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </html>
    );
  };
}
