"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// yarn test src/modules/users/services/showProfileService.spec.ts
let fakeUserRepository;
let showProfileService;
describe('Update user avatar', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    showProfileService = new _ShowProfileService.default(fakeUserRepository);
  });
  it('Shoud be able to show user profile', async () => {
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456'
    });
    const showUser = await showProfileService.execute({
      user_id: user.id
    });
    expect(showUser.name).toBe('t');
  });
  it('Shoud not be able to show user profile for non-existing user', async () => {
    await expect(showProfileService.execute({
      user_id: 'user_non_existe'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});