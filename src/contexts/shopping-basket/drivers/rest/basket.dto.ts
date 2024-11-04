export class BasketItemDto {
  readonly id: string;
  readonly price: number;
  readonly quantity: number;
}

export class BasketDto {
  readonly id: string;
  readonly items: BasketItemDto[];
}
