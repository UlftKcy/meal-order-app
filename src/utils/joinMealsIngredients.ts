import { useQueryClient } from "react-query";
import { Ingredients, Meals } from "../types/types";

export const JoinMealsIngredients = () => {
    const queryClient = useQueryClient();
    const queryIngredients: Ingredients | any = queryClient.getQueryData("ingredients");
    const queryMeals: Meals[] | any = queryClient.getQueryData("meals");

    queryMeals.map((meal: any) => {
        meal.ingredients?.map((mealIngredient: any) => {
            queryIngredients?.map((ingredient: any) => {
                if (mealIngredient.name === ingredient.name) {
                    Object.assign(mealIngredient, { groups: ingredient?.groups ?? "" });
                }
            })
        })
    })

    return queryMeals;
}