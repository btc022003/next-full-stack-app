'use client';
import React from 'react';

// 我的项目中目前安装有tailwindcss

const menuData = [
  {
    id: '1',
    name: '看板',
  },
  {
    id: '2',
    name: '商品管理',
    children: [
      {
        id: '2-1',
        name: '商品分类',
      },
      {
        id: '2-2',
        name: '商品信息',
        children: [
          {
            id: '2-2-1',
            name: '商品列表',
          },
          {
            id: '2-2-2',
            name: '商品编辑',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: '用户信息',
    children: [
      {
        id: '3-1',
        name: '用户列表',
      },
      {
        id: '3-2',
        name: '登陆记录',
      },
    ],
  },
];

type MenuItem = {
  id: string;
  name: string;
  children?: MenuItem[];
};

function Menu(props: { data: MenuItem[] }) {
  return (
    <>
      <ul style={{ paddingLeft: '16px' }}>
        {props.data.map((item) => {
          return (
            <li key={item.id}>
              <div
                className='title'
                onClick={(event) => {
                  // 点击之后，可以直接操作dom
                  // 当前子项的显示状态
                  const currentDisplay =
                    event.currentTarget.parentElement?.querySelector('ul')
                      ?.style.display;

                  const childrenNode =
                    event.currentTarget.parentElement?.querySelector('ul');
                  if (childrenNode) {
                    // 改变当前子节点的显示状态
                    childrenNode.style.display =
                      currentDisplay == 'none' ? '' : 'none';
                  }
                  // 改变展开符号
                  event.currentTarget.innerText =
                    currentDisplay == 'none'
                      ? event.currentTarget.innerText.replace('+', '-')
                      : event.currentTarget.innerText.replace('-', '+');
                }}
              >
                {item.name}
                {item.children && '-'}
              </div>
              {/* 此处判断有没有子节点，如果有，那么继续循环生成自身；递归 */}
              {item.children && <Menu data={item.children} />}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function MenuPage() {
  return (
    <div>
      <h1>menu-demo</h1>
      <Menu data={menuData} />
      {/* <ul style={{ paddingLeft: '16px' }} className=' bg-slate-500 text-white'>
        <li>
          <div className='title'>看板</div>
        </li>
        <li>
          <div className='title'>商品管理-</div>
          <ul style={{ paddingLeft: '16px' }}>
            <li>
              <div className='title'>商品分类</div>
            </li>
            <li>
              <div className='title'>商品信息-</div>
              <ul style={{ paddingLeft: '16px' }}>
                <li>
                  <div className='title'>商品列表</div>
                </li>
                <li>
                  <div className='title'>商品编辑</div>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <div className='title'>用户信息</div>
        </li>
      </ul> */}
    </div>
  );
}

export default MenuPage;
