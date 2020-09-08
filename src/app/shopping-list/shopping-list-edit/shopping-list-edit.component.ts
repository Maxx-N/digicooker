import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;
  private startedEditingSubscription: Subscription;
  editMode: boolean = false;
  editedIngredient: Ingredient;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.startedEditingSubscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedIngredient = stateData.editedIngredient;
          this.shoppingListForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount,
          });
        } else {
          this.editMode = false;
        }
      });

    // this.startedEditingSubscription = this.shoppingListService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedIngredientIndex = index;
    //     this.editMode = true;
    //     this.editedIngredient = this.shoppingListService.getIngredient(index);
    //     this.shoppingListForm.setValue({
    //       name: this.editedIngredient.name,
    //       amount: this.editedIngredient.amount,
    //     });
    //   }
    // );
  }

  onSubmit(): void {
    const newIngredient = new Ingredient(
      this.shoppingListForm.value['name'],
      this.shoppingListForm.value.amount
    );
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(
      //   this.editedIngredientIndex,
      //   newIngredient
      // );
      this.store.dispatch(
        new shoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onClear(): void {
    this.editMode = false;
    this.shoppingListForm.reset();
    this.store.dispatch(new shoppingListActions.StopEdit());
  }

  onDelete(): void {
    // this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEdit());
  }
}
