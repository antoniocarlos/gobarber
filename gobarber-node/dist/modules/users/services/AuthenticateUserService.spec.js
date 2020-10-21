"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheprovider = _interopRequireDefault(require("../../../shared/container/provider/CacheProvider/fakes/FakeCacheprovider"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheprovider;
let fakeUserRepository;
let fakeHashProvider;
let createUser;
let authenticateUser;
describe('Authenticate user', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheprovider = new _FakeCacheprovider.default();
    createUser = new _CreateUserService.default(fakeUserRepository, fakeHashProvider, fakeCacheprovider);
    authenticateUser = new _AuthenticateUserService.default(fakeUserRepository, fakeHashProvider);
  });
  it('Shoud be able to authenticate a user', async () => {
    const user = await createUser.execute({
      name: 'thiele',
      email: 'thiele@thiele.com',
      password: '123456'
    });
    const response = await authenticateUser.execute({
      email: 'thiele@thiele.com',
      password: '123456'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('Shoud not be able authenticate with a non existing user', async () => {
    await expect(authenticateUser.execute({
      email: 'b@t.com',
      password: '123457'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('Shoud not be able authenticate with incorrect password or email', async () => {
    await createUser.execute({
      name: 't',
      email: 't@t.com',
      password: '123456'
    });
    await expect(authenticateUser.execute({
      email: 't@t.com',
      password: '123455'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});