import { useEffect, useState } from "react";
import { AddressAutofill, config } from "@mapbox/search-js-react";

export default function MapSearch() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken =
      "pk.eyJ1IjoiYmVydGF6b2xpdCIsImEiOiJjbHc2ZnZkMXIxd3ZnMmtuNnFocDg2MDBpIn0.3FrIoyBW1TCx6Yb9VAsCEA";
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  return (
    <div className="MapSearch">
      <form>
        <AddressAutofill accessToken={token}>
          <input
            name="address"
            placeholder="Address"
            type="text"
            autoComplete="address-line1"
          />
        </AddressAutofill>

        <input
          name="unit"
          placeholder="Unit number"
          type="text"
          autoComplete="address-line2"
        />

        <input
          name="city"
          placeholder="City"
          type="text"
          autoComplete="address-level2"
        />

        <input
          name="state"
          placeholder="State"
          type="text"
          autoComplete="address-level1"
        />

        <input
          name="country"
          placeholder="Country"
          type="text"
          autoComplete="country"
        />

        <input
          name="postcode"
          placeholder="Postcode"
          type="text"
          autoComplete="postal-code"
        />
      </form>
    </div>
  );
}
