import { useState } from "react";
import { Meals } from "../types/types"

export const searchMealByBudget = (budget: number, data: Meals | any) => {
    const optionsGroup = []
    for (let i = 0; i < data.ingredients[0]?.options.length; i++) {
        for (let j = 0; j < data.ingredients[1]?.options.length; j++) {
            for (let k = 0; k < data.ingredients[2]?.options.length; k++) {
                optionsGroup.push([data.ingredients[0].options[i], data.ingredients[1].options[j], data.ingredients[2].options[k]]);
            }
        }

    }
    console.log(optionsGroup)
}