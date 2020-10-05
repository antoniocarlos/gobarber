// Que métodos um provedor de hash precisa ter para se comunicar com minha aplicação

export default interface IHashprovider {
  // payload: informação qualquer
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
