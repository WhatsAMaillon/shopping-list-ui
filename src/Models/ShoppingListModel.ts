import type { ShoppingListItemModel } from "./ShoppingListItemModel";

export interface ShoppingListModel {
  shoppingListOwnerGuid: string;
  shoppingListGuid: string;
  name: string;
  createdOn: string;
  isActive: boolean;
  shoppingListItems: ShoppingListItemModel[];
}
