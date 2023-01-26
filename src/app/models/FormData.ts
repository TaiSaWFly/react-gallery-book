export interface IFormData {
  cover: string;
  name: string;
  author: string;
}

export interface IFormErrors {
  name?: string;
  author?: string;
  path?: any;
  message?: string;
}

export interface IEditFormData {
  _id: string;
  name?: string;
  author?: string;
  cover?: string;
}
