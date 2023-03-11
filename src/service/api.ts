import axios from "axios";
import { FetchIngredientsResponse, FetchMealsResponse, Meals } from "../types/types";

const restaurantApi = axios.create({
    baseURL: 'https://apis.career.otsimo.xyz/api/restaurant'
});

export const fetchMeals = async () => {
    try {
        const response = await restaurantApi.get<FetchMealsResponse>("/listMeals");
        return response.data;
    } catch (error: any) {
        throw new Error("Something is wrong", { cause: error });
    }
};

export const fetchIngredients = async () => {
    try {
        const response = await restaurantApi.get<FetchIngredientsResponse>("/listIngredients");
        return response.data;
    } catch (error: any) {
        throw new Error("Something is wrong", { cause: error });
    }
};

export const fetchMeal = async (id: string) => {
    try {
        const response = await restaurantApi.get<Meals>(`/get/${id}`)
        return response.data;
    } catch (error: any) {
        throw new Error("Something is wrong", { cause: error });
    }
};
