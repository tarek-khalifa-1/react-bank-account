import { useSelector } from "react-redux";
import UpdateCustomer from "./UpdateCustomer";
import { useState } from "react";

function Customer() {
  const [isUpdate, setIsUpdate] = useState(false);
  const customer = useSelector((state) => state.customer);

  return (
    <>
      <h2>
        👋 Welcome, {customer.fullName}
        <button onClick={() => setIsUpdate((is) => !is)}>Edit</button>
      </h2>
      {isUpdate && (
        <UpdateCustomer
          customerName={customer.fullName}
          setUpdate={setIsUpdate}
        />
      )}
    </>
  );
}

export default Customer;
