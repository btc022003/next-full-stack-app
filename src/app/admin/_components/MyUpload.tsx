import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

// const getBase64 = (img: RcFile, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

// 组件接受的属性
type Props = {
  imageUrl: string;
  setImageUrl: any;
};

const MyUpload = ({ imageUrl, setImageUrl }: Props) => {
  const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState<string>();

  // 文件选择改变之后执行
  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj as RcFile, (url) => {
      //   setLoading(false);
      //   setImageUrl(url);
      // });
      setImageUrl(info.file.response.data);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        name='file'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        action='/api/common/upload'
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default MyUpload;
