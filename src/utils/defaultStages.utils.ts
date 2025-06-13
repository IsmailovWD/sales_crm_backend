interface DefaultStage {
  name: string;
  order: number;
  color: string;
  key: string;
  is_deleted: boolean;
}

export const DEFAULT_DELIVERY_STAGES: ReadonlyArray<DefaultStage> = [
  {
    order: 1,
    name: 'Yangi',
    is_deleted: false,
    key: 'new',
    color: '#2080f0',
  },
  {
    order: 2,
    name: 'Qabul qilingan',
    is_deleted: false,
    key: 'accepted',
    color: '#8a2be2',
  },
  {
    order: 3,
    name: 'Yetkazib berishda',
    is_deleted: false,
    key: 'delivering',
    color: '#f0a020',
  },
  {
    order: 4,
    name: 'Yakunlandi',
    is_deleted: false,
    key: 'done',
    color: '#18a058',
  },
  {
    order: 5,
    name: 'Bekor qilindi',
    is_deleted: false,
    key: 'canceled',
    color: '#d03050',
  },
];
