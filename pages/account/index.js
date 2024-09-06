import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
function index() {
  const [accounts, setAccounts] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    account_type: "",
    color_code: "#000000",
    deposit_id: 1,
    withdrawal_id: 2,
    is_active: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch(`${baseUrl}/api/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setAccounts((prevAccounts) => [data, ...prevAccounts]);
        setFormData({
          name: "",
          phone_number: "",
          account_type: "",
          deposit_id: "",
          withdrawal_id: "",
          is_active: false,
        });
      })
      .catch((error) => console.error("Error:", error));
  };
  // useEffect(() => {
  //   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  //   // fetch("http://127.0.0.1:8080/api/accounts")
  //   fetch(`${baseUrl}/api/accounts`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data);
  //       setAccounts(data);
  //       // setMessage(data.message);
  //       // setPeople(data.people);
  //     });
  // }, []);

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem("jwtToken"); // Get token from localStorage
      if (!token) {
        console.log("No token found, redirecting to login");
        router.push("/auth/login");
        return; // Exit early if no token
      }
      try {
        const response = await fetch(`${baseUrl}/api/accounts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is passed in headers
            "Content-Type": "application/json",
          },
        });
        if (response.status === 403) {
          console.log("Access denied. Redirecting to login.");
          router.push("/auth/login");
        } else if (response.status === 401) {
          console.log("Unauthorized. Redirecting to login.");
          router.push("/auth/login");
        } else if (response.ok) {
          const data = await response.json();
          setUsers(data.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchAccounts();
  }, [router]);
  //   return <div>
  //     It's home page of account

  //     </div>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Accounts</h1>

      {/* Account Creation Form */}
      <form className="mb-8 max-w-4xl mx-auto" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <select
              name="account_type"
              value={formData.account_type}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select an account type</option>
              <option value="kpay">Kpay</option>
              <option value="wave">Wave</option>
            </select>
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">Deposit ID</label>
            <input
              type="text"
              name="deposit_id"
              value={formData.deposit_id}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Withdrawal ID</label>
            <input
              type="text"
              name="withdrawal_id"
              value={formData.withdrawal_id}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div> */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm font-medium text-gray-700">
              Is Active
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Account
        </button>
      </form>

      {/* Accounts Table */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Account Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Deposit ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Withdrawal ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Is Active
                  </th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr
                    key={account.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {account.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {account.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {account.phone_number}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {account.account_type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {account.deposit_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {account.withdrawal_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {account.is_active ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
