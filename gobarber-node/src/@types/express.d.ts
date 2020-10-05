// Overyde de tipos
// Arquivo que modifica uma tipagem de dado dentro da biblioteca do express
declare namespace Express {
  // Sobreescrevendo Request, acrescentando tipagens
  export interface Request {
    user: {
      id: string;
    };
  }
}
