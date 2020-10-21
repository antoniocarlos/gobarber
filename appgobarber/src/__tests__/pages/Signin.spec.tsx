import React from 'react';
import { render } from 'react-native-testing-library';
import SignIn from '../../pages/SignIn';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('SignIn page', () => {
  it('should contain email and password inputs', () => {
    const { getByPlaceholder } = render(<SignIn />);

    // Para buscar por ID no react native o componente deve ter a propriedade testID
    // Assim ele pode ser encontrado pelo findByTestId

    expect(getByPlaceholder('E-mail')).toBeTruthy();
    expect(getByPlaceholder('Senha')).toBeTruthy();
  });
});
