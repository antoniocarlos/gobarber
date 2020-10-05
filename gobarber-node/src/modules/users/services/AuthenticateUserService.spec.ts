import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeCacheprovider from '@shared/container/provider/CacheProvider/fakes/FakeCacheprovider';
import CreateUserService from './CreateUserService';
import AuthenticateUserServer from './AuthenticateUserService';

let fakeCacheprovider: FakeCacheprovider;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserServer;

describe('Authenticate user', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheprovider = new FakeCacheprovider();

    createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheprovider,
    );
    authenticateUser = new AuthenticateUserServer(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('Shoud be able to authenticate a user', async () => {
    const user = await createUser.execute({
      name: 'thiele',
      email: 'thiele@thiele.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'thiele@thiele.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Shoud not be able authenticate with a non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'b@t.com',
        password: '123457',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Shoud not be able authenticate with incorrect password or email', async () => {
    await createUser.execute({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 't@t.com',
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
