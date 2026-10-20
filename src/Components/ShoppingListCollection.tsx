import { useState } from "react";

import type { ShoppingListModel } from "../Models/ShoppingListModel";
import ShoppingListCard from "./ShoppingListCard";

interface ShoppingListCollectionProps {
  shoppingLists: ShoppingListModel[];
  onOpen: (shoppingList: ShoppingListModel) => void;
}

function ShoppingListCollection({
  shoppingLists,
  onOpen,
}: ShoppingListCollectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLists = shoppingLists.filter((list) => {
    const search = searchTerm.toLowerCase();

    const matchesGuid = list.shoppingListGuid.toLowerCase().includes(search);

    const matchesName = (list.name ?? "").toLowerCase().includes(search);

    const matchesItems = list.shoppingListItems.some(
      (item) =>
        item.shoppingItem.nameItem.toLowerCase().includes(search) ||
        item.shoppingItem.categoryOfItem.toLowerCase().includes(search),
    );

    return matchesGuid || matchesName || matchesItems;
  });

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="h4 fw-bold mb-1">Dien boodsjappelieste</h2>
          <p className="text-secondary mb-0">
            Hool al dien lieste op ein plek bijein.
          </p>
        </div>

        <div>
          <input
            type="search"
            className="form-control"
            placeholder="Zeuk in lieste of artikele..."
            aria-label="Zeuk in boodsjappelieste"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      {filteredLists.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <h3 className="h5">
              {searchTerm ? "Gein lieste gevonje" : "Nog gein boodsjappelieste"}
            </h3>
            <p className="text-secondary mb-0">
              {searchTerm
                ? "Perbeer get anders te zeuke."
                : "Maak dien ierste lies um te beginne."}
            </p>
          </div>
        </div>
      ) : (
        <div className="row g-3">
          {filteredLists.map((list) => (
            <div className="col-12 col-md-6" key={list.shoppingListGuid}>
              <ShoppingListCard shoppingList={list} onOpen={onOpen} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShoppingListCollection;
