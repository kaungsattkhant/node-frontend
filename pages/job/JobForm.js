import React from "react";
// import Select from "react-select";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

const JobForm = ({
  isEditing,
  formData,
  handleSubmit,
  handleInputChange,
  locations,
  functions,
}) => {
  const locationOptions = locations.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  console.log(formData);

  const functionOptions = functions.map((func) => ({
    value: func.id,
    label: func.name,
  }));

  //
  const handleLocationChange = (selectedOption) => {
    handleInputChange({
      target: {
        name: "location_id",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const handleFunctionChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    handleInputChange({ target: { name: "function_ids", value: selectedIds } });
  };

  return (
    <div className="cart-container mx-auto py-8 max-w-4xl">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">
          {isEditing ? "Update Job" : "Create Job"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Company Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="company"
            >
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {/* Location Select Box */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Location
            </label>
            <Select
              id="location"
              name="location_id"
              value={locationOptions.find(
                (option) => option.value === formData.location_id
              )}
              onChange={handleLocationChange}
              options={locationOptions}
            />
          </div>

          {/* Functions Select Box */}
          <div className="mb-4 ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Functions
            </label>
            <Select
              isMulti
              options={functionOptions}
              onChange={handleFunctionChange}
              value={functionOptions.filter((option) =>
                formData.function_ids.includes(option.value)
              )}
            />
          </div>
          {/* Education Field */}
          <div className="mb-4 col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="education"
            >
              Education
            </label>
            <input
              type="text"
              id="education"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required={!isEditing}
            />
          </div>

          {/* Description Field */}
          <div className="mb-4 col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              rows="4"
              required={!isEditing}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center col-span-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isEditing ? "Update Job" : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
