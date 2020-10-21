"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeCacheprovider = _interopRequireDefault(require("../../../shared/container/provider/CacheProvider/fakes/FakeCacheprovider"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeHashProvider;
let createUserService;
let fakeCacheprovider;
describe('Create user', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheprovider = new _FakeCacheprovider.default();
    createUserService = new _CreateUserService.default(fakeUserRepository, fakeHashProvider, fakeCacheprovider);
  });
  it('Shoud be able to create a user', async () => {
    const user = await createUserService.execute({
      name: 't',
      email: 't@t.com',
      password: '123456'
    });
    expect(user).toHaveProperty('id');
  });
  it('Shoud not be able to create a user with the same email', async () => {
    await createUserService.execute({
      name: 't',
      email: 't@t.com',
      password: '123456'
    });
    await expect(createUserService.execute({
      name: 't',
      email: 't@t.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});