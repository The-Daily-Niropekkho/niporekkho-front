export interface Contact {
  id: string;
  editor_name: string;
  content: string;
  address: string;
  phone: string;
  phoneTwo: string;
  email: string;
  website: string;
  latitude: number | null;
  longitude: number | null;
  map: string | null;
  rights: string;
  is_deleted: boolean;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
