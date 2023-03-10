import React, { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { fetchMeals } from "../service/api";
import { Meals } from "../types/types";
import CardMenu from "../components/menu/CardMenu";
import Sorting from "../components/menu/Sorting";
import FilterModal from "../components/menu/FilterModal";
import { useModal } from "../hooks/useModal";
import Loader from "../components/Loader";


const Menu = () => {
  const options: string[] = ["A-Z", "Z-A"];
  const [sortOption, setSortOption] = useState<string>(options[0]);
  const { isShowing, toggle } = useModal();
  const { status, data, error }: UseQueryResult<Meals[] | any, Error> = useQuery('meals', fetchMeals);

  if (status === 'loading') {
    return <span><Loader size={48} /></span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  // meal sort
  const meals =  data.sort((a: any, b: any) => {
    let mealA = a.name.toLowerCase();
    let mealB = b.name.toLowerCase();
    return sortOption === "A-Z" ? mealA > mealB ? 1 : -1 : mealA > mealB ? -1 : 1
  });
  
  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row md:justify-end justify-center items-center flex-wrap sticky top-0 z-50 mb-5 py-3 bg-white">
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
      <div className="grid auto-rows-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 w-fit p-0 sm:p-5 mx-auto">
        {React.Children.toArray(
          meals.map((meal: Meals) => <CardMenu {...meal} />)
        )}
      </div>
    </div>
  );
};

export default Menu;