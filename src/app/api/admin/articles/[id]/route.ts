import { prisma } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: any) => {
  const { id } = params; // 路由中传递的参数
  const data = await req.json(); // 请求体中传递的数据
  await prisma.article.update({
    where: { id },
    data,
  });
  return NextResponse.json({
    success: true,
    errorMessage: '修改成功',
  });
};

export const DELETE = async (req: NextRequest, { params }: any) => {
  const { id } = params;
  await prisma.article.delete({
    where: { id },
  });
  return NextResponse.json({
    success: true,
    errorMessage: '删除成功',
  });
};
