'use client';

import React, { ReactNode, useState } from 'react';
import { Layout } from 'antd';

import MenuBar from '@/components/layout/MenuBar';
import SidebarLogo from '@/components/layout/SidebarLogo';
import dynamic from 'next/dynamic';

const LogoutButton = dynamic(() => import('@/components/ui/LogoutButton'), {
  ssr: false,
});

const { Content, Sider } = Layout;

const AppLayout = ({
  children,
  variant = 'card',
}: {
  children: ReactNode;
  /** 'card' wraps children in the white content panel; 'plain' lets them fill the content area */
  variant?: 'card' | 'plain';
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        width={220}
        collapsedWidth={100}
      >
        <SidebarLogo collapsed={collapsed} />
        <MenuBar />
        <LogoutButton collapsed={collapsed} />
      </Sider>
      <Layout>
        {variant === 'plain' ? (
          <Content style={{ display: 'flex', flexDirection: 'column' }}>
            {children}
          </Content>
        ) : (
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {children}
            </div>
          </Content>
        )}
      </Layout>
    </Layout>
  );
};

export default AppLayout;
