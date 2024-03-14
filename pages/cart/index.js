import { SET_myCart } from '@/stores/itemSlice/itemSlice';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
    const dispatch = useDispatch();
    const updatedCart = useSelector(state => state.itemSlice.myCart);
    const [myCart, setMyCart] = useState([]);

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('myCart'));
        if (cartData) {
            setMyCart(cartData);
        }
    }, [updatedCart]);

    const updateAmountInArray = (index, newAmount) => {
        setMyCart(prevCart => {
            const updatedCart = [...prevCart];
            updatedCart[index].amount = newAmount;
            return updatedCart;
        });
    };

    const handleDelete = (id) => {
        const updatedCart = [...myCart];
        updatedCart.splice(id, 1);
        setMyCart(updatedCart);
        dispatch(SET_myCart(updatedCart))
        localStorage.setItem('myCart', JSON.stringify(updatedCart));
    }

    return (
        <div className='flex flex-col pb-8 mx-8 md:mx-[20%] xl:mx-[10%] 2xl:mx-[20%] overflow-x-auto'>
            <div className='hidden xl:flex xl:flex-row text-black bg-white px-8 mt-8 py-6'>
                <div className='w-1/3'>สินค้า</div>
                <div className='flex flex-row w-2/3 gap-40 whitespace-nowrap'>
                    <div className='min-w-[40px]'>ราคาต่อชิ้น</div>
                    <div className='min-w-[80px]'>จำนวน</div>
                    <div className='min-w-[40px]'>ราคารวม</div>
                    <div className='min-w-[40px]'>แอคชั่น</div>
                </div>
            </div>

            {myCart && myCart.map((item, index) => (
                <div key={item.id} className='flex flex-col xl:flex-row text-black bg-white px-8 mt-8 py-6'>
                    <div className='flex flex-row xl:w-1/3'>
                        {
                            item.thumbnail ? (<div className="flex flex-col bg-cover bg-center w-20 h-20" style={{ backgroundImage: `url('${item.thumbnail}')` }}></div>) : (null)
                        }
                        <div className="w-full h-[40px] my-auto ml-2">
                            <p className="text-sm text-black text-start" style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>{item.title}</p>
                        </div>
                    </div>
                    <div className='flex flex-col xl:flex-row xl:w-2/3 xl:gap-40 whitespace-nowrap'>
                        <p className="text-red-400 min-w-[40px] my-auto" >฿{item.price.toLocaleString()}</p>
                        <div className='flex flex-col min-w-[80px] my-auto gap-2 mr-auto'>
                            <div className='flex flex-row mx-auto'>
                                <button className='border rounded-sm' onClick={() => updateAmountInArray(index, item.amount <= 0 ? 0 : item.amount - 1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /></svg>
                                </button>
                                <p className='w-20 text-center border-y'>{item.amount}</p>
                                <button className='border rounded-sm' onClick={() => updateAmountInArray(index, item.amount >= item.stock - 1 ? item.stock : item.amount + 1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                </button>
                            </div>
                            <div className="pl-2 text-xs my-auto text-orange-500 mx-auto">เหลือสินค้าอยู่ {item.stock} ชิ้น</div>
                        </div>
                        <div className='min-w-[40px] flex flex-row my-2 xl:mt-0'>
                            <div className='mr-3 block xl:hidden'>ราคารวม</div>
                            <div className='text-red-400 my-auto'>{(item.price * item.amount).toLocaleString()}</div>
                        </div>
                        <button className='bg-red-500 text-white rounded-lg my-auto px-3 py-2' onClick={() => handleDelete(index)}>ลบ</button>
                    </div>
                </div>
            ))
            }
        </div >
    );
}

export default Cart;