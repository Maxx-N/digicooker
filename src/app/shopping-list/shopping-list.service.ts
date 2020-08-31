import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged: EventEmitter<Ingredient[]> = new EventEmitter<
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
    this.ingredientsChanged.emit(this.getIngredients());
  }

  addManyIngredients(ingredients: Ingredient[]): void {
    // ingredients.forEach((ingredient) => {
    //   this.addIngredient(ingredient);
    // });
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.getIngredients());
  }
}
