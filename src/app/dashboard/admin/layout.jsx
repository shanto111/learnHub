// app/admin/layout.jsx
export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Drawer layout */}
      <div className="drawer lg:drawer-open">
        <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

        {/* Main content */}
        <div className="drawer-content flex flex-col">
          {/* Topbar */}
          <div className="navbar bg-base-100 shadow-md px-4">
            <div className="flex-1">
              <label htmlFor="admin-drawer" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <span className="text-xl font-bold">Admin Panel</span>
            </div>
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://i.pravatar.cc/100" alt="user" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>Profile</a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Page content slot */}
          <main className="p-6 space-y-6">{children}</main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-40">
          <label
            htmlFor="admin-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-72 min-h-full bg-base-100 shadow-lg">
            <li className="mb-2 text-xl font-bold">Menu</li>
            <li>
              <a href="/admin">Dashboard</a>
            </li>
            <li>
              <a href="/admin/users">Users</a>
            </li>
            <li>
              <a href="/admin/courses">Courses</a>
            </li>
            <li>
              <a href="/admin/payments">Payments</a>
            </li>
            <li>
              <a href="/admin/reports">Reports</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
