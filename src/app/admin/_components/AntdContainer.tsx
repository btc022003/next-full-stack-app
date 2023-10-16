'use client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { StyleProvider } from "@ant-design/cssinjs";
import 'antd/dist/reset.css';

function AntdContainer({ children }: any) {
  return (<StyleProvider ssrInline={true} hashPriority="high">
      <ConfigProvider locale={zhCN}>
        {children}
      </ConfigProvider>
    </StyleProvider>);
}

export default AntdContainer;
