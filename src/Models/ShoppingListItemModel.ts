import type { ShoppingItemModel } from "./ShoppingItemModel";

export interface ShoppingListItemModel {
  isChecked: boolean;
  quantity: number;
  shoppingItem: ShoppingItemModel;
}
