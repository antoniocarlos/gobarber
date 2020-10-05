import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/provider/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('Update user avatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });
  it('Shoud be able to update a users avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'xpto.jpg',
    });

    expect(user.avatar).toBe('xpto.jpg');
  });

  it('Shoud not be able to update avatar with a non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'xpto.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shoud be able to delete and update a avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'xpto.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'xpto2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('xpto.jpg');

    expect(user.avatar).toBe('xpto2.jpg');
  });
});
