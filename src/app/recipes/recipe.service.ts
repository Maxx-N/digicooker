import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable( {providedIn : 'root'})

export class RecipeService {
  recipesChanged : Subject<Recipe[]> = new Subject<Recipe[]>();
  
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Steak & Fries',
  //     'Fry the potatoes. Cook the steak 1 minute per side.',
  //     'https://live.staticflickr.com/1070/5135326813_88d98ed056_b.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Shrimp cocktail',
  //     'Catch shrimps and cook them !',
  //     'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
  //     [new Ingredient('Shrimp', 26), new Ingredient('Avocado', 5)]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private store : Store<fromShoppingList.AppState>) {}

  setRecipes (recipes : Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.getRecipes()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
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
