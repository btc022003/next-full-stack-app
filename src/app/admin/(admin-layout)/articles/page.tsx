'use client';
import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  Table,
  Modal,
  Space,
  Popconfirm,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

type Article = {
  id: string;
  title: string;
  desc: string;
};

function ArticlePage() {
  const [open, setOpen] = useState(false); // 控制modal显示隐藏
  const [list, setList] = useState<Article[]>([]);
  const [myForm] = Form.useForm(); // 获取Form组件

  const [query, setQuery] = useState({
    per: 10,
    page: 1,
    title: '',
  });
  const [currentId, setCurrentId] = useState(''); // 使用一个当前id变量，表示是新增还是修改
  const [total, setTotal] = useState(0);
  // 如果存在表示修改，不存在表示新增

  // 监听查询条件的改变
  useEffect(() => {
    fetch(
      `/api/admin/articles?page=${query.page}&per=${query.per}&title=${query.title}`
    )
      .then((res) => res.json())
      .then((res) => {
        setList(res.data.list);
        setTotal(res.data.total);
      });
  }, [query]);

  useEffect(() => {
    if (!open) {
      setCurrentId('');
    }
  }, [open]);

  return (
    <Card
      title='文章管理'
      extra={
        <>
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setOpen(true)}
          />
        </>
      }
    >
      <Form
        layout='inline'
        onFinish={(v) => {
          setQuery({
            page: 1,
            per: 10,
            title: v.title,
          });
        }}
      >
        <Form.Item label='标题' name='title'>
          <Input placeholder='请输入关键词' />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} htmlType='submit' type='primary' />
        </Form.Item>
      </Form>
      <Table
        style={{ marginTop: '8px' }}
        dataSource={list}
        rowKey='id'
        pagination={{
          total,
          onChange(page) {
            setQuery({
              ...query,
              page,
              per: 10,
            });
          },
        }}
        columns={[
          {
            title: '序号',
            width: 80,
            render(v, r, i) {
              return i + 1;
            },
          },
          {
            title: '标题',
            dataIndex: 'title',
          },
          {
            title: '简介',
            dataIndex: 'desc',
          },
          {
            title: '操作',
            render(v, r) {
              return (
                <Space>
                  <Button
                    size='small'
                    icon={<EditOutlined />}
                    type='primary'
                    onClick={() => {
                      setOpen(true);
                      setCurrentId(r.id);
                      myForm.setFieldsValue(r);
                    }}
                  />
                  <Popconfirm
                    title='是否确认删除?'
                    onConfirm={async () => {
                      //
                      await fetch('/api/admin/articles/' + r.id, {
                        method: 'DELETE',
                      }).then((res) => res.json());
                      setQuery({ ...query, per: 10, page: 1 }); // 重制查询条件，重新获取数据
                    }}
                  >
                    <Button
                      size='small'
                      icon={<DeleteOutlined />}
                      type='primary'
                      danger
                    />
                  </Popconfirm>
                </Space>
              );
            },
          },
        ]}
      />
      <Modal
        title='编辑'
        open={open}
        onCancel={() => setOpen(false)}
        destroyOnClose={true} // 关闭窗口之后销毁
        maskClosable={false} // 点击空白区域的时候不关闭
        onOk={() => {
          myForm.submit();
        }}
      >
        <Form
          preserve={false} // 和modal结合使用的时候需要加上它，否则不会销毁
          layout='vertical'
          form={myForm}
          onFinish={async (v) => {
            // console.log(v);
            if (currentId) {
              // 修改
              await fetch('/api/admin/articles/' + currentId, {
                body: JSON.stringify(v),
                method: 'PUT',
              }).then((res) => res.json());
            } else {
              await fetch('/api/admin/articles', {
                method: 'POST',
                body: JSON.stringify(v),
              }).then((res) => res.json());
            }

            // 此处需要调接口
            setOpen(false);
            setQuery({ ...query }); // 改变query会重新去取数据
          }}
        >
          <Form.Item
            label='标题'
            name='title'
            rules={[
              {
                required: true,
                message: '标题不能为空',
              },
            ]}
          >
            <Input placeholder='请输入标题' />
          </Form.Item>
          <Form.Item label='简介' name='desc'>
            <Input.TextArea placeholder='请输入简介' />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default ArticlePage;
