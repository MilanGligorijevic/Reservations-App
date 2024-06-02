type Local = {
  id: string;
  name: string;
  about: string;
  address: string;
  city: string;
  images: Array<string>;
  tags: Array<string>;
  openingHours: string;
  closingHours: string;
  website: string;
  email: string;
  phoneNumber: string;
  instagram?: string;
  facebook?: string;
  // dodati ostale atribute
};

export default Local;
