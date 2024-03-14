/* eslint-disable react/no-unescaped-entities */
import CardProduct from '@/components/card/CardProduct';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { SET_search, SET_searchValue } from '@/stores/itemSlice/itemSlice';

function SearchPage() {
    const [product, setProduct] = useState([])
    const dispatch = useDispatch();
    const router = useRouter();
    const keyword = router.query.keyword;
    const searchProduct = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${keyword}`);
            const data = await response.json();
            setProduct(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (keyword) {
            dispatch(SET_searchValue(keyword))
            searchProduct();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword]);

    return (
        <div className='bg-white pb-8'>
            <div className='flex flex-row mx-4 md:mx-[20%] text-start bg-white pt-8 text-black'>
                <p>ค้นหา</p>
                <p>'</p>
                <p className='text-red-500'>{keyword}</p>
                <p>'</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 mx-4 md:mx-[20%] mt-8'>
                {product && product.products && product.products.map(item => (
                    <div key={item.id} className="col-span-1">
                        <CardProduct propName={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;