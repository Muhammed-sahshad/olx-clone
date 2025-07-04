import dropdown_icon from '../../assets/dropdown_icon.svg'
const Categories = () => {
  return (
    <div className=" flex align-middle mt-1 bg-slate-100">
      <div className='flex gap-10 my-1 px-4 bg-white w-full'>
        <div className='flex align-middle gap-2 mt-1'>
          <span className='font-semibold text-sm '>ALL CATEGORIES</span>
          <span>
            <button>
              <img src={dropdown_icon} alt="" />
            </button>
          </span>
        </div>
        <div className='flex gap-5 mt-1 text-sm'>
          <div className='hover:text-cyan-500'>Cars</div>
          <div className='hover:text-cyan-500'>Motorcycles</div>
          <div className='hover:text-cyan-500'>Mobile Phones</div>
          <div className='hover:text-cyan-500'>For Sale: Houses & Apartments</div>
          <div className='hover:text-cyan-500'>Scooters</div>
          <div className='hover:text-cyan-500'>Commercial & Other Vehicles</div>
          <div className='hover:text-cyan-500'>For Rent: Houses & Apartments</div>
        </div>
      </div>
    </div>
  )
}

export default Categories