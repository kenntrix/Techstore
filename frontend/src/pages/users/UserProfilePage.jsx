import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RingLoader } from "react-spinners";
import { fetchUserProfile } from "../../services/authService";
import { toast } from "react-toastify";
import { Button, Card, Label, Modal, Spinner, TextInput } from "flowbite-react";

const UserProfilePage = () => {
  const [user, setUser] = useState(null); // State to store user profile data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const { currentUser } = useSelector((state) => state.authentication); // Get current user from Redux
  const userId = currentUser?.user?._id; // Extract user ID
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [userModal, setUserModal] = useState(false);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "city") {
      setCity(value);
    } else if (name === "postalCode") {
      setPostalCode(value);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedData = {
        username,
        email,
        password,
      };

      const response = await fetch(`/mediclinic/auth/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        toast.error("Failed to update user details");
      }
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      loadUserProfile(userId);
      // Combine data info with the success message and add line breaks
      const successMessage = `
            User details updated successfully
          `;

      // Show the success message as HTML
      toast.success(successMessage);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const updatedData = {
        firstName,
        lastName,
        address,
        phoneNumber,
        city,
        postalCode,
      };
      const response = await fetch(
        `/mediclinic/patient/getPatients/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        toast.error("Failed to update patient details");
      }
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      loadUserProfile(userId);
      // Combine data info with the success message and add line breaks
      const successMessage = `
            Patient updated successfully
          `;

      // Show the success message as HTML
      toast.success(successMessage);
      setUserModal(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetchUserProfile(userId); // Fetch user profile from the backend
      console.log(response);
      setUser(response.user); // Set user profile data in state
      setUsername(response.user.username);
      setEmail(response.user.email);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Failed to load user profile.");
      setLoading(false);
    }
  };

  // Fetch user profile when the component mounts
  useEffect(() => {
    if (userId) {
      loadUserProfile();
    } else {
      setError("User not authenticated.");
      setLoading(false);
    }
  }, [userId]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {user && (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 shadow items-center">
              <div>
                <Card className="items-center">
                  <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                    User Details
                  </h1>
                  <div className="flex gap-x-4 sm:gap-x-20 md:gap-x-5">
                    <div className="mb-4">
                      <Label
                        htmlFor="firstName"
                        className="mb-2 block text-gray-700"
                      >
                        First Name
                      </Label>
                      <TextInput
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={firstName}
                        disabled
                        placeholder="Enter First Name"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <Label
                        htmlFor="lastName"
                        className="mb-2 block text-gray-700"
                      >
                        Last Name
                      </Label>
                      <TextInput
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={lastName}
                        disabled
                        placeholder="Enter Last Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-x-4 sm:gap-x-20 md:gap-x-5">
                    <div className="mb-4">
                      <Label
                        htmlFor="phoneNumber"
                        className="mb-2 block text-gray-700"
                      >
                        Phone Number
                      </Label>
                      <TextInput
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        value={phoneNumber}
                        disabled
                        placeholder="Enter Phone Contact"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <Label
                        htmlFor="address"
                        className="mb-2 block text-gray-700"
                      >
                        Address
                      </Label>
                      <TextInput
                        id="address"
                        name="address"
                        type="text"
                        value={address}
                        disabled
                        placeholder="Enter Address"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-x-4 sm:gap-x-20 md:gap-x-5">
                    <div className="mb-4">
                      <Label
                        htmlFor="city"
                        className="mb-2 block text-gray-700"
                      >
                        City
                      </Label>
                      <TextInput
                        id="city"
                        name="city"
                        type="text"
                        value={city}
                        disabled
                        placeholder="Enter City"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <Label
                        htmlFor="postalCode"
                        className="mb-2 block text-gray-700"
                      >
                        Postal Code
                      </Label>
                      <TextInput
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        value={postalCode}
                        disabled
                        placeholder="Enter Postal Code"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    gradientDuoTone="cyanToBlue"
                    onClick={() => {
                      setUserModal(true);
                      loadUserProfile(userId);
                    }}
                  >
                    Update
                  </Button>
                </Card>
              </div>
              <div>
                <Card className="">
                  <h1 className="text-xl mx-10 font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    Other Details
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="mt-2">
                      <div className="mb-4">
                        <Label
                          htmlFor="username"
                          className="mb-2 block text-gray-700"
                        >
                          Username
                        </Label>
                        <TextInput
                          id="username"
                          name="username"
                          type="text"
                          value={username}
                          onChange={handleUserChange}
                          placeholder="Enter Username"
                        />
                      </div>
                      <div className="mb-4">
                        <Label
                          htmlFor="email"
                          className="mb-2 block text-gray-700"
                        >
                          Email Address
                        </Label>
                        <TextInput
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={handleUserChange}
                          placeholder="Enter Email Address"
                        />
                      </div>
                      <div className="mb-4">
                        <Label
                          htmlFor="password"
                          className="mb-2 block text-gray-700"
                        >
                          Password
                        </Label>
                        <TextInput
                          id="password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={handleUserChange}
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    gradientDuoTone="purpleToPink"
                    onClick={(e) => {
                      e.preventDefault();
                      handleUserSubmit(e);
                    }}
                  >
                    Update User
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal onClose={() => setUserModal(false)} show={userModal} size="lg">
        <Modal.Header className="px-6 pb-0 pt-6 mb-4">
          <span className="uppercase">Edit User</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
              <RingLoader color="#4A90E2" size={100} />
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-y-3 text-center"
          >
            <div className="flex gap-x-2 sm:gap-x-20 md:gap-x-10">
              <div className="mb-4">
                <Label htmlFor="firstName" className="mb-2 block text-gray-700">
                  First Name
                </Label>
                <TextInput
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={handleUserChange}
                  placeholder="Enter First Name"
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="lastName" className="mb-2 block text-gray-700">
                  Last Name
                </Label>
                <TextInput
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={handleUserChange}
                  placeholder="Enter Last Name"
                  required
                />
              </div>
            </div>

            <div className="flex gap-x-4 sm:gap-x-20 md:gap-x-10">
              <div className="flex gap-x-4 sm:gap-x-20 md:gap-x-10">
                <div className="mb-4">
                  <Label
                    htmlFor="phoneNumber"
                    className="mb-2 block text-gray-700"
                  >
                    Phone Number
                  </Label>
                  <TextInput
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={handleUserChange}
                    placeholder="Enter Phone Number"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="address" className="mb-2 block text-gray-700">
                  Address
                </Label>
                <TextInput
                  id="address"
                  name="address"
                  type="text"
                  value={address}
                  onChange={handleUserChange}
                  placeholder="Enter Address"
                  required
                />
              </div>
            </div>

            <div className="flex gap-x-4 sm:gap-x-20 md:gap-x-10">
              <div className="mb-4">
                <Label htmlFor="city" className="mb-2 block text-gray-700">
                  City
                </Label>
                <TextInput
                  id="city"
                  name="city"
                  type="text"
                  value={city}
                  onChange={handleUserChange}
                  placeholder="Enter City"
                  required
                />
              </div>
              <div className="mb-4">
                <Label
                  htmlFor="postalCode"
                  className="mb-2 block text-gray-700"
                >
                  Postal Code
                </Label>
                <TextInput
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={postalCode}
                  onChange={handleUserChange}
                  placeholder="Enter Postal Code"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-x-6">
              <Button color="blue" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
              <Button color="gray" onClick={() => setUserModal(false)}>
                No, cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserProfilePage;
