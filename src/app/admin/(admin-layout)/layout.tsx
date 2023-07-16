import React from 'react';
import AntdAdmin from '../_components/AntdAdmin';

function AdminLayout({ children }: any) {
  return (
    <>
      <AntdAdmin>{children}</AntdAdmin>
    </>
  );
}

export default AdminLayout;
