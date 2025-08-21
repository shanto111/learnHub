// app/admin/page.jsx

export const metadata = {
  title: "Admin Panel",
};

export default function AdminDashboardPage() {
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

          {/* Page Content */}
          <main className="p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="stat bg-base-100 shadow rounded-xl">
                <div className="stat-title">Total Users</div>
                <div className="stat-value text-primary">1,200</div>
                <div className="stat-desc">↗︎ 120 this month</div>
              </div>
              <div className="stat bg-base-100 shadow rounded-xl">
                <div className="stat-title">Courses</div>
                <div className="stat-value text-secondary">85</div>
                <div className="stat-desc">↗︎ 8 new</div>
              </div>
              <div className="stat bg-base-100 shadow rounded-xl">
                <div className="stat-title">Revenue</div>
                <div className="stat-value text-accent">$32.5k</div>
                <div className="stat-desc">↗︎ 15% from last month</div>
              </div>
            </div>

            {/* Recent table */}
            <div className="bg-base-100 p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Enrollments</h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>Hasan</td>
                      <td>React Basics</td>
                      <td>2025-08-21</td>
                      <td>
                        <span className="badge badge-success">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <th>2</th>
                      <td>Ayesha</td>
                      <td>Node.js Mastery</td>
                      <td>2025-08-20</td>
                      <td>
                        <span className="badge badge-warning">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Rahim</td>
                      <td>MongoDB Pro</td>
                      <td>2025-08-18</td>
                      <td>
                        <span className="badge badge-error">Cancelled</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
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
              <a>Dashboard</a>
            </li>
            <li>
              <a>Users</a>
            </li>
            <li>
              <a>Courses</a>
            </li>
            <li>
              <a>Payments</a>
            </li>
            <li>
              <a>Reports</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
