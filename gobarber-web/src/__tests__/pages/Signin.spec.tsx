import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

// mock = quando o módulo for chamado/importado retornamos o valor desejado.
// jest.fn() = Uma função vazia, apenas para preencher o módulo chamado.
// mas que pode retornar valores pré-definidos

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    // React.ReactNode = Qualquer conteúdo que um componente react poderia receber ex, string, jsx, number...
    // Usado para tipar children em jsx
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  }
});

describe('Signin Page', () => {

  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('Should be able to sign in', async () => {
    // const { debug } = render(<SignIn />);
    // Uma espécie de console log que retorna a página renderizada
    // debug();

    // Com o getBy... é possivel pegar a referência de um elemento
    const { getByPlaceholderText, getByText } = render(<SignIn />);


    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    // fireEvent, simula interações do usuário
    // O nome do evento é change, uma vez que, o evento é disparado pelo onChange
    // O mesmo raciocínio pode ser seguido para o onBlur...
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    // Como o módulo que está sendo testado é async a função de teste também deve ser
    // A função waitFor é usada para verificar quando a função desejada terminou de executar.
    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('Should not be able to sign in with invalid credentials', async () => {

    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('Should display an error if login fails', async () => {
    // Reescreve a implementação da função.
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        })
      );
    });
  });
});
