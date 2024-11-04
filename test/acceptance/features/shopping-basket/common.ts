import { Given } from '@cucumber/cucumber';
import { addItemToBasket, createBasket } from './framework/basket.util';

Given('the basket {string} is created', async function (basketId: string) {
  await createBasket(basketId);
});

Given(
  'the item {string} is added to the basket {string}',
  async function (itemId: string, basketId: string) {
    await addItemToBasket(basketId, { id: itemId });
  },
);
