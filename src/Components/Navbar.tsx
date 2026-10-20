function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid px-4">
        <a className="navbar-brand fw-bold fs-4" href="#">
          🛒 Lijstjes en al
        </a>

        <div className="d-flex align-items-center gap-3">
          <span className="text-white-50 d-none d-sm-inline">
            Dien boodsjappe, good geregeld.
          </span>

          <button className="btn btn-light btn-sm fw-semibold">
            Mien account
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
