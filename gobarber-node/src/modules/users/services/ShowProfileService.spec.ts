import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

// yarn test src/modules/users/services/showProfileService.spec.ts

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('Update user avatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });
  it('Shoud be able to show user profile', async () => {
    const user = await fakeUserRepository.create({
      name: 't',
      email: 't@t.com',
      password: '123456',
    });

    const showUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(showUser.name).toBe('t');
  });
  it('Shoud not be able to show user profile for non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'user_non_existe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
