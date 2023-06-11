import React from 'react';

function DemoLayout({ children }: any) {
  return (
    <div className='demo'>
      <h2>这是Demo页面的母版</h2>
      <hr />
      {children}
    </div>
  );
}

export default DemoLayout;
