export type ObjectId = string;

export interface PopulatedUser {
  _id: ObjectId;
  name?: string;
  email?: string;
  phone?: string;
  age?: number;
  // ... các field khác nếu cần
}

export interface PopulatedMenuItem {
  _id: ObjectId;
  name?: string;
  // ... các field khác nếu cần
}

/**
 * Review có thể ở 2 trạng thái:
 *  - chưa populate: user, menuItem là ObjectId (string)
 *  - đã populate:   user là object, menuItem là object
 */
export interface Review {
  _id: ObjectId;
  user: ObjectId | PopulatedUser;
  item: ObjectId | PopulatedMenuItem;
  rating: number;
  comment: string;
  __v?: number;
}
