import { sign } from 'jsonwebtoken';
import auth from '../../../../../config/auth';

export default class JwtProvider {
  // eslint-disable-next-line
  public generate(userId: string, payload: object = {}): string {
    const { secret, expiresIn } = auth.jwt;

    const token = sign(payload, secret, {
      subject: userId,
      expiresIn,
    });

    return token;
  }
}
