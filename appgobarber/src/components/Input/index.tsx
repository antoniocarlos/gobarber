import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';

/**
 * Neste caso específico onde é preciso passar uma informação de um
 * componente filho para um componente pai
 * Deve ser usado o useImperativeHandle
 * Uma vez que o ref do TextInput já está sendo usado
 * e precisamos passar uma segunda referência
 *
 * O useImperativeHandle exige que a função exportada esteva
 * dentro de um forwardRef().
 */

import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {};
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}
/**
 * Uma ref não pode ser acessada como uma propriedade comum de um elemento
 * Ela é recebida como um segundo parâmetro
 *
 * Por padrão o FC não recebe referências.
 * Em casos onde o componente recebe referências externas
 * deve ser usado o RefForwardingComponent
 * É um componente que aceita receber uma ref
 *
 * Ele pede dois parâmentros de tipagem
 * O primeiro é o tipo da ref
 * O segundo é o tipo do componente
 */
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, containerStyle = {}, ...rest },
  ref,
) => {
  /**
   * para que o compo seja preenchido automaticamente por meio de uma
   * ação do usuário, o arquvo que instancia o Input deve usar
   * formRef.current.setFieldValue e para que essa função funcione
   * é peciso preparar este arquivo, criando uma referência do elemento de input
   */
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  /**
   * Na web temos acesso direto ao value dos elementos da DOM
   * Mas no mobile não é da mesma forma.
   * É preciso usar uma referência do valor digitado
   */

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        // Caso o unform esteva querendo modificar algum valor
        inputValueRef.current.value = value; // Muda o valor do input
        inputElementRef.current.setNativeProps({ text: value });
        // Muda visualmente o texto que está dentro do input
        // Uma vez que o componente não reflete de forma automática o valor que está sendo armazenado na refeência
      },
      clearValue() {
        inputValueRef.current.value = ''; // Muda o valor do input
        inputElementRef.current.cler();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
