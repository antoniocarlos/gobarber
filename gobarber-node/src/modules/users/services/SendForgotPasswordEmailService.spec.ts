import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/provider/MailProvider/fakes/FakeMailProvider';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('Shoud be able to recover the password with the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 't@t.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Shoud not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 't@t.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shout generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({ email: user.email });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
