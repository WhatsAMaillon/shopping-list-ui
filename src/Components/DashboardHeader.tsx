interface DashboardHeaderProps {
  onNewListClick: () => void;
}

function DashboardHeader({ onNewListClick }: DashboardHeaderProps) {
  function handleNewListClick() {
    onNewListClick();
  }

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h1 className="fw-bold mb-1">Mien boodsjappelieste</h1>
        <p className="text-secondary mb-0">
          Alles wats te nuuedig höbs, op ein plek.
        </p>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-outline-secondary">↻ Verneuwe</button>

        <button className="btn btn-primary" onClick={handleNewListClick}>
          + Nuuj lies
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;
