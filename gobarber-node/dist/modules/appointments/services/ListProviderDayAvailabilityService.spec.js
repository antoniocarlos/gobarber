"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("./ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
// yarn test src/modules/appointments/services/ListProviderDayAvailabilityService.spec.ts
let fakeAppointmentsRepository;
let listProviderDayAvailabilityService;
describe('listProvidersMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    listProviderDayAvailabilityService = new _ListProviderDayAvailabilityService.default(fakeAppointmentsRepository);
  });
  it('Shoud be able to list the day availabiblity to this providers', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 15, 0, 0)
    }); // O getTime é usado pois o now não retorna o mesmo formato do date
    // O date retorna um obj o now retorna um número

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });
    const availabiblity = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      day: 20,
      year: 2020,
      month: 5
    });
    expect(availabiblity).toEqual(expect.arrayContaining([{
      hour: 8,
      available: false
    }, {
      hour: 9,
      available: false
    }, {
      hour: 10,
      available: false
    }, {
      hour: 14,
      available: false
    }, {
      hour: 15,
      available: false
    }, {
      hour: 16,
      available: true
    }, {
      hour: 13,
      available: true
    }]));
  });
});