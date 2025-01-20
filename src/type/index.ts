export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ICategory;
}
export interface ICategory {
  id: string;
  name: string;
}

export enum EActionType {
  Add = "add",
  Edit = "edit"
}