import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CardProduct from '../card/CardProduct';

function Product() {
    const [product, setProduct] = useState([])

    const getAllProduct = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            setProduct(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getAllProduct();
    }, []);

    return (
        <div className="flex flex-col">
            <div className="shadow-md bg-white border-b-[4px] border-orange-500 text-orange-500 text-center font-semibold py-4">Product</div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 mt-8 w-full'>
                {product && product.products && product.products.map(item => (
                    <div key={item.id} className="col-span-1">
                        <CardProduct propName={item} />
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Product;