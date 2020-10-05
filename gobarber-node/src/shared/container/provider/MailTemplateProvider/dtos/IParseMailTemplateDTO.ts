// Criando uma variavel dinâmica que pode seceber vários dados diferentes
interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
