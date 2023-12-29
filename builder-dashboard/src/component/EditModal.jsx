import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { baseURL } from "../utils/baseURL";

const InputField = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
      value={value}
      onChange={onChange}
    />
  </div>
);

const TextAreaField = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
      value={value}
      onChange={onChange}
      rows={3}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default function EditModal({ isOpen, handleClose, values, setRender }) {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState("");
  const [services, setServices] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validObjectTypes = ["Vehicles", "Card", "Sign", "Construction Site"];

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .put(`${baseURL}/images/${values?._id}`, {
        objectType: type,
        location,
        services,
        result,
      })
      .then(() => {
        setRender((prev) => !prev);
        handleClose();
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setType(values?.objectType);
    setLocation(values?.location);
    setResult(values?.result);
    setServices(values?.service);
  }, [values]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto font-mulish">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    Edit Information
                  </Dialog.Title>

                  {/* Reusable Input Components */}
                  <SelectField
                    label="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    options={validObjectTypes}
                  />

                  <TextAreaField
                    label="Spotted at Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />

                  {/* Reusable TextArea Components */}
                  <TextAreaField
                    label="Result"
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                  />
                  <TextAreaField
                    label="Services"
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                  />

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-[#37266f] px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      {isLoading ? "Loading..." : "Submit"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
