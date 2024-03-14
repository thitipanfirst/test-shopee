import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_modal } from '@/stores/itemSlice/itemSlice';

const ModalImage = () => {
    const dispatch = useDispatch()
    const openImage = useSelector(state => state.itemSlice.openImage);
    const image = useSelector(state => state.itemSlice.image);
    const images = useSelector(state => state.itemSlice.images);
    const title = useSelector(state => state.itemSlice.title);

    const indexImageValue = useSelector(state => state.itemSlice.indexImage)
    const [indexImage, setIndexImage] = useState(indexImageValue);

    const goToPreviousImage = () => {
        if (indexImage <= 0) {
            setIndexImage(images.length - 1);
        } else {
            setIndexImage(indexImage - 1);
        }
    };

    const goToNextImage = () => {
        if (indexImage >= images.length - 1) {
            setIndexImage(0);
        } else {
            setIndexImage(indexImage + 1);
        }
    };

    return (
        <div className='w-full h-full'>
            <div className='flex flex-row gap-6 fixed top-0 z-40 w-full h-full right-0 justify-center' onClick={() => dispatch(CLOSE_modal())}>
                <div className={`flex flex-col xl:flex-row my-auto bg-white z-40 w-[80%] xl:w-[60%] gap-4 h-[90%] xl:h-[70%] rounded-xl transition-transform duration-300 transform p-4 ${openImage ? 'translate-y-0' : 'translate-y-full'}`} onClick={(event) => event.stopPropagation()}>
                    <div className="flex flex-col overflow-y-auto bg-cover bg-center w-full xl:w-[80%] h-[450px] xl:h-full" style={{ backgroundImage: `url('${images[indexImage]}')` }}>
                        <div className='flex flex-row justify-between my-auto'>
                            <button className='text-white h-10 w-10 bg-black p-2 bg-opacity-50' onClick={() => goToPreviousImage()}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg></button>
                            <button className='text-white h-10 w-10 bg-black p-2 bg-opacity-50' onClick={() => goToNextImage()}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg></button>
                        </div>
                    </div>

                    <div className='flex flex-col py-6'>
                        <div className='text-black'>{title}</div>
                        <div className='flex flex-wrap mt-4 gap-2 mb-auto'>
                            {images ? images.map((option, index) => (
                                option ? (<div key={index} className={`${indexImage === index ? 'border-[2px] border-red-500' : ''} flex flex-col overflow-y-auto bg-cover bg-center w-[82px] h-[82px] p-[5px]`} style={{ backgroundImage: `url('${option}')` }} onClick={() => setIndexImage(index)}></div>) : (null)
                            )) : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default ModalImage