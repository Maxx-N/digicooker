import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http
      .put('https://digicooker-971ff.firebaseio.com/recipes.json', recipes)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://digicooker-971ff.firebaseio.com/recipes.json')
      //   .pipe(
      //     map((responseData) => {
      //       const recipesArray: Recipe[] = [];
      //       for (const key in responseData) {
      //         if (responseData.hasOwnProperty(key)) {
      //           recipesArray.push({ ...responseData[key], id: key });
      //         }
      //       }
      //       return recipesAr ray;
      //     })
      //   )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
            this.recipeService.setRecipes(recipes);
            console.log(recipes);
          })
      )
      
  }
}
