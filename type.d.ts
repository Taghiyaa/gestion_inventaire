type CategorieType = {
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type ProductType = {
  name: string;
  categorie: CategorietType;
  prix: number;
  remise?: number;
  qteRemise?: number;
  qteInStock?: number;
  qteHorsService?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type UserType = {
  username: string;
  password: string;
  isActive: boolean;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
};
type StockType = {
  productId: any;
  qtHorsService: number;
  qte: number;
  limite: number;
  createdAt?: Date;
  updatedAt?: Date;
};
type CommandeType = {
  code: any;
  numeroClient: number;
  products: ({ qte: number } & ProductType)[];
  montant: number;
  createdAt?: Date;
  updatedAt?: Date;
};
