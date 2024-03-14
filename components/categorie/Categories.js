import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Categories() {
  const router = useRouter();
  const [categoryValue, setCategoryValue] = useState([])

  const handleClick = (item) => {
    router.push('/[category]', '/' + item);
  };

  const getCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const data = await response.json();
      setCategoryValue(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex flex-col">
      <p className="text-2xl text-black font-semibold">Categories</p>
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-8 2xl:grid-cols-10 mt-6">
        {categoryValue.map(item => (
          <div key={item} className="flex col-span-1 text-black h-[120px] w-[120px] justify-center border cursor-pointer bg-zinc-50 hover:bg-white" onClick={() => handleClick(item)}>
            <p className="my-auto text-center">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;