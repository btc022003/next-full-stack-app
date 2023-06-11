import React from 'react';

function DemoLayout({ children }: any) {
  return (
    <div className='list'>
      <h3>这是DemoList页面的母版</h3>
      <hr />
      {children}
    </div>
  );
}

export default DemoLayout;
