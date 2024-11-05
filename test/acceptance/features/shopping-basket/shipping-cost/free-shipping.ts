import { equal } from 'node:assert';
import { Given, Then, When } from '@cucumber/cucumber';
import * as request from 'supertest';
import { server } from '../../root';

Given('the basket {string} is created', async function (basketId: string) {
  await request(server.application.getHttpServer())
    .post(`/basket`)
    .send({ id: basketId })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
});

Given(
  'the item {string} is added to the basket {string}',
  async function (itemId: string, basketId: string) {
    await request(server.application.getHttpServer())
      .post(`/basket/${basketId}/item`)
      .send({ id: itemId })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  },
);

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
    const response = await request(server.application.getHttpServer())
      .get(`/basket/${basketId}/shipping-cost`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    equal(response.body.isFree, true);
  },
);

Then(
  'the shipping are not free for the basket {string}',
  async function (basketId: string) {
    const response = await request(server.application.getHttpServer())
      .get(`/basket/${basketId}/shipping-cost`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    equal(response.body.isFree, false);
  },
);
