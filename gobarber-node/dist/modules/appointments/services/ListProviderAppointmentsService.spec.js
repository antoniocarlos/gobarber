"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _FakeCacheprovider = _interopRequireDefault(require("../../../shared/container/provider/CacheProvider/fakes/FakeCacheprovider"));

var _ListProviderAppointmentsService = _interopRequireDefault(require("./ListProviderAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
// yarn test src/modules/appointments/services/ListProviderAppointmentsService.spec.ts
let fakeAppointmentsRepository;
let listProviderAppointments;
let fakeCacheprovider;
describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeCacheprovider = new _FakeCacheprovider.default();
    listProviderAppointments = new _ListProviderAppointmentsService.default(fakeAppointmentsRepository, fakeCacheprovider);
  });
  it('Shoud be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    }); // O getTime é usado pois o now não retorna o mesmo formato do date
    // O date retorna um obj o now retorna um número
    // jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    //   return new Date(2020, 4, 20, 11).getTime();
    // });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 20,
      year: 2020,
      month: 5
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});