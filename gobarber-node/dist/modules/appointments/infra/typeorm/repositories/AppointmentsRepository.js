"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Appointment = _interopRequireDefault(require("../entities/Appointment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Appointment.default);
  }

  async findByDate(date, provider_id) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
        provider_id
      }
    });
    return findAppointment;
  }

  async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }) {
    /**
     * O formato do mês até o nono dia vem em apenas um dígito
     * já a query trabalha com dois. O padStart verifica se a string tem um
     * determinado número de dígitos e completa com o fornecido.
     */
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,

        /**
         * Raw pode receber uma função além de apenas texto
         * O typeorm coloca um prefixo antes dos nomes dos campos
         * pois caso algum campo tenha um nome duplicado ele consiga
         * reconhecer. Esse nome de referência pode ser obtido como prâmetro
         * de entrada da função.
         */
        date: (0, _typeorm.Raw)(dateFieldName =>
        /**
         * to_char é uma função do postgres
         * Converte uma informação para string
         * O primeiro parâmetro é qual dado eu quero converter
         * O segundo é qual formato ele vai assumir
         */
        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
      }
    });
    return appointments;
  }

  async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year
  }) {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
      },
      relations: ['user']
    });
    return appointments;
  }

  async create({
    provider_id,
    user_id,
    date
  }) {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
      user_id
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

}

var _default = AppointmentsRepository;
exports.default = _default;