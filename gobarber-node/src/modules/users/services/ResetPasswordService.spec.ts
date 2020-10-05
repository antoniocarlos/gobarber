// import AppError from '@shared/errors/AppError';

import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
// src/modules/users/services/ResetPasswordService.spec.ts

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it('Shoud be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: 'newpassword',
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('newpassword');
    expect(updatedUser?.password).toEqual('newpassword');
  });

  it('shoud not be able to rest de password with a non-existin token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to rest de password with a non-existin user', async () => {
    const { token } = await fakeUserTokenRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shoud not be able to reset the password with pass more than 2h', async () => {
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    // Ao invés de executar a função nativa do javascript ele executa a minha função customizada
    // Once é apenas para a primeira chamada dessa função no escopo

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: 'newpassword',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
