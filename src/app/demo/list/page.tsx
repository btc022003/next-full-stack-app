import React from 'react';
import { Metadata } from 'next';
import List from './_compnents/List';

export const metadata: Metadata = {
  title: '这是列表页',
  description: '这是一个使用next输出的列表页',
  keywords: 'next.js,react',
};

function ListPage() {
  return (
    <div className='list-page'>
      ListPage
      <List />
    </div>
  );
}

export default ListPage;
