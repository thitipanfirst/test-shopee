import React from 'react';
import { useSelector } from 'react-redux';
import ModalImage from './ModalImage';

const Modal = () => {
    const openImage = useSelector(state => state.itemSlice.openImage);

    return (
        <div className='absolute z-[1101]'>
            {openImage && (
                <div
                    className={`fixed top-0 right-0 left-0 w-full h-full bg-black duration-1000 ease-in-out opacity-50`}
                ></div>
            )}
            {openImage && <ModalImage />}
        </div >
    )
};

export default Modal