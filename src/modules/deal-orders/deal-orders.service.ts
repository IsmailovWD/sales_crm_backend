import { DatabaseService } from '../../libs/database/database.service';
import { BaseService } from '../base.service';
import { OrdersDto } from '../deal/dto/deal-create.dto';
import { Deal } from '../deal/entities/deal.entity';
import { DealOrders } from './entities/dealOrders.entity';

export class DealOrdersService extends BaseService<DealOrders> {
  constructor(protected readonly databaseService: DatabaseService) {
    super(databaseService, DealOrders);
  }
  async addOrders(deal: Deal, orders: OrdersDto[], isUpdate = false) {
    if (isUpdate) await this.getRepo().delete({ deal: { id: deal.id } });
    if (orders.length) {
      const data = orders.map((order) => ({ ...order, deal_id: deal.id }));
      await this.getRepo().insert(data);
    }
  }
}
