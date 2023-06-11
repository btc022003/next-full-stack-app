import { Metadata } from 'next';
import React from 'react';

type Props = {
  params: { id: string };
  searchParams: any;
};

// 可以动态的进行metadata的生成
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  return {
    title: '这是详情页--' + params.id,
  };
}

function ListDetailPage({ params, searchParams }: Props) {
  return (
    <div>
      ListDetailPage--{params.id},query---{searchParams.name}
    </div>
  );
}

export default ListDetailPage;
