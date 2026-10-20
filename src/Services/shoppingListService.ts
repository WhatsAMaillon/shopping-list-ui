import type { ShoppingListModel } from "../Models/ShoppingListModel";

const API_BASE_URL = "https://localhost:7204/api/ShoppingList";

export async function getShoppingListsByOwner(
  ownerGuid: string,
): Promise<ShoppingListModel[]> {
  const response = await fetch(`${API_BASE_URL}/owner/${ownerGuid}`);

  if (!response.ok) {
    throw new Error(`Laje vaan de lieste mislouk: ${response.status}`);
  }

  return (await response.json()) as ShoppingListModel[];
}

export async function getShoppingListByGuid(
  shoppingListGuid: string,
): Promise<ShoppingListModel> {
  const response = await fetch(`${API_BASE_URL}/${shoppingListGuid}`);

  if (!response.ok) {
    throw new Error(`Laje vaan de lies mislouk: ${response.status}`);
  }

  return (await response.json()) as ShoppingListModel;
}

export async function createShoppingList(
  shoppingList: ShoppingListModel,
): Promise<void> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shoppingList),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      errorBody || `Kós dees lies neet aanmake: ${response.status}`,
    );
  }
}

export async function updateShoppingList(
  shoppingList: ShoppingListModel,
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/${shoppingList.shoppingListGuid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shoppingList),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      errorBody || `Opsjlaon vaan de lies mislouk: ${response.status}`,
    );
  }
}
