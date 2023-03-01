import { Fragment, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { IconContext } from 'react-icons';

type SetSortOption = (e: string) => void;

const Sorting = ({ options, setSortOption }: { options: string[], setSortOption: SetSortOption }) => {
    const [dropdownShow, setDropdownShow] = useState<Boolean>(false);
    const handleSortOption = (option: string) => {
        setSortOption(option)
        setDropdownShow(false);
    }
    return (
        <div className='relative'> 
            <button onClick={() => setDropdownShow(!dropdownShow)} className='text-lg tracking-wide mb-1 flex items-center'>Sort By {dropdownShow ? <IconContext.Provider value={{ className: "ml-3 w-6 h-6" }}><RiArrowUpSLine /></IconContext.Provider> : <IconContext.Provider value={{ className: "ml-3 w-6 h-6" }}><RiArrowDownSLine /></IconContext.Provider>}</button>
            {dropdownShow && <div className='absolute left-0 inset-x-0 rounded-md bg-slate-100 drop-shadow-lg divide-y divide-solid'>
                {Object.values(options).map((option: string, key: any) => (
                    <button key={key} onClick={() => handleSortOption(option)} className='hover:text-slate-500 w-full text-right tracking-widest px-4 py-2'>{option}</button>
                ))}
            </div>}
        </div>

    )
}

export default Sorting;