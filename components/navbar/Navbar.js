import { IconSearch } from "../icon/IconSearch";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_searchValue } from '@/stores/itemSlice/itemSlice';
import { useRouter } from 'next/router';

function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchValue = useSelector(state => state.itemSlice.searchValue);
  const updatedCart = useSelector(state => state.itemSlice.myCart);
  const [myCart, setMyCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('myCart'));
    if (cartData) {
      setMyCart(cartData);
    }
  }, [updatedCart]);

  const handleSearch = (keyword) => {
    router.push({
      pathname: '/search',
      query: { keyword: keyword },
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchValue);
    }
  };

  const handleGotoCart = () => {
    router.push({
      pathname: '/cart'
    });
  };


  return (
    <div className="flex bg-gradient-to-b from-red-600 to-orange-500 h-[120px] w-full">
      <div className="flex mx-auto my-auto">
        <input className="rounded-l-sm h-[40px] w-auto md:w-[400px] xl:w-[780px] text-black placeholder-gray-500 py-2 px-3 focus:outline-none" type="text" placeholder="ค้นหาสินค้า" value={searchValue} onChange={(event) => dispatch(SET_searchValue(event.target.value))} onKeyDown={handleKeyDown} />

        <div className="bg-white p-1 rounded-r-sm">
          <div className="my-auto bg-orange-500 px-2 py-1" onClick={() => handleSearch(searchValue)}>
            <IconSearch className="stroke-orange-100" />
          </div>
        </div>
        <div className="ml-6 my-auto relative" onClick={() => handleGotoCart()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
          <div className="bg-white px-1 text-orange-500 rounded-full text-center text-[12px] leading-2 absolute -top-1 left-2 w-5 h-4">{myCart.length}</div>
        </div>
      </div>
    </div >
  );
}

export default Navbar;
