export type Travelproduct = {
  _id: string | number;
  name: string;
  remarks: string;
  contents: string;
  price: number;
  tags: string[];
  images: string[] | null;
  pickedCount: number;
  travelproductAddress: string;
  buyer: string;
  seller: string;
  soldAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
