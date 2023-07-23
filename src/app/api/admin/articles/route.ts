import { prisma } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  let per = (req.nextUrl.searchParams.get('per') as any) * 1 || 10;
  let page = (req.nextUrl.searchParams.get('page') as any) * 1 || 1;
  let title = (req.nextUrl.searchParams.get('title') as string) || '';

  const data = await prisma.article.findMany({
    where: {
      title: {
        contains: title, // 模糊查询
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: per, // 取多少条数据
    skip: (page - 1) * per, // 跳过
  });
  const total = await prisma.article.count({
    where: {
      title: {
        contains: title, // 模糊查询
      },
    },
  });
  return NextResponse.json({
    success: true,
    errorMessage: '',
    data: {
      list: data,
      pages: Math.ceil(total / per),
      total,
    },
  });
};

// post请求
export const POST = async (req: NextRequest) => {
  const data = await req.json();
  await prisma.article.create({
    data,
  });
  return NextResponse.json({
    success: true,
    errorMessage: '创建成功',
    data: {},
  });
};
