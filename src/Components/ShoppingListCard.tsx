import type { ShoppingListModel } from "../Models/ShoppingListModel";

interface ShoppingListCardProps {
  shoppingList: ShoppingListModel;
  onOpen: (shoppingList: ShoppingListModel) => void;
}

function ShoppingListCard({ shoppingList, onOpen }: ShoppingListCardProps) {
  const items = shoppingList.shoppingListItems;

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const completedQuantity = items.reduce(
    (total, item) => total + (item.isChecked ? item.quantity : 0),
    0,
  );

  const progress =
    totalQuantity === 0
      ? 0
      : Math.round((completedQuantity / totalQuantity) * 100);

  return (
    <div className="border rounded-3 p-3 p-md-4">
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div className="d-flex gap-3">
          <div className="bg-primary-subtle rounded-3 p-3">
            <span className="fs-4" aria-hidden="true">
              🛒
            </span>
          </div>

          <div>
            <h3 className="h5 fw-bold mb-1">
              {shoppingList.name || "Boodsjappelies"}
            </h3>

            <p className="text-secondary small mb-2">
              Gemaak op{" "}
              {new Date(shoppingList.createdOn).toLocaleString("nl-NL", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>

            <div className="d-flex flex-wrap gap-2">
              <span
                className={`badge ${
                  shoppingList.isActive
                    ? "text-bg-success"
                    : "text-bg-secondary"
                }`}
              >
                {shoppingList.isActive ? "Aktief" : "Gearchiveerd"}
              </span>

              <span className="badge text-bg-light border">
                {completedQuantity} vaan {totalQuantity} stuks
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onOpen(shoppingList)}
        >
          Aopemake
        </button>
      </div>

      <div
        className="progress mt-3"
        role="progressbar"
        aria-label="Veurtgaank vaan de lies"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ height: 6 }}
      >
        <div
          className="progress-bar bg-primary"
          style={{ width: `${progress}%` }}
        />
      </div>

      {items.length > 0 && (
        <div className="mt-3">
          <p className="small text-secondary mb-2">Wat op dees lies steit</p>

          <ul className="list-group list-group-flush">
            {items.slice(0, 3).map((item) => (
              <li
                key={item.shoppingItem.shoppingItemGuid}
                className="list-group-item px-0 py-2 d-flex justify-content-between gap-3"
              >
                <span
                  className={
                    item.isChecked
                      ? "text-secondary text-decoration-line-through"
                      : ""
                  }
                >
                  {item.shoppingItem.nameItem}
                  <span className="text-secondary ms-2">× {item.quantity}</span>
                </span>

                <span className="text-secondary small">
                  {item.shoppingItem.categoryOfItem}
                </span>
              </li>
            ))}
          </ul>

          {items.length > 3 && (
            <p className="text-secondary small mt-2 mb-0">
              En nog {items.length - 3} artikele...
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ShoppingListCard;
