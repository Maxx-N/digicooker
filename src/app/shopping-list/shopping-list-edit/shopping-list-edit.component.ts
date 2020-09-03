import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;
  private startedEditingSubscription: Subscription;
  editMode: boolean = false;
  editedIngredientIndex: number;
  editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.startedEditingSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedIngredientIndex = index;
        this.editMode = true;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount,
        });
      }
    );
  }

  onSubmit(): void {
    const newIngredient = new Ingredient(
      this.shoppingListForm.value['name'],
      this.shoppingListForm.value.amount
    );
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedIngredientIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onClear(): void {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
    this.onClear();

  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
  }
}
