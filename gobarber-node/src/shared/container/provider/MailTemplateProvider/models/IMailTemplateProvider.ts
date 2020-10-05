import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  // Quando uma interface recebe uma informação composta o ideal é montar um DTO
  parse(date: IParseMailTemplateDTO): Promise<string>;
}
