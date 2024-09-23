import * as React from "react";
import CompactHeader from "../CompactHeader/CompactHeader";
import './Checkout.css'
import Button from "../Button/Button.jsx";

const defaultForm = {
  firstName: "",
  lastName: "",
};

const Checkout = () => {
  const [data, setData] = React.useState(defaultForm);
  const isInvalid = !data.firstName || !data.lastName;

  function changeData(ev) {
    const { name, value } = ev.currentTarget;
    setData({
      ...data,
      [name]: value,
    });
  }

  function submit(ev) {
    window.dispatchEvent(new CustomEvent("clear-cart"));
    history.pushState({}, undefined, "/checkout/thanks");
    ev.preventDefault();
  }

  return (
    <div data-boundary-page="checkout">
      <CompactHeader />
      <main className="c_Checkout">
        <h2>Checkout</h2>
        <form
          action="/checkout/place-order"
          method="post"
          className="c_Checkout__form"
          onSubmit={submit}
        >
          <h3>Personal Data</h3>
          <fieldset className="c_Checkout__name">
            <div>
              <label className="c_Checkout__label" htmlFor="c_firstname">
                First name
              </label>
              <input
                className="c_Checkout__input"
                type="text"
                id="c_firstname"
                name="firstName"
                required
                value={data.firstName}
                onChange={changeData}
              />
            </div>
            <div>
              <label className="c_Checkout__label" htmlFor="c_lastname">
                Last name
              </label>
              <input
                className="c_Checkout__input"
                type="text"
                id="c_lastname"
                name="lastName"
                required
                value={data.lastName}
                onChange={changeData}
              />
            </div>
          </fieldset>

          <div className="c_Checkout__buttons">
            <Button type="submit" variant="primary" disabled={isInvalid}>
              place order
            </Button>
            <Button href="/checkout/cart" variant="secondary">
              back to cart
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Checkout;
