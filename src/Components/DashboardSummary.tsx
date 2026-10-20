import type { ShoppingListModel } from "../Models/ShoppingListModel";
import SummaryCard from "./SummaryCard";

interface DashboardSummaryProps {
  shoppingLists: ShoppingListModel[];
}

function DashboardSummary({ shoppingLists }: DashboardSummaryProps) {
  const activeLists = shoppingLists.filter((list) => list.isActive);

  const itemsToBuy = activeLists.reduce(
    (total, list) =>
      total +
      list.shoppingListItems.reduce(
        (sum, item) => sum + (item.isChecked ? 0 : item.quantity),
        0,
      ),
    0,
  );

  const itemsCompleted = activeLists.reduce(
    (total, list) =>
      total +
      list.shoppingListItems.reduce(
        (sum, item) => sum + (item.isChecked ? item.quantity : 0),
        0,
      ),
    0,
  );

  return (
    <div className="row g-3 mb-4">
      <SummaryCard
        title="AKTIEVE LIESTE"
        value={activeLists.length}
        icon="📋"
        description="Dien aktieve boodsjappelieste"
      />

      <SummaryCard
        title="NOG TE KOUPE"
        value={itemsToBuy}
        icon="🛍️"
        description="Aantal wat nog gekoch mót weure"
      />

      <SummaryCard
        title="AFGEVINK"
        value={itemsCompleted}
        icon="✅"
        description="Aantal wat al afgevink is"
      />
    </div>
  );
}

export default DashboardSummary;
