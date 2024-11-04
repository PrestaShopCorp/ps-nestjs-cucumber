import * as request from 'supertest';
import { server } from '../../root';

export const createBasket = async (basketId: string): Promise<any> => {
  const queryResponse = await request(server.application.getHttpServer())
    .post(`/basket`)
    .send({ id: basketId })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  return queryResponse;
};

export const addItemToBasket = async (
  basketId: string,
  item: { id: string },
): Promise<any> => {
  const queryResponse = await request(server.application.getHttpServer())
    .post(`/basket/${basketId}/item`)
    .send(item)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  return queryResponse;
};