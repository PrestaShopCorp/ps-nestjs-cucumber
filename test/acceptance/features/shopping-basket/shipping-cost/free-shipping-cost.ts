import { equal } from 'node:assert';
import { Then, When } from '@cucumber/cucumber';
import * as request from 'supertest';
import { server } from '../../root';

export const getShippingCost = async (basketId: string): Promise<any> => {
  const queryResponse = await request(server.application.getHttpServer())
    .get(`/basket/${basketId}/shipping-cost`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  return queryResponse;
};

When(
  'the shipping fees are calculated for basket {string}',
  async function (basketId: string) {
    await request(server.application.getHttpServer())
      .post(`/basket/${basketId}/shipping-cost`)
      .send({})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
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
