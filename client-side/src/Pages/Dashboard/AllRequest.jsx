import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useAxiosSecure from "../../api/useAxiosSecure";
import useAuth from "../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";
import GenericCard from "../../Components/GenericCard";
import usePendingStatusFilter from "../../Hooks/UsePendingStatusFilter";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";

const AllRequest = () => {
  const { loading, setLoading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [isSellerRequest, setIsSellerRequest] = useState([]);

  const {
    refetch: refetchGeneric,
    isLoading,
    data: allGeneric = [],
  } = useQuery({
    queryKey: ["allGeneric"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/all/generic`);
      return res.data.generic;
    },
  });
  const { refetch: refetchManufacturer, data: allManufacturer = [] } = useQuery(
    {
      queryKey: ["allManufacturer"],
      enabled: !loading,
      queryFn: async () => {
        const res = await axiosSecure(`/all/manufacturer`);
        return res.data.manufacturer;
      },
    }
  );
  const { refetch: dosageForm, data: allDosageForm = [] } = useQuery({
    queryKey: ["allDosageForm"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/all/dosageForm`);
      return res.data.dosageForm;
    },
  });
  const { refetch: sellerRefetch, data: sellerRequest = [] } = useQuery({
    queryKey: ["sellerRequest"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`all/users`);
      return res.data.users;
    },
  });

  useEffect(() => {
    // Perform the filter operation here
    const AllSellerRequest = sellerRequest.filter(
      (item) => item.isSellerRequest == true
    );
    setIsSellerRequest(AllSellerRequest);
  }, [sellerRequest]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleString(undefined, options);
  };

  const handleGenericApproved = (g) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to approved ${g.generic}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        // updateUser
        const updateData = {
          status: "approved",
        };
        axiosSecure
          .patch(`/genericUpdateById/${g._id}`, updateData)
          .then((response) => {
            Swal.fire("Done!", `${g.generic} is approved now.`);
            refetchGeneric();
          })
          .catch((error) => {
            setLoading(false);
          });
      }
    });
  };
  const handleGenericDenied = (g) => {
    console.log(g);
  };
  const handleManufacturerApproved = (m) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to approved ${m.manufacturer}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        // updateUser
        const updateData = {
          status: "approved",
        };
        axiosSecure
          .patch(`/manufacturerUpdateById/${m._id}`, updateData)
          .then((response) => {
            Swal.fire("Done!", `${m.generic} is approved now.`);
            refetchManufacturer();
          })
          .catch((error) => {
            setLoading(false);
          });
      }
    });
  };
  const handleManufacturerDenied = (m) => {
    console.log(m);
  };
  const handleDosageFormApproved = (d) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to approved ${d.dosageForm}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        // updateUser
        const updateData = {
          status: "approved",
        };
        axiosSecure
          .patch(`/dosageFormUpdateById/${d._id}`, updateData)
          .then((response) => {
            Swal.fire("Done!", `${d.dosageForm} is approved now.`);
            dosageForm();
          })
          .catch((error) => {
            setLoading(false);
          });
      }
    });
  };
  const handleDosageFormDenied = (d) => {
    console.log(d);
  };

  // handle seller
  const handleSellerApproved = (seller) => {
    const sellerInformation = {
      isSellerRequest: false,
      role: "seller",
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this seller?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${import.meta.env.VITE_API_URL}/seller/request/maintain/${
              seller && seller?._id
            }`,
            sellerInformation
          )
          .then((res) => {
            if (res.data.acknowledged) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              sellerRefetch();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const handleSellerDenied = (seller) => {
    const sellerInformation = {
      isSellerRequest: "denied",
      role: "customer",
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You want to deny this seller request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${import.meta.env.VITE_API_URL}/seller/request/maintain/${
              seller && seller?._id
            }`,
            sellerInformation
          )
          .then((res) => {
            if (res.data.acknowledged) {
              Swal.fire("Your request has been updated.", "success");
              sellerRefetch();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const filteredGeneric = usePendingStatusFilter(allGeneric);
  const filteredManufacturer = usePendingStatusFilter(allManufacturer);
  const filteredDosageForm = usePendingStatusFilter(allDosageForm);

  if (isLoading) return <Loader />;

  return (
    <div>
      <div>
        <h1 className="text-center text-2xl">All Requests</h1>
      </div>
      <div className="mt-4 text-center">
        <Tabs>
          <TabList>
            <Tab>
              New Generics
              <div className="badge badge-sm">{filteredGeneric?.length}</div>
            </Tab>
            <Tab>
              New Manufacturer
              <div className="badge badge-sm">
                {filteredManufacturer?.length}
              </div>
            </Tab>
            <Tab>
              New Dosage Form
              <div className="badge badge-sm">{filteredDosageForm?.length}</div>
            </Tab>
            <Tab>
              Seller Request{" "}
              <div className="badge badge-sm">{isSellerRequest?.length}</div>
            </Tab>
          </TabList>

          <TabPanel className="text-start">
            <div className="grid md:grid-cols-3 gap-4 mt-5">
              {filteredGeneric.length === 0 ? (
                <p className="ml-4 text-2xl">No Generic Pending Found.</p>
              ) : (
                filteredGeneric.map((g) => (
                  <GenericCard
                    key={g?._id}
                    title="Generic"
                    email={g.sellerEmail}
                    name={
                      g.generic.length > 25
                        ? g?.generic.slice(0, 25) + "..."
                        : g?.generic
                    }
                    status={g?.status}
                    createdDate={formatDate(g?.createdAt)}
                    approved="Approved"
                    denied="Denied"
                    onApproved={() => handleGenericApproved(g)}
                    onDenied={() => handleGenericDenied(g)}
                  />
                ))
              )}
            </div>
          </TabPanel>
          <TabPanel className="text-start">
            <div className="grid md:grid-cols-3 gap-4 mt-5">
              {filteredManufacturer.length === 0 ? (
                <p className="ml-4 text-2xl text-center">
                  No Pending Manufacturer Found
                </p>
              ) : (
                filteredManufacturer?.map((m) => (
                  <GenericCard
                    key={m?._id}
                    title="Manufacturer"
                    email={m.sellerEmail}
                    name={
                      m.manufacturer.length > 25
                        ? m?.manufacturer.slice(0, 25) + "..."
                        : m?.manufacturer
                    }
                    status={m?.status}
                    createdDate={formatDate(m?.createdAt)}
                    approved="Approved"
                    denied="Denied"
                    onApproved={() => handleManufacturerApproved(m)}
                    onDenied={() => handleManufacturerDenied(m)}
                  />
                ))
              )}
            </div>
          </TabPanel>
          <TabPanel className="text-start">
            <div className="grid md:grid-cols-3 gap-4 mt-5">
              {filteredDosageForm.length === 0 ? (
                <p className="ml-4 text-2xl text-center">
                  No Pending Dosage Form Found
                </p>
              ) : (
                filteredDosageForm?.map((d) => (
                  <GenericCard
                    key={d?._id}
                    title="Dosage Form"
                    email={d.sellerEmail}
                    name={
                      d.dosageForm.length > 25
                        ? d?.dosageForm.slice(0, 25) + "..."
                        : d?.dosageForm
                    }
                    status={d?.status}
                    createdDate={formatDate(d?.createdAt)}
                    approved="Approved"
                    denied="Denied"
                    onApproved={() => handleDosageFormApproved(d)}
                    onDenied={() => handleDosageFormDenied(d)}
                  />
                ))
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-5">
              {isSellerRequest?.length === 0 ? (
                <>
                  <h3 className="text-3xl font-medium">No request found</h3>
                </>
              ) : (
                <>
                  {isSellerRequest?.map((seller) => (
                    <div
                      key={seller._id}
                      className="md:h-[150px] bg-slate-50 flex flex-col md:flex-row items-center px-4 py-8 md:py-0 mb-4 shadow-2xl"
                    >
                      <div className="avatar">
                        <div className="w-24 rounded-full">
                          <img src={seller.image} />
                        </div>
                      </div>
                      <div className="text-left md:ml-4  mt-3 md:mt-0">
                        <p className="font-semibold">
                          Address:{" "}
                          <span className="font-normal">{seller.address}</span>
                        </p>
                        <p className="font-semibold">
                          Shop Name:{" "}
                          <span className="font-normal">{seller.shopName}</span>
                        </p>
                        <p className="font-semibold">
                          Payment Method:{" "}
                          <span className="font-normal">
                            {seller.paymentMethod}
                          </span>
                        </p>
                        <p className="font-semibold">
                          Request Date:{" "}
                          <span className="font-normal">
                            {formatDate(seller.sellerRequestDate)}
                          </span>
                        </p>
                      </div>
                      <div className="mx-auto md:mx-0 md:ml-auto flex flex-col space-y-1 mt-3 md:mt-0">
                        <button
                          onClick={() => handleSellerApproved(seller)}
                          className="bg-sh px-4 py-[2px] text-white rounded-3xl hover:bg-black duration-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleSellerDenied(seller)}
                          className="bg-red-600 px-4 py-[2px] text-white rounded-3xl hover:bg-black duration-700"
                        >
                          Deny
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AllRequest;
