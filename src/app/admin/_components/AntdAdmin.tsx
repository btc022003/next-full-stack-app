'use client';
import { useState } from 'react';
import { Layout, Menu, Button, theme, ConfigProvider } from 'antd';
// import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
const { Header, Sider, Content } = Layout;

function AntdAdmin({ children }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const nav = useRouter();
  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className='demo-logo-vertical' />
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['1']}
            onClick={({ key }) => {
              nav.push(key);
            }}
            items={[
              {
                key: '/admin/dashboard',
                icon: <DashboardOutlined />,
                label: '看板',
              },
              {
                key: '/admin/users',
                icon: <UserOutlined />,
                label: '用户信息',
              },
              {
                key: '/admin/articles',
                icon: <UploadOutlined />,
                label: '文章管理',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '12px',
              padding: '8px',
              minHeight: 280,
              background: colorBgContainer,
              overflow: 'auto',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AntdAdmin;
