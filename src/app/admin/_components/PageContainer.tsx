'use client';
import { Card } from 'antd';

function PageContainer({ children, title }: any) {
  return <Card title={title}>{children}</Card>;
}

export default PageContainer;
