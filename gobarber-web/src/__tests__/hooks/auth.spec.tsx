import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "../../hooks/auth";

import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';
import { useRouteMatch } from "react-router-dom";

const apiMock = new MockAdapter(api);


describe('Auth hook', () => {
  it('should be able to sign in', async () => {

    const apiResponse = {
      user: {
        id: 'user123',
        name: 'Test',
        email: 'test@test.com',
      },
      token: 'token-123',
    };

    // apiMock é responsável por injetar valores fictícios na chamada a api
    apiMock.onPost('sessions').reply(200, apiResponse);

    // O localStorage não pode ser observado diretamente deve ser usado Storage.prototype
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    // Para que o hook funcione ele precisa de um contexto que vai por volta dele
    // Para prover esse contexto é usado o método wrapper

    // waitForNextUpdate usado quando existem funções assíncronas de forma
    // semelhante ao wait, quando queremos observar uma variável específica
    // pode ser usado o waitForValueToChange
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'test@test.com',
      password: '123456'
    });

    // Dessa forma a execução será pausada até que ocorra uma atualização dentro do hook.
    await waitForNextUpdate();

    // Faz a validação de que as informações estão sendo armazenadas no storage
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );

    expect(result.current.user.email).toEqual('test@test.com');
  });

  it('should be able to restore information in localStorage', () => {
    // Mockando/Controlando a resposta de uma função
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user123',
            name: 'Test',
            email: 'test@test.com',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('test@test.com');
  });


  it('should be able to sign out', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user123',
            name: 'Test',
            email: 'test@test.com',
          });
        default:
          return null;
      }
    });

    // Mockando/Controlando a resposta de uma função
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem')

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // Quando uma função síncrona é chamada e queremos esperar um update
    // o ideal é usar a função act por volta da função e não o waitForNextUpdate
    act(() => {
      result.current.signOut();
    })

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update the user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'user123',
      name: 'Test',
      email: 'test@test.com',
      avatar_url: 'image.jpg'
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toBeCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  });
});
