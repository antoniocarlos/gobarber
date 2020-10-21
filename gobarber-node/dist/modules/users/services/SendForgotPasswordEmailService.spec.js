"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/provider/MailProvider/fakes/FakeMailProvider"));

var _FakeUserTokenRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokenRepository"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeMailProvider;
let fakeUserTokenRepository;
let sendForgotPasswordEmail;
describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokenRepository = new _FakeUserTokenRepository.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUserRepository, fakeMailProvider, fakeUserTokenRepository);
  });
  it('Shoud be able to recover the password with the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 't@t.com'
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('Shoud not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 't@t.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('shout generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: user.email
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});