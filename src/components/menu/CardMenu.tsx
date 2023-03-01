import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Meals, MenuIngredients } from "../../types/types";
import { RxDoubleArrowUp, RxDoubleArrowDown } from "react-icons/rx";
import { IconContext } from "react-icons";
import { GiHotMeal } from "react-icons/gi";
import ButtonFullCard from "./ButtonFullCard";
import Ingredient from "./Ingredient";

const CardMenu = (meal: Meals) => {
  const [fullCard, setFullCard] = useState<Boolean>(false);

  return (
    <div className="relative h-72 w-60 bg-orange-100 ring-1 ring-orange-400 drop-shadow-xl rounded-xl p-3 text-center">
      <IconContext.Provider value={{ className: "w-24 h-24 mx-auto absolute top-12 inset-x-0 text-red-400" }}>
        <GiHotMeal />
      </IconContext.Provider>
      {fullCard ? (
        <ButtonFullCard className="top-4" onClick={() => setFullCard(!fullCard)}>
          <RxDoubleArrowDown size={16} />
        </ButtonFullCard>
      ) : (
        <ButtonFullCard className="bottom-16" onClick={() => setFullCard(!fullCard)}>
          <RxDoubleArrowUp size={16} />
        </ButtonFullCard>
      )}
      <div className={`${fullCard ? "h-full bg-orange-200" : "h-20 bg-white/40"} flex flex-col justify-center items-center absolute bottom-0 inset-x-0 rounded-xl`}>
        <span className="p-3 font-mono font-semibold text-orange-500">
          {meal.name}
        </span>
        <ul className={`${fullCard ? "block" : "hidden"} max-h-32 overflow-auto`}>
          {React.Children.toArray(
            meal.ingredients.map((ingredient: MenuIngredients) => (
              <Ingredient {...ingredient} />
            ))
          )}
        </ul>
      </div>
      <Link
        to={`/menu/${meal.id}`}
        className="absolute -bottom-12 inset-x-0 ring-1 ring-orange-400 hover:bg-orange-400 text-orange-500 hover:text-white rounded-xl py-2"
      >
        Order Now
      </Link>
    </div>
  );
};

export default CardMenu;
