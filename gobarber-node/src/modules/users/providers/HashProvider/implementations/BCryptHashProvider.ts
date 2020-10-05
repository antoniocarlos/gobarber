import { hash, compare } from 'bcryptjs';
import IHashprovider from '../models/IHashProvider';

class BCryptHashProvider implements IHashprovider {
  public async generateHash(payload: string): Promise<string> {
    const hashedPassword = await hash(payload, 8);

    return hashedPassword;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const response = await compare(payload, hashed);

    return response;
  }
}

export default BCryptHashProvider;
