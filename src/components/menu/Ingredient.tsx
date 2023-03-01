import { MenuIngredients } from '../../types/types'

const Ingredient = (ingredient: MenuIngredients) => {
    return (
        <li className="text-left">
            <span className="text-slate-800">
                {ingredient.name}{" "}
                <span className="text-sm text-slate-600">
                    ({ingredient.quantity} {ingredient.quantity_type})
                </span>
            </span>
        </li>
    )
}

export default Ingredient