import { useState } from "react";
import type { FormEvent } from "react";

import type { ShoppingListModel } from "../Models/ShoppingListModel";
import { createShoppingList } from "../Services/shoppingListService";

interface ShoppingListCreateNewProps {
  ownerGuid: string;
  onCreated: (shoppingList: ShoppingListModel) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function ShoppingListCreateNew({
  ownerGuid,
  onCreated,
  isOpen,
  onOpen,
  onClose,
}: ShoppingListCreateNewProps) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Gaef dien boodsjappelies 'ne naam.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const newShoppingList: ShoppingListModel = {
      shoppingListOwnerGuid: ownerGuid,
      shoppingListGuid: crypto.randomUUID(),
      name: trimmedName,
      createdOn: new Date().toISOString(),
      isActive: true,
      shoppingListItems: [],
    };

    try {
      await createShoppingList(newShoppingList);

      onCreated(newShoppingList);
      setName("");
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Kós de boodsjappelies neet aanmake.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    if (isSubmitting) return;

    setError(null);
    setName("");
    onClose();
  }

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={onOpen}>
        + Lies aanmake
      </button>

      {isOpen && (
        <div
          className="modal d-block"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-list-title"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h2 className="modal-title fs-5" id="create-list-title">
                    Maak 'n boodsjappelies
                  </h2>

                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Sloete"
                    onClick={handleClose}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="modal-body">
                  <label htmlFor="shopping-list-name" className="form-label">
                    Naam vaan de lies
                  </label>

                  <input
                    id="shopping-list-name"
                    type="text"
                    className="form-control"
                    placeholder="bv. Weekboodsjappe"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    maxLength={100}
                    required
                    autoFocus
                    disabled={isSubmitting}
                  />

                  <div className="form-text">
                    Kees 'ne naam woomèt se dees lies trökvinds.
                  </div>

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
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Aafbraeke
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Aanmake..." : "Lies aanmake"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShoppingListCreateNew;
