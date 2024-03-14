import { SET_Image, SET_Images, SET_amount, SET_myCart, SET_openImage, SET_title } from '@/stores/itemSlice/itemSlice';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ViewItem() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const [categoryValue, setCategoryValue] = useState([])

    const [myCart, setMyCart] = useState([]);

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('myCart'));
        if (cartData) {
            setMyCart(cartData);
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await response.json();
            setCategoryValue(data)
            setImageShow(data.images[0])
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const [imagesShow, setImageShow] = useState('')
    const [amount, setAmount] = useState(1)

    const minus = () => {
        setAmount(prevAmount => (prevAmount <= 0 ? 0 : prevAmount - 1));
    };

    const plus = () => {
        setAmount(prevAmount => (
            prevAmount >= categoryValue.stock - 1 ? categoryValue.stock : prevAmount + 1
        ));
    };

    const handleCart = (data, amount) => {

        const existingItemIndex = myCart.findIndex(item => item.id === data.id);

        if (existingItemIndex !== -1) {
            const updatedCart = myCart.map((item, index) => {
                if (index === existingItemIndex) {
                    const newAmount = Math.min(item.stock, item.amount + amount);
                    return { ...item, amount: newAmount };
                }
                return item;
            });
            localStorage.setItem('myCart', JSON.stringify(updatedCart));
            dispatch(SET_myCart(updatedCart))
        } else {
            const newAmount = Math.min(data.stock, amount);
            const newObject = {
                ...data,
                amount: newAmount
            };
            const updatedCart = [...myCart, newObject];
            localStorage.setItem('myCart', JSON.stringify(updatedCart));
            dispatch(SET_myCart(updatedCart))
        }

    }

    return (
        <div className='flex flex-col pb-8 mx-4 md:mx-[20%]'>
            <div className='flex flex-col xl:flex-row bg-white pb-8 shadow-md rounded-sm mt-8 text-black'>
                <div className='p-4'>
                    <div className="flex flex-col overflow-y-auto bg-cover bg-center w-full xl:w-[450px] h-[450px]" style={{ backgroundImage: `url('${imagesShow}')` }} onClick={() => [dispatch(SET_openImage(true)), dispatch(SET_Image(imagesShow)), dispatch(SET_Images(categoryValue.images)), dispatch(SET_title(categoryValue.title))]}></div>
                    <div className='flex flex-wrap xl:flex-row mt-4 gap-2'>
                        {categoryValue && categoryValue.images ? categoryValue.images.map((option, index) => (
                            option ? (<div key={index} className={`${imagesShow === option ? 'border-[2px] border-red-500' : ''} flex flex-col overflow-y-auto bg-cover bg-center w-[82px] h-[82px] p-[5px]`} style={{ backgroundImage: `url('${option}')` }} onClick={() => [setImageShow(option), dispatch(SET_amount(index))]}></div>) : (null)
                        )) : ''}
                    </div>
                </div>
                <div className="flex flex-col mt-3 px-4 xl:px-0">
                    <div className='text-xl'>{categoryValue.title}</div>
                    <div className='flex flex-row'>
                        <div className='text-orange-500 leading-3 my-auto underline'>{categoryValue.rating}</div>
                        <div className="flex items-center ml-2">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <div
                                    key={index}
                                    className={`text-xl ${index <= categoryValue.rating ? 'text-orange-600' : 'text-gray-300'
                                        } focus:outline-none`}
                                >
                                    ★
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-row ml-2 mt-4'>
                        <div className='text-3xl fond-semibold text-orange-500 my-auto'>฿{categoryValue.price}</div>
                        <div className='bg-orange-500 text-white font-semibold text-xs px-1 py-0.5 rounded-sm my-auto ml-4'>{categoryValue.discountPercentage}% ส่วนลด</div>
                    </div>
                    <div className='flex flex-row gap-2 ml-2 mt-4'>
                        <div>จำนวน</div>
                        <div className='flex flex-row'>
                            <button className='border rounded-sm' onClick={() => minus()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /></svg>
                            </button>
                            <p className='w-20 text-center border-y'>{amount}</p>
                            <button className='border rounded-sm' onClick={() => plus()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                            </button>
                        </div>
                        <div className="pl-2 text-xs my-auto">มีสินค้าทั้งหมด {categoryValue.stock} ชิ้น</div>
                    </div>
                    <button className='bg-orange-50 border border-orange-500 text-orange-500 h-12 px-5 rounded-sm mt-6' onClick={() => handleCart(categoryValue, amount)}>เพิ่มไปยังรถเข็น</button>
                </div>
            </div>

            <div className='flex flex-col bg-white pb-8 shadow-md rounded-sm mt-8 text-black py-6 px-8'>
                <div className='text-lg font-semibold'>ข้อมูลจำเพาะของสินค้า</div>
                <div className='flex flex-row mt-2'>
                    <p className='text-gray-500 w-32'>หมวดหมู่</p>
                    <p className='text-blue-500'>{categoryValue.category}</p>
                </div>
                <div className='flex flex-row mt-2'>
                    <p className='text-gray-500 w-32'>ยี่ห้อ</p>
                    <div>{categoryValue.brand}</div>
                </div>
                <div className='flex flex-row mt-2'>
                    <p className='text-gray-500 w-32'>จำนวนสินค้า</p>
                    <p>{categoryValue.stock}</p>
                </div>
                <div className='text-lg font-semibold mt-6'>รายละเอียดสินค้า</div>
                <div>{categoryValue.description}</div>
            </div>
        </div>
    );
}

export default ViewItem;