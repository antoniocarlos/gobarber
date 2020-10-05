// import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheprovider from '@shared/container/provider/CacheProvider/fakes/FakeCacheprovider';
import ListProviderService from './ListProviderService';

// yarn test src/modules/appointments/services/ListProviderService.spec.ts

let fakeUserRepository: FakeUserRepository;
let listProviderService: ListProviderService;
let fakeCacheprovider: FakeCacheprovider;

describe('listProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheprovider = new FakeCacheprovider();

    listProviderService = new ListProviderService(
      fakeUserRepository,
      fakeCacheprovider,
    );
  });
  it('Shoud be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 't1',
      email: 't1@t.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 't2',
      email: 't2@t.com',
      password: '123456',
    });

    const user3 = await fakeUserRepository.create({
      name: 't3',
      email: 't3@t.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 't4',
      email: 't4@t.com',
      password: '123456',
    });

    const providers = await listProviderService.execute({
      user_id: user.id,
    });

    expect(providers).toEqual([user1, user2, user3]);
  });
});
