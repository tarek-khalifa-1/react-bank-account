import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCustomerName } from "./customerSice";

function UpdateCustomer({ customerName, setUpdate }) {
  const [fullName, setFullName] = useState();
  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h2>Update customer name</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            defaultValue={customerName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <button
            onClick={() => {
              if (fullName) dispatch(updateCustomerName(fullName));
              setUpdate(false);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateCustomer;
