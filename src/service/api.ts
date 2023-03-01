import axios from "axios";
import { FetchIngredientsResponse, FetchMealsResponse, Meals } from "../types/types";

export const fetchMeals = async () => {
    try {
        const response = await axios.get<FetchMealsResponse>("/listMeals");
        return response.data;
    } catch (error: any) {
        throw new Error("Something is wrong", { cause: error });
    }
};

export const fetchIngredients = async () => {
    try {
        const response = await axios.get<FetchIngredientsResponse>("/listIngredients");
        return response.data;
    } catch (error: any) {
        throw new Error("Something is wrong", { cause: error });
    }
};

export const fetchMeal = async (id: string) => {
    try {
        const response = await axios.get<Meals>(`/get/${id}`)
        return response.data;
    } catch (error: any) {
        throw new Error("Something is wrong", { cause: error });
    }
};
