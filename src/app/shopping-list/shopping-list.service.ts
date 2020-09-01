import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged: Subject<Ingredient[]> = new Subject<
    Ingredient[]
  >();
  private ingredients: Ingredient[] = [
    new Ingredient('Carrots', 5),
    new Ingredient('Eggplants', 8),
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
  }

  addManyIngredients(ingredients: Ingredient[]): void {
    // ingredients.forEach((ingredient) => {
    //   this.addIngredient(ingredient);
    // });
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients());
  }
}
