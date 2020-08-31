import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Test recipe',
      'This is only a sample',
      'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png'
    ),
    new Recipe(
      'Shrimp cocktail',
      'Catch shrimps and cook them !',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'
    ),
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
