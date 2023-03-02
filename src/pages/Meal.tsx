import React, { SyntheticEvent, useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Meals } from "../types/types";
import { UseQueryResult, useQuery } from "react-query";
import { fetchMeal } from "../service/api";
import Loader from "../components/Loader";
import Search from "../components/Search";
import { searchMealByBudget } from "../utils/searchMealByBudget";

const Meal = () => {
  let { id } = useParams<{ id: any }>();
  const [currentOptions, setCurrentOptions] = useState<any[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);

  const costByQuality = useCallback((quality: string) => {
    let cost = 0;
    switch (quality) {
      case "high":
        cost = 0;
        break;
      case "medium":
        cost = 0.05;
        break;
      case "low":
        cost = 0.1;
        break;
    }
    return cost;
  }, []);

  const scoreByQuality = useCallback((quality: string) => {
    let score = 0;
    switch (quality) {
      case "high":
        score = 30;
        break;
      case "medium":
        score = 20;
        break;
      case "low":
        score = 10;
        break;
    }
    return score;
  }, []);

  // price calculation
  const priceCalc = useCallback((options: any) => {
    const totalPrice = options.reduce((acc: any, option: any) => acc + (costByQuality(option.quality) + (parseInt(option.quantity) / 1000) * option.price), 0);
    setPrice(totalPrice.toFixed(2))
  }, [costByQuality]);

  const handlePrice = useMemo(() => priceCalc(currentOptions), [currentOptions, priceCalc]);

  // score calculation
  const scoreCalc = useCallback((options: any) => {
    const totalScore = options.reduce((acc: any, option: any) => acc + scoreByQuality(option.quality) / options.length, 0);
    setScore(totalScore.toFixed(2))
  }, [scoreByQuality]);

  const handleScore = useMemo(() => scoreCalc(currentOptions), [currentOptions, scoreCalc]);

  // fetch current meal
  const { status, data, error }: UseQueryResult<Meals | any, Error> = useQuery(["meal", id], () => fetchMeal(id), { enabled: !!id });

  // fetch meal loading & error
  if (status === "loading") {
    return <Loader size={36}/>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }


  // search meal
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    searchMealByBudget(budget, data)
  }

  const ingredientInMeal = (options: string[], quantity: string, key: string) => {
    return React.Children.toArray(
      options.map((option: any) => (
        <div className="custom-form-radio col-span-1 flex items-center">
          <input
            className="peer"
            type="radio"
            name={key}
            value={option.price}
            onChange={(e) => currentOptions.find((currentOption) => currentOption.key === key) ? setCurrentOptions([...currentOptions, Object.assign(currentOptions[parseInt(key)], { key: key, price: e.target.value, quality: option.quality, quantity: quantity })].slice(0, 3)) :
              setCurrentOptions([...currentOptions, { key: key, price: e.target.value, quality: option.quality, quantity: quantity }])}
          />
          <label
            htmlFor={key}
            className="relative peer-checked:text-red-400 text-lg font-bold text-slate-400 ml-2"
          >
            ${option.price} <span className="text-xs absolute bottom-3 ml-1">{option.quality}</span>
          </label>
        </div>
      ))
    );
  };

  return (
    <div className="sm:w-2/3 py-3 px-6 mx-auto mt-5">
      <div className="flex justify-between items-center flex-wrap mb-5">
        <h4 className="text-lg uppercase text-orange-400 font-bold tracking-wider">
          {data?.name}
        </h4>
        <Search value={budget} setSearch={setBudget} onSubmit={handleSubmit} />
        <div className="flex flex-col pr-0 sm:pr-16 text-lg">
          <span className="text-slate-500">
            Quality Score:
            <span className="text-red-500 ml-2 font-semibold">{score} <span className="text-xs text-slate-400">(out of 30)</span></span>
          </span>
          <span className="text-slate-500">
            Price:
            <span className="text-red-500 ml-2 font-semibold">${price}</span>
          </span>
        </div>
      </div>
      <div>
        {data?.ingredients?.map((ingredient: any, key: any) => {
          return (
            <div
              key={key}
              className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 mb-3 ring-1 ring-slate-300 p-5"
            >
              <div className="col-span-1 sm:col-span-3 lg:col-span-2">
                <span className="inline-block text-lg font-bold text-slate-600 mb-5 lg:mb-0">
                  {ingredient.name}
                </span>
                <span className="text-sm ml-2">
                  ({ingredient?.quantity}-{ingredient?.quantity_type})
                </span>
              </div>
              {/* 'key' parameter provides that select only a ingredient by quality on row  */}
              {ingredientInMeal(ingredient.options, ingredient.quantity, key)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Meal;
