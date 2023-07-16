import { NextRequest, NextResponse } from 'next/server';

export const POST = (request: NextRequest) => {
  return NextResponse.json(
    {
      success: true,
      errorMessage: '登陆成功',
    },
    {
      headers: {
        'Set-Cookie': 'admin-token=123;Path=/',
      },
    }
  );
};
