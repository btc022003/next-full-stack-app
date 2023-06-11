import { prisma } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  // 查询数据，根据创建时间倒序排列
  const data = await prisma.goods.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return NextResponse.json({
    success: true,
    errorMessage: '获取数据成功',
    data,
  });
};

export const POST = async (req: NextRequest) => {
  const data = await req.json(); // 获取请求体中传递的json数据
  await prisma.goods.create({
    data,
  });
  return NextResponse.json({
    success: true,
    errorMessage: '创建成功',
    data: {},
  });
};
