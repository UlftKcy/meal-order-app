import React, { Fragment, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { fetchIngredients } from "../../service/api";
import { Ingredients, Meals } from "../../types/types";
import dietaryGroups from "../../utils/dietaryGroups";
import { JoinMealsIngredients } from "../../utils/joinMealsIngredients";
import { filteredByDietary } from "../../utils/filteredByDietary";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";

const FilterModal = ({ isShowing, hide }: { isShowing: boolean, hide: any }) => {
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<any[]>([]);
  const { status, data, error }: UseQueryResult<Ingredients[], Error> =
    useQuery(["ingredients"], fetchIngredients);

  // join meals with dietary groups(vegan,vegetarian)
  const getFilteredMeals = JoinMealsIngredients();

  let updateQueryData = [];
  if (selectedFilterOptions) {
    updateQueryData = filteredByDietary(getFilteredMeals, selectedFilterOptions);
  }

  if (status === "loading") {
    return <span>...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  const dietaries = dietaryGroups(data);

  return (
    <Fragment>
      {isShowing ? (
        <div className="z-40 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto p-5 drop-shadow-2xl rounded-lg">
          <div className="sm:h-[calc(100%-3rem)] max-w-4xl my-6 mx-auto relative">
            <div
              className="relative flex flex-col w-full px-5 bg-slate-100 bg-clip-padding rounded-md outline-none text-current">
              <div
                className="flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                <h5 className="text-xl font-medium leading-normal text-gray-800">
                  Filter Menu
                </h5>
                <button type="button" onClick={hide}>
                  <GrClose />
                </button>
              </div>
              <div className="relative">
                <div className="flex flex-col sm:flex-row border-b border-b-slate-300">
                  <span className="mb-2 text-lg mr-10 font-semibold text-slate-600">Dietary</span>
                  {React.Children.toArray(
                    [...dietaries].map((value: string[]) => (
                      <label htmlFor="dietary" className="flex items-center mb-2">
                        <input
                          className="accent-orange-600 w-5 h-5"
                          type="checkbox"
                          name="dietary"
                          id="dietary"
                          value={value}
                          onChange={(e) => e.target.checked ? setSelectedFilterOptions([...selectedFilterOptions, e.target.value,]) :
                            setSelectedFilterOptions(selectedFilterOptions.filter((option) => option !== e.target.value))
                          }
                        />
                        <span className="mx-3">{value}</span>
                      </label>
                    ))
                  )}
                </div>
                {updateQueryData.length !== 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 py-4">
                    {React.Children.toArray(updateQueryData.map((meal: Meals) => (
                      <Link
                        to={`/menu/${meal.id}`}
                        className="ring-1 ring-orange-400 hover:bg-orange-400 text-orange-500 hover:text-white rounded-xl p-2"
                      >
                        {meal.name}
                      </Link>
                    )))}
                  </div>
                ) : (
                  <div className="w-full h-48 bg-slate-200 flex justify-center items-center m-5">
                    No Meals
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      ) : null}
    </Fragment>
  )

}
export default FilterModal;