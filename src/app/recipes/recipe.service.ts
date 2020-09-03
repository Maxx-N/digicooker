import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable( {providedIn : 'root'})

export class RecipeService {
  recipesChanged : Subject<Recipe[]> = new Subject<Recipe[]>();
  
  private recipes: Recipe[] = [
    new Recipe(
      'Steak & Fries',
      'Fry the potatoes. Cook the steak 1 minute per side.',
      'https://live.staticflickr.com/1070/5135326813_88d98ed056_b.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Shrimp cocktail',
      'Catch shrimps and cook them !',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
      [new Ingredient('Shrimp', 26), new Ingredient('Avocado', 5)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.getRecipes()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(newRecipe: Recipe): void {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index:number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }
}
