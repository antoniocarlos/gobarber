"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/provider/StorageProvider/fakes/FakeStorageProvider"));

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeStorageProvider;
let updateUserAvatar;
describe('Update user avatar', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    updateUserAvatar = new _UpdateUserAvatarService.default(fakeUserRepository, fakeStorageProvider);
  });
  it('Shoud be able to update a users avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'xpto.jpg'
    });
    expect(user.avatar).toBe('xpto.jpg');
  });
  it('Shoud not be able to update avatar with a non existing user', async () => {
    await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'xpto.jpg'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('Shoud be able to delete and update a avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'xpto.jpg'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'xpto2.jpg'
    });
    expect(deleteFile).toHaveBeenCalledWith('xpto.jpg');
    expect(user.avatar).toBe('xpto2.jpg');
  });
});