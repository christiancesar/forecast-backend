export default interface IUpdateUserDTO {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  individualTaxNumber: string;
  password: string;
  old_password: string;
  // avatar: string;
}
