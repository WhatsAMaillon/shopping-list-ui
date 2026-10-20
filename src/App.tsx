import { useEffect, useState } from "react";

import Navbar from "./Components/Navbar";
import DashboardHeader from "./Components/DashboardHeader";
import DashboardSummary from "./Components/DashboardSummary";
import ShoppingListCreateNew from "./Components/ShoppingListCreateNew";
import ShoppingListCollection from "./Components/ShoppingListCollection";
import AppFooter from "./Components/AppFooter";
import ShoppingListDetails from "./Components/ShoppingListDetails";

import type { ShoppingListModel } from "./Models/ShoppingListModel";
import { getShoppingListsByOwner } from "./Services/shoppingListService";

const OWNER_GUID = "11111111-1111-4111-8111-111111111111";

function App() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingListModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedList, setSelectedList] = useState<ShoppingListModel | null>(
    null,
  );

  // Controls whether the create-list modal is open.
  const [createFormOpen, setCreateFormOpen] = useState(false);

  // Load the lists from the API when the app starts.
  useEffect(() => {
    async function loadShoppingLists() {
      try {
        setLoading(true);
        setError(null);

        const lists = await getShoppingListsByOwner(OWNER_GUID);
        setShoppingLists(lists);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred.",
        );
      } finally {
        setLoading(false);
      }
    }

    void loadShoppingLists();
  }, []);

  // Add the newly created list to the existing state.
  function handleShoppingListCreated(newList: ShoppingListModel) {
    setShoppingLists((currentLists) => [newList, ...currentLists]);
    setCreateFormOpen(false);
  }

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />

      <main className="container-fluid px-3 px-md-5 py-4">
        <DashboardHeader onNewListClick={() => setCreateFormOpen(true)} />

        {loading && <p className="text-secondary">Lieste weure gelaje...</p>}

        {error && (
          <div className="alert alert-danger" role="alert">
            Kós de boodsjappelieste neet laje: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <DashboardSummary shoppingLists={shoppingLists} />

            <div className="row g-4">
              <section className="col-12 col-xl-4" id="create-list">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h2 className="h4 fw-bold mb-2">Maak 'n lies</h2>

                    <p className="text-secondary mb-4">
                      Begin 'n nuuj lies veur de volgende kier boodsjappe.
                    </p>

                    <ShoppingListCreateNew
                      ownerGuid={OWNER_GUID}
                      onCreated={handleShoppingListCreated}
                      isOpen={createFormOpen}
                      onOpen={() => setCreateFormOpen(true)}
                      onClose={() => setCreateFormOpen(false)}
                    />
                  </div>
                </div>
              </section>

              <section className="col-12 col-xl-8">
                <ShoppingListCollection
                  shoppingLists={shoppingLists}
                  onOpen={setSelectedList}
                />
              </section>
            </div>
          </>
        )}

        <AppFooter />
      </main>

      {selectedList && (
        <ShoppingListDetails
          shoppingList={selectedList}
          onClose={() => setSelectedList(null)}
          onSaved={(updatedList) => {
            setShoppingLists((current) =>
              current.map((list) =>
                list.shoppingListGuid === updatedList.shoppingListGuid
                  ? updatedList
                  : list,
              ),
            );
          }}
        />
      )}
    </div>
  );
}

export default App;
