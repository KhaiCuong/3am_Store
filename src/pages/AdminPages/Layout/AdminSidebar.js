export default function AdminSidebar() {
  return (
    <>
      <div className="offcanvas offcanvas-start sidebar-nav bg-dark" tabIndex="-1" id="sidebar">
        <div className="offcanvas-body p-0">
          <nav className="navbar-dark">
            <ul className="navbar-nav pt-4">
              <li>
                <a href="#" className="nav-link px-3 active">
                  <span className="me-2">
                    <i className="bi bi-house-door-fill"></i>
                  </span>
                  <span>Dashboard</span>
                </a>
              </li>
              <li className="my-4">
                <hr className="dropdown-divider bg-light" />
              </li>
              <li>
                <div className="text-muted small fw-bold text-uppercase px-3 mb-3">Management</div>
              </li>
              <li>
                <a className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" href="#layouts">
                  <span className="me-2">
                    <i className="bi bi-archive-fill"></i>
                  </span>
                  <span>Products</span>
                  <span className="ms-auto">
                    <span className="right-icon">
                      <i className="bi bi-chevron-down"></i>
                    </span>
                  </span>
                </a>
                <div className="collapse" id="layouts">
                  <ul className="navbar-nav ps-3">
                    <li>
                      <a href="#" className="nav-link px-3">
                        <span className="me-2">
                          <i className="bi bi-speedometer2"></i>
                        </span>
                        <span>Dashboard</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a href="#" className="nav-link px-3">
                  <span className="me-2">
                    <i className="bi bi-person-square"></i>
                  </span>
                  <span>Users</span>
                </a>
              </li>
              <li className="my-4">
                <hr className="dropdown-divider bg-light" />
              </li>
              <li>
                <div className="text-muted small fw-bold text-uppercase px-3 mb-3">Addons</div>
              </li>
              <li>
                <a href="#" className="nav-link px-3">
                  <span className="me-2">
                    <i className="bi bi-graph-up"></i>
                  </span>
                  <span>Charts</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-3">
                  <span className="me-2">
                    <i className="bi bi-table"></i>
                  </span>
                  <span>Tables</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
