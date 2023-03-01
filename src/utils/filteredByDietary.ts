export const filteredByDietary = (meals: any, filterOptions: any) => {
    let filteredData: any[] = [];

    if (filterOptions.length !== 0) {
        filterOptions.map((option: any) => {
            meals.map((meal: any) => {
                let ingredientsGroup = [];
                meal.ingredients.map((ingredient: any) => {
                    if (ingredient.groups.includes(option)) {
                        ingredientsGroup.push(ingredient);
                    }
                });
                if (meal.ingredients.length === ingredientsGroup.length) {
                    filteredData.push(meal);
                }
            });
        });
    } else {
        filteredData = meals;
    }
    return filteredData;
};
