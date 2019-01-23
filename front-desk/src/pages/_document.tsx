import Document, { Head, Main, NextScript } from 'next/document';

// 当前组件类
export default class _document extends Document {
  public render = (): JSX.Element => {
    return (
      <html>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
          <link rel="stylesheet" href="/static/swiper/swiper.min.css"/>
          <script src="https://cdn.bootcss.com/Swiper/4.4.6/js/swiper.min.js"></script>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </html>
    );
  };
}
