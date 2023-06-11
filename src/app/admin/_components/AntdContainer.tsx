'use client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';

function AntdContainer({ children }: any) {
  return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
}

export default AntdContainer;
