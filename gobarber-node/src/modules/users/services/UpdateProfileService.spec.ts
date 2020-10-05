import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

// yarn test src/modules/users/services/UpdateProfileService.spec.ts

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('Update prfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('Shoud be able to update a users profile', async () => {
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      name: 'test',
      email: 'test@test.com',
      user_id: user.id,
    });

    expect(updatedUser.name).toBe('test');
    expect(updatedUser.email).toBe('test@test.com');
  });
  it('Shoud not be able to update user profile for non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'user_non_existe',
        email: 'teste@test.com',
        name: 't',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Shoud not be able to update a users profile with a existing email', async () => {
    const firstUser = await fakeUserRepository.create({
      name: 'tone',
      email: 'tone@t.com',
      password: '123456',
    });
    await fakeUserRepository.create({
      name: 'ttwo',
      email: 'ttwo@t.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        name: 'test',
        email: 'ttwo@t.com',
        user_id: firstUser.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Shoud be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      name: 't',
      email: 't@t.com',
      user_id: user.id,
      old_password: '123456',
      password: 'new_password',
    });

    expect(updatedUser.password).toBe('new_password');
  });
  it('Shoud not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        name: 't',
        email: 't@t.com',
        user_id: user.id,
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Shoud not be able to update the password without wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        name: 't',
        email: 't@t.com',
        user_id: user.id,
        old_password: 'wrong_old_password',
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
