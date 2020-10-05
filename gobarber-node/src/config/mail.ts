interface IMailConfig {
  // Configura quais são os drivers aceitos
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  // Configura qual driver estamos usando para envio de email
  driver: process.env.MAIL_DRIVER || 'ethereal', // Caso esta variavel não esteja preenchida é assumido o valor de desenvolvimento

  defaults: {
    from: {
      email: 'equipe@gobarber.com.br',
      name: 'Equipe GoBarber',
    },
  },
} as IMailConfig;
// Dessa forma conseguimos garantir que só um desses dois valores será passado.
