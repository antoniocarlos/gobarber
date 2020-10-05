import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(date: ISendMailDTO): Promise<void>;
}
