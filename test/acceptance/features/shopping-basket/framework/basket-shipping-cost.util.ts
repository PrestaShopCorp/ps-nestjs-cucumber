import * as request from 'supertest';
import { server } from '../../root';

export const computeShippingCost = async (basketId: string): Promise<any> => {
  const queryResponse = await request(server.application.getHttpServer())
    .post(`/basket/${basketId}/shipping-cost`)
    .send({})
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  return queryResponse;
};

export const getShippingCost = async (basketId: string): Promise<any> => {
  const queryResponse = await request(server.application.getHttpServer())
    .get(`/basket/${basketId}/shipping-cost`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  return queryResponse;
};
