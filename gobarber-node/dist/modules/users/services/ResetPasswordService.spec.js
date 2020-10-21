"use strict";

var _FakeUserTokenRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokenRepository"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
// src/modules/users/services/ResetPasswordService.spec.ts
let fakeUserRepository;
let fakeUserTokenRepository;
let fakeHashProvider;
let resetPassword;
describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    fakeUserTokenRepository = new _FakeUserTokenRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPassword = new _ResetPasswordService.default(fakeUserRepository, fakeUserTokenRepository, fakeHashProvider);
  });
  it('Shoud be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokenRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({
      password: 'newpassword',
      token
    });
    const updatedUser = await fakeUserRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('newpassword');
    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).toEqual('newpassword');
  });
  it('shoud not be able to rest de password with a non-existin token', async () => {
    await expect(resetPassword.execute({
      token: 'non-existing-token',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('shoud not be able to rest de password with a non-existin user', async () => {
    const {
      token
    } = await fakeUserTokenRepository.generate('non-existing-user');
    await expect(resetPassword.execute({
      token,
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('Shoud not be able to reset the password with pass more than 2h', async () => {
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokenRepository.generate(user.id); // Ao invés de executar a função nativa do javascript ele executa a minha função customizada
    // Once é apenas para a primeira chamada dessa função no escopo

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPassword.execute({
      password: 'newpassword',
      token
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});