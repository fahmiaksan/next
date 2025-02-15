export default function DashboardPage() {
  return (
    <div className="p-6 bg-gray-800 shadow rounded-lg text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
      <p className="text-gray-400">
        This is the main dashboard page. You can manage student, teacher, class, and course from the navigation menu.
      </p>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        <div className="p-4 bg-blue-600 text-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Student</h2>
          <p className="text-2xl">150</p>
        </div>
        <div className="p-4 bg-green-600 text-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Course</h2>
          <p className="text-2xl">32</p>
        </div>
        <div className="p-4 bg-yellow-600 text-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Teacher</h2>
          <p className="text-2xl">5</p>
        </div>

        <div className="p-4 bg-yellow-600 text-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Class</h2>
          <p className="text-2xl">5</p>
        </div>
      </div>
    </div>
  );
}
