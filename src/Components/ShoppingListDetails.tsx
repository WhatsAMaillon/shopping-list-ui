import { useEffect, useState } from "react";

import type { ShoppingListModel } from "../Models/ShoppingListModel";
import type { ShoppingListItemModel } from "../Models/ShoppingListItemModel";
import {
  getShoppingListByGuid,
  updateShoppingList,
} from "../Services/shoppingListService";

interface ShoppingListDetailsProps {
  shoppingList: ShoppingListModel;
  onClose: () => void;
  onSaved: (updatedList: ShoppingListModel) => void;
}

function ShoppingListDetails({
  shoppingList,
  onClose,
  onSaved,
}: ShoppingListDetailsProps) {
  const [list, setList] = useState(shoppingList);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Other");
  const [quantity, setQuantity] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadList() {
      try {
        const latest = await getShoppingListByGuid(
          shoppingList.shoppingListGuid,
        );
        if (!cancelled) setList(latest);
      } catch {
        // Keep the list already loaded by the dashboard if GET fails.
      }
    }

    void loadList();
    return () => {
      cancelled = true;
    };
  }, [shoppingList.shoppingListGuid]);

  function addItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = itemName.trim();
    if (!trimmedName) return;

    const newItem: ShoppingListItemModel = {
      isChecked: false,
      quantity,
      shoppingItem: {
        shoppingItemGuid: crypto.randomUUID(),
        nameItem: trimmedName,
        categoryOfItem: category,
        likelyLocation: null,
      },
    };

    setList((current) => ({
      ...current,
      shoppingListItems: [...current.shoppingListItems, newItem],
    }));

    setItemName("");
    setQuantity(1);
    setError(null);
  }

  function toggleItem(index: number) {
    setList((current) => ({
      ...current,
      shoppingListItems: current.shoppingListItems.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item,
      ),
    }));
  }

  async function saveList() {
    setIsSaving(true);
    setError(null);

    try {
      await updateShoppingList(list);
      onSaved(list);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kós dees lies neet opsjlaon.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      className="modal d-block"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shopping-list-details-title"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div className="modal-content border-0 shadow">
          <div className="modal-header">
            <div>
              <h2 className="modal-title fs-5" id="shopping-list-details-title">
                {list.name || "Boodsjappelies"}
              </h2>
              <p className="text-secondary small mb-0">
                {list.shoppingListItems.length} artikele
              </p>
            </div>

            <button
              type="button"
              className="btn-close"
              aria-label="Sloete"
              onClick={onClose}
              disabled={isSaving}
            />
          </div>

          <div className="modal-body">
            <form onSubmit={addItem} className="border rounded p-3 mb-4">
              <h3 className="h6 fw-bold mb-3">Get toevoege</h3>

              <div className="row g-2">
                <div className="col-12 col-md-5">
                  <label htmlFor="item-name" className="form-label">
                    Naam vaan 't artikel
                  </label>
                  <input
                    id="item-name"
                    className="form-control"
                    value={itemName}
                    onChange={(event) => setItemName(event.target.value)}
                    placeholder="bv. Mèllek"
                    required
                  />
                </div>

                <div className="col-6 col-md-4">
                  <label htmlFor="item-category" className="form-label">
                    Categorie
                  </label>
                  <select
                    id="item-category"
                    className="form-select"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option value="Other">Anders</option>
                    <option value="Fruit & Vegetables">Fruit & Greunte</option>
                    <option value="Dairy">Zuvel</option>
                    <option value="Bakery">Bakker</option>
                    <option value="Meat & Fish">Vleis & Vès</option>
                    <option value="Drinks">Drinke</option>
                    <option value="Frozen">Diepvries</option>
                    <option value="Household">Hoeshajing</option>
                  </select>
                </div>

                <div className="col-6 col-md-3">
                  <label htmlFor="item-quantity" className="form-label">
                    Aantal
                  </label>
                  <input
                    id="item-quantity"
                    type="number"
                    min={1}
                    max={999}
                    className="form-control"
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(Math.max(1, Number(event.target.value)))
                    }
                    required
                  />
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-outline-primary">
                    + Toevoege
                  </button>
                </div>
              </div>
            </form>

            {list.shoppingListItems.length === 0 ? (
              <p className="text-secondary text-center py-4">
                Dien lies is laeg. Doog hiej baove get drop.
              </p>
            ) : (
              <ul className="list-group">
                {list.shoppingListItems.map((item, index) => (
                  <li
                    key={`${item.shoppingItem.shoppingItemGuid}-${index}`}
                    className="list-group-item d-flex align-items-center gap-3"
                  >
                    <input
                      className="form-check-input mt-0"
                      type="checkbox"
                      checked={item.isChecked}
                      onChange={() => toggleItem(index)}
                      aria-label={`Markeer ${item.shoppingItem.nameItem} es ${
                        item.isChecked ? "neet gekoch" : "gekoch"
                      }`}
                    />

                    <div className="flex-grow-1">
                      <div
                        className={
                          item.isChecked
                            ? "text-decoration-line-through text-secondary"
                            : "fw-semibold"
                        }
                      >
                        {item.shoppingItem.nameItem}
                      </div>
                      <div className="text-secondary small">
                        {item.shoppingItem.categoryOfItem}
                      </div>
                    </div>

                    <span className="badge text-bg-light">
                      × {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {error && (
              <div className="alert alert-danger mt-3 mb-0" role="alert">
                {error}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
              disabled={isSaving}
            >
              Aafbraeke
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveList}
              disabled={isSaving}
            >
              {isSaving ? "Opsjlaon..." : "Opsjlaon"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingListDetails;
