import Document, { Head, Main, NextScript } from 'next/document';

// 当前组件类
export default class _document extends Document {
  public render = (): JSX.Element => {
    return (
      <html lang="zh-CN">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes"/>
          <meta name="renderer" content="webkit" />
          <meta name="force-rendering" content="webkit" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="theme-color" content="#eab105" />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                var userAgent = navigator.userAgent;
                var isIECore = userAgent.indexOf('Trident') > -1;
                var isIE11 = isIECore && userAgent.indexOf('rv:11.0') > -1;
                // 如果是 ie 内核, 并且版本小于 11, 提醒升级浏览器
                if (isIECore && !isIE11) {
                  alert('您当前的浏览器版本过低, 为了页面能正常的加载, 请升级浏览器!');
                }`
            }}
          />

          {/* swiper plugin */}
          <link
            rel="stylesheet"
            href="//cdn.staticfile.org/Swiper/4.5.0/css/swiper.min.css"
          />
          <script src="//cdn.staticfile.org/Swiper/4.5.0/js/swiper.min.js" />
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </html>
    );
  };
}
