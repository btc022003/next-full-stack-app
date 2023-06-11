'use client';
import React, { useEffect, useState } from 'react';

type Item = {
  id: number;
  name: string;
};

function List() {
  const [data, setData] = useState<Item[]>([]);
  useEffect(() => {
    fetch('/api/goods')
      .then((res) => res.json())
      .then((res) => setData(res.data));
  }, []);
  return (
    <div className='list'>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default List;
