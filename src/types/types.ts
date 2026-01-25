export type ObjectId = string;

export interface PopulatedUser {
  _id: ObjectId;
  name?: string;
  email?: string;
  phone?: string;
}

export interface PopulatedMenuItem {
  _id: ObjectId;
  name?: string;
}

export interface Review {
  _id: ObjectId;
  user: ObjectId | PopulatedUser;
  item: ObjectId | PopulatedMenuItem;
  rating: number;
  comment: string;
}
