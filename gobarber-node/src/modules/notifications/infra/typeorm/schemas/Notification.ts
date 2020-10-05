import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID; // O mongo trabalha com um tipo de id padrão

  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string;

  @Column({ default: false }) // Como no mongo não usamos as migrations temos que definis os valores padrão na declaração de tipo
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
