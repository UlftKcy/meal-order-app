import { Ingredients } from "../types/types";

const dietaryGroups = (data: any) => {
    let dietarySet: any = new Set();
    data?.map((ingredients: Ingredients) =>
        ingredients.groups?.map((group) => dietarySet.add(group))
    );
    return dietarySet;
};

export default dietaryGroups;
