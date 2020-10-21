import React from 'react';

import Input from '../../components/Input';
import { fireEvent, render, waitFor } from '@testing-library/react';

// declaro a importação da função que eu desejo modificar o valor

jest.mock('@unform/core', () => {
  return {
    useField(){
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      }
    }
  };
})

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should be able to render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );

    // Pega a referência do input
    const inputElement = getByPlaceholderText('E-mail');
    // Pega a referência do container, que é modificado pelo focus
    // Nesse caso foi necessário colocar um id de test no código do container
    // Uma vez que não temos acesso ao elemento pai pelo input
    const containerElement = getByTestId('input-container');

    // fireEvent vem de dentro da biblioteca testing-library
    // Usado para simular eventos
    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000');
      expect(containerElement).toHaveStyle('color: #ff9000');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000');
      expect(containerElement).not.toHaveStyle('color: #ff9000');
    });
  });

  it('should be able to keep container highlight when it is filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');


    fireEvent.change(inputElement, { target: { value: 'johndoe@example.com' } });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: #ff9000');
    });
  });
});
