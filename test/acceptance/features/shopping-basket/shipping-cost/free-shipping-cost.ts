import { equal } from 'node:assert';
import { Then, When } from '@cucumber/cucumber';
import {
  computeShippingCost,
  getShippingCost,
} from '../framework/basket-shipping-cost.util';

When(
  'the shipping fees are calculated for basket {string}',
  async function (basketId: string) {
    await computeShippingCost(basketId);
  },
);

Then(
  'the shipping are free for the basket {string}',
  async function (basketId: string) {
    const response = await getShippingCost(basketId);

    equal(response.body.isFree, true);
  },
);

Then(
  'the shipping are not free for the basket {string}',
  async function (basketId: string) {
    const response = await getShippingCost(basketId);

    equal(response.body.isFree, false);
  },
);
