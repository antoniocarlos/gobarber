"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeCacheprovider = _interopRequireDefault(require("../../../shared/container/provider/CacheProvider/fakes/FakeCacheprovider"));

var _ListProviderService = _interopRequireDefault(require("./ListProviderService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
// yarn test src/modules/appointments/services/ListProviderService.spec.ts
let fakeUserRepository;
let listProviderService;
let fakeCacheprovider;
describe('listProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    fakeCacheprovider = new _FakeCacheprovider.default();
    listProviderService = new _ListProviderService.default(fakeUserRepository, fakeCacheprovider);
  });
  it('Shoud be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 't1',
      email: 't1@t.com',
      password: '123456'
    });
    const user2 = await fakeUserRepository.create({
      name: 't2',
      email: 't2@t.com',
      password: '123456'
    });
    const user3 = await fakeUserRepository.create({
      name: 't3',
      email: 't3@t.com',
      password: '123456'
    });
    const user = await fakeUserRepository.create({
      name: 't4',
      email: 't4@t.com',
      password: '123456'
    });
    const providers = await listProviderService.execute({
      user_id: user.id
    });
    expect(providers).toEqual([user1, user2, user3]);
  });
});