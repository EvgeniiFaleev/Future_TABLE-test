import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamation,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {FC, FocusEventHandler, FormEventHandler} from 'react';
import {
  FieldErrors,
  RegisterOptions,
  UseFormMethods
} from "react-hook-form";

interface IInputFieldProps{
  errorClassName: string,
  fieldText?: string,
  iconError?: IconDefinition,
  fieldName: string,
  type?: string,
  value?:string,
  register: UseFormMethods['register'],
  errors: FieldErrors,
  required? : RegisterOptions['required'],
  pattern? : RegisterOptions['pattern'],
  minLength?: RegisterOptions['minLength'],
  maxLength?: RegisterOptions['maxLength'],
  validate?: RegisterOptions['validate'],
  onFocus?: FocusEventHandler<HTMLInputElement>,
  mask?: string
}

export const InputField:FC<IInputFieldProps> = ({
  type = 'text', value,
  register, errors, required = true,
  fieldText,
  errorClassName, iconError = faExclamation,
  fieldName, onFocus, children,
  pattern, minLength, maxLength, validate,

}) => {
  return (
  <div>
    <label>
      {fieldText && <p>{fieldText}</p>}
      <input
        ref={register({
          required, pattern, minLength, maxLength, validate,
        })}
        type={type}
        name={fieldName}
        onFocus={onFocus}
        value={value}
        readOnly={Boolean(value)}
      />
      {children}
      {errors[fieldName] && (
      <span className={errorClassName}>
        <FontAwesomeIcon icon={iconError} />
        {' '}
        {errors[fieldName].message || 'This field is required'}
      </span>
      )}
    </label>
  </div>
)};
