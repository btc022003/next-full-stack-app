import { NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest, { params }: any) => {
  return NextResponse.json({
    success: true,
    errorMessage: '获取单条记录:' + params.id,
    data: {},
  });
};
