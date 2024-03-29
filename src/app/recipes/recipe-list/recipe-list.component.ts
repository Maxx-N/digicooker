import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {Store} from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesChangedSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store : Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    this.recipesChangedSubscription = this.store.select('recipes')
    .pipe(
      map((recipesState) => {
        return recipesState.recipes;
      })
    )
    .subscribe((recipes)=> {
      this.recipes = recipes;
    });
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.recipesChangedSubscription.unsubscribe();
  }
}
