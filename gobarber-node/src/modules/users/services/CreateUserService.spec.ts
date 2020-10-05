import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheprovider from '@shared/container/provider/CacheProvider/fakes/FakeCacheprovider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeCacheprovider: FakeCacheprovider;

describe('Create user', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheprovider = new FakeCacheprovider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheprovider,
    );
  });

  it('Shoud be able to create a user', async () => {
    const user = await createUserService.execute({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });

  it('Shoud not be able to create a user with the same email', async () => {
    await createUserService.execute({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 't',
        email: 't@t.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
