import React, { ReactNode } from 'react';

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className='demo-admin p-8 bg-rose-600 text-white'>
      <h4>这是一个admin页面中的内容</h4>
      {children}
    </div>
  );
}

export default AdminLayout;
