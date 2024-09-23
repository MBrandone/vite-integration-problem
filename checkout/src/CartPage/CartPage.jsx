import * as React from 'react';
import {useLineItems} from "../data/store";
import data from '../data/db.json'
import LineItem from "../LineItem/LineItem";
import Button from "../Button/Button";
import './CartPage.css'

function convertToLineItems(items) {
  return items.reduce((res, { sku, quantity }) => {
    const variant = data.variants.find((p) => p.sku === sku);
    if (variant) {
      res.push({ ...variant, quantity, total: variant.price * quantity });
    }
    return res;
  }, []);
}

const CartPage = () => {
  const rawLineItems = useLineItems();
  const lineItems = convertToLineItems(rawLineItems);
  const total = lineItems.reduce((res, { total }) => res + total, 0);

  return (
    <div data-boundary-page="checkout">
      <main className="c_CartPage">
        <h2>Basket</h2>
        <ul className="c_CartPage__lineItems">
          {lineItems.map((li) => (
            <LineItem {...li} key={li.sku} />
          ))}
        </ul>
        <hr />
        <p className="c_CartPage__total">Total: {total} Ø</p>
        <div className="c_CartPage__buttons">
          <Button href="/checkout/checkout" variant="primary">
            Checkout
          </Button>
          <Button href="/" variant="secondary">
            Continue Shopping
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
