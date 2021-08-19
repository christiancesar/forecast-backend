export default interface ICreateAddressDTO {
  street: string;
  number: string;
  complement: string;
  reference: string;
  district: string;
  city: string;
  state: string;
  stateAcronym: string;
  postalCode: string;
  latitude: string;
  longitude: string;
}

// pattern: /^\d{5}-?\d{3}$/
