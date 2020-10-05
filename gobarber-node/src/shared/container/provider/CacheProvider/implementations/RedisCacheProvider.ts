import Redis, { Redis as RedisClient } from 'ioredis';
import cache from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cache.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parcedData = JSON.parse(data) as T;

    return parcedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    // Keys recebe uma pattern string
    // mostrando quais arquivos devem ser atingidos
    // * representa todos os registros com o prefixo independente do que vem depois
    // Recebe como respostas as chaves que atendem ao pattern
    const keys = await this.client.keys(`${prefix}:*`);

    // Pipeline executa múltiplas tarefas ao mesmo tempo sem bloquear o serviço.
    const pipeline = this.client.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
