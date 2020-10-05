import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: container.resolve(DiskStorageProvider),
  s3: container.resolve(S3StorageProvider),
};

// O registerSingleton cria uma instancia da classe sem usar o constructor dela.
// Para ativar o constructor deve ser usada o registerInstance e fazer o instanciamento manualmente.

container.registerInstance<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
