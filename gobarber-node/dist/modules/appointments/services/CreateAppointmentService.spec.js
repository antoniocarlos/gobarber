"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _FakeCacheprovider = _interopRequireDefault(require("../../../shared/container/provider/CacheProvider/fakes/FakeCacheprovider"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// yarn test src/modules/appointments/services/CreateAppointmentService.spec.ts
let fakeAppointmentsRepository;
let fakeCacheprovider;
let fakeNotificationsRepository;
let createAppointment;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeCacheprovider = new _FakeCacheprovider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheprovider);
  });
  it('Shoud be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user_id',
      provider_id: '123456'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });
  it('Shoud not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointmentDate = new Date(2020, 5, 10, 11);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: '123456'
    });
    await expect( // O expect funciona como await
    createAppointment.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('Shoud not be able to create a appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect( // O expect funciona como await
    createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'user_id',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('Shoud not be able to create a appointments with the same user provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect( // O expect funciona como await
    createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123456',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('Shoud not be able to create a appointment with a non-work hour', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: 'user_id',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: 'user_id',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});