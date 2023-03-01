import React, { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { fetchMeals } from "../service/api";
import { Meals } from "../types/types";
import CardMenu from "../components/menu/CardMenu";
import Sorting from "../components/menu/Sorting";
import FilterModal from "../components/menu/FilterModal";
import { useModal } from "../hooks/useModal";
const Menu = () => {
  const options: string[] = ["A-Z", "Z-A"];
  const [sortOption, setSortOption] = useState<string>(options[0]);
  const { isShowing, toggle } = useModal();
  const { status, data, error }: UseQueryResult<Meals[] | any, Error> = useQuery('meals', fetchMeals)

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  // sorted meals
  const sortedMeals = sortOption === "A-Z" ? data.sort((a: any, b: any) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) : data.sort((a: any, b: any) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1)

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap sticky top-0 py-2 sm:py-7 border-b border-b-slate-300 sm:px-28 z-50 mb-3 bg-white">

        <div className="flex items-center sm:justify-end justify-center mt-5 sm:mt-0">
          <button onClick={toggle}
            className="text-lg mb-1 mr-10 hover:text-slate-600 hover:underline underline-offset-4"
          >
            Filter
          </button>
          <FilterModal isShowing={isShowing} hide={toggle} />
          <Sorting options={options} setSortOption={setSortOption} />
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 w-fit p-0 sm:p-5 mx-auto">
          {React.Children.toArray(
            sortedMeals?.map((meal: Meals) => <CardMenu {...meal} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;