import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheprovider from '@shared/container/provider/CacheProvider/fakes/FakeCacheprovider';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from './CreateAppointmentService';
// yarn test src/modules/appointments/services/CreateAppointmentService.spec.ts

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheprovider: FakeCacheprovider;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheprovider = new FakeCacheprovider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheprovider,
    );
  });

  it('Shoud be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user_id',
      provider_id: '123456',
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
      provider_id: '123456',
    });

    await expect(
      // O expect funciona como await
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user_id',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Shoud not be able to create a appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      // O expect funciona como await
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: 'user_id',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Shoud not be able to create a appointments with the same user provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      // O expect funciona como await
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '123456',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Shoud not be able to create a appointment with a non-work hour', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: 'user_id',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: 'user_id',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
