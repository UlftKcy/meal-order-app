export interface MenuIngredients {
    name: string,
    quantity: number,
    quantity_type: string
}
export interface Meals {
    id: number,
    name: string,
    ingredients: MenuIngredients[]
}
export interface FetchMealsResponse {
    data: Meals[]
}

export interface Options {
    name: string,
    quality: string,
    price: number,
    per_mount: string,
}
export interface Ingredients {
    name: string,
    groups: string[],
    options: Options[],
}
export interface FetchIngredientsResponse {
    data: Ingredients[]
}
