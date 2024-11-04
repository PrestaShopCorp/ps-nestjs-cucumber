import { Module } from '@nestjs/common';
import { ShoppingBasketModule } from '@contexts/shopping-basket/shopping-basket.module';
import { SharedModule } from '@shared/shared.module';

const contexts = [ShoppingBasketModule, SharedModule];

@Module({
  imports: [...contexts],
  controllers: [],
  providers: [],
})
export class AppModule {}
