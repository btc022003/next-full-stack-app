import { NextRequest, NextResponse } from 'next/server';
import dayjs from 'dayjs';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';

const saveFile = async (blob: File) => {
  const dirName = '/uploads/' + dayjs().format('YYYY-MM-DD');
  const uploadDir = path.join(process.cwd(), 'public' + dirName); // 拼接生成目录
  fs.mkdirSync(uploadDir, {
    recursive: true,
  }); // 创建目录
  const fileName = randomUUID() + '.png';
  const arrayBuffer = await blob.arrayBuffer();
  fs.writeFileSync(uploadDir + '/' + fileName, new DataView(arrayBuffer)); // 存本地
  return dirName + '/' + fileName;
};

export const POST = async (req: NextRequest) => {
  const data = await req.formData();
  const fileName = await saveFile(data.get('file') as File);
  return NextResponse.json({
    success: true,
    errorMessage: '文件上传成功',
    data: fileName,
  });
};
