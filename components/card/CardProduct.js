import { useRouter } from 'next/router';

function CardProduct(props) {
    const router = useRouter();
    const handleClick = (id) => {
        router.push({
            pathname: '/products/[id]',
            query: { id: id }
        });
    };

    return (
        <div className="flex flex-col text-black relative m-[5px] shadow-md bg-white cursor-pointer" onClick={() => handleClick(props.propName.id)}>
            {
                props.propName.thumbnail ? (<div className="flex flex-col bg-cover bg-center w-full h-[188px]" style={{ backgroundImage: `url('${props.propName.thumbnail}')` }}></div>) : (null)
            }
            <div className="flex flex-col p-2">
                <div className="w-full h-[40px]">
                    <p className="text-sm text-black text-start" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>{props.propName.title}</p>
                </div>
                <div className="pb-2 h-4"></div>
                <p className="text-red-400" >฿{props.propName.price}</p>

                <div className="flex flex-row mt-3">
                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <div
                                key={index}
                                className={`text-sm ${index <= props.propName.rating ? 'text-yellow-400' : 'text-gray-300'
                                    } focus:outline-none`}
                            >
                                ★
                            </div>
                        ))}
                    </div>
                    <div className="pl-2 text-xs my-auto">จำนวนคงเหลือ {props.propName.stock} ชิ้น</div>
                </div>
            </div>
            <p className="absolute top-0 right-0 px-1 py-0.5 text-red-500 bg-yellow-200 text-xs" >-{props.propName.discountPercentage}%</p>
        </div>
    );
}

export default CardProduct;