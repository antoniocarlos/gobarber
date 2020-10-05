import { container } from 'tsyringe';

// Qual é a interface? Que formato tem essa informação para comunicação?
import IHashProvider from './HashProvider/models/IHashProvider';
// Qual é a depêndêcia que será injetada?
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>(
  'HashProvider', // Como será chamada essa injeção
  BCryptHashProvider,
);
