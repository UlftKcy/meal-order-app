import React, { SyntheticEvent } from 'react';

interface ISearchTypes {
    value: number
    setSearch: (event: any) => void;
    onSubmit: (e: SyntheticEvent) => void
}

const Search = (props: ISearchTypes) => {
    return (
        <div className="relative w-full sm:w-2/4 xl:w-1/4 ring-1 ring-slate-400 py-1 px-2 my-5 sm:my-2 rounded-md">
            <div className="absolute">
                <svg className="absolute top-0.5 text-slate-400 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>
            <label htmlFor="searchMeal" className='absolute -top-6 left-0 text-sm text-slate-400 tracking-wide'>Enter a budget</label>
            <form onSubmit={props.onSubmit}>
                <input name='searchMeal' type="number" value={props.value} onChange={(e) => props.setSearch(parseInt(e.target.value))} placeholder="Enter a budget" className='peer w-full pl-8 outline-none rounded-md' />
                <button type='submit' className='absolute right-2 inset-y-1 font-semibold bg-orange-500 hover:bg-orange-400 text-white px-2 py-1 text-xs tracking-wide rounded-lg'>Search</button>
                <div className='absolute invisible peer-focus:visible text-sm text-orange-400 mt-2'>Find out the highest-quality version of a meal</div>
            </form>
        </div>
    )
}

export default Search;