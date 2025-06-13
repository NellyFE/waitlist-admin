import React, { useEffect, useState } from "react";

export const WaitlistAdminView = () => {
  const [waitlist, setWaitlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchWaitlist = async (page = 1) => {
    try {
      setLoading(true);

      const apiUrl = `https://apex-waitlist.onrender.com/api/waitlist?page=${page}&limit=10`;

      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch waitlist");

      const result = await response.json();
      setWaitlist(result.data);
      setCurrentPage(result.pagination?.currentPage || 1);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching waitlist:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlist(currentPage);
  }, [currentPage]);

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const renderStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          statusClasses[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">APEX TECH Waitlist</h1>
      {loading ? (
        <p className="text-center">Loading waitlist data...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Phone
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Position
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Joined At
                  </th>
                </tr>
              </thead>
              <tbody>
                {waitlist.map((entry, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {entry.firstName} {entry.lastName}
                    </td>
                    <td className="px-4 py-2 text-sm">{entry.email}</td>
                    <td className="px-4 py-2 text-sm">{entry.phone}</td>
                    <td className="px-4 py-2 text-sm">
                      {renderStatusBadge(entry.status)}
                    </td>
                    <td className="px-4 py-2 text-sm">{entry.position}</td>
                    <td className="px-4 py-2 text-sm">
                      {formatDate(entry.joinedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WaitlistAdminView;
