export interface ITokenProvider {
  // eslint-disable-next-line
  generate(userId: string, payload: object): string;
}
