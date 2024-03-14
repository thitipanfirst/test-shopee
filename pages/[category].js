import CardProduct from '@/components/card/CardProduct';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
function CategoryPage() {
    const router = useRouter();
    const { category } = router.query;
    const [categoryValue, setCategoryValue] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await response.json();
            setCategoryValue(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    return (
        <div className='bg-white pb-8'>
            <div className='mx-4 md:mx-[20%] text-start bg-white pt-8 text-2xl text-black font-semibold'>{category}</div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 mx-4 md:mx-[20%] mt-8'>
                {categoryValue && categoryValue.products && categoryValue.products.map(item => (
                    <div key={item.id} className="col-span-1">
                        <CardProduct propName={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;