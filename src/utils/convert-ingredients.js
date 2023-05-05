const adjustPortion = (unit, recipePortions = 1, desiredPortions = 1) => ((unit / recipePortions) * desiredPortions).toFixed(2)

const convertIngredients = function (
  ingredientsArray,
  recipePortions,
  desiredPortions
) {
  return ingredientsArray.map((ingredient) => {

    const quantity = ingredient.quantity 
    //
    const measure =
      !ingredient.measure || ingredient.measure === '<unit>'
        ? ''
        : ingredient.measure;
    //
    const textArr = [adjustPortion(quantity, recipePortions, desiredPortions), measure, ingredient.food.toLowerCase()]

    const text = quantity !== 0 ? textArr.join(' ') : `Some ${textArr[2]}`

    const weight = adjustPortion(ingredient.weight, recipePortions, desiredPortions);


    return {
      text,
      weight,
    };
  });
}

export {adjustPortion, convertIngredients}