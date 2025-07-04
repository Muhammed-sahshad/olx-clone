
import like_icon from "../assets/like_icon.svg";
import { displayDate } from "../utils/dateUtils";

interface Product {
  id: string
  category: string;
  name: string;
  description: string;
  price: string;
  location:string;
  images: string[];
  createdAt: string;
}

interface ProductDetailsProps {
  product: Product;
}

const ProductCard = ({product}:ProductDetailsProps) => {

  return (
    <div className="border rounded-md p-2">
        <div className='relative '>
            <img src={product.images[0]} alt=""  className="w-[265px] h-[175px] object-cover" />
            <button className='absolute top-1 right-1 bg-white rounded-full p-1'>
            <img  src={like_icon} alt="" />
            </button>
        </div>
        <div className='flex flex-col px-2 pt-2'>
        <span className='font-bold text-xl'>₹ {product.price}</span>
        <span className='my-1 text-gray-600 text-[13px] font-medium'>{product.name}</span>
        <div className='flex justify-between align-bottom text-[10px] text-gray-600'>
            <span>{product.location}</span>
            <span>{displayDate(product.createdAt)}</span>
        </div>
        </div>
    </div>
  )
}

export default ProductCard