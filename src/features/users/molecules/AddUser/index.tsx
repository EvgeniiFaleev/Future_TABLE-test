import {useForm} from "react-hook-form";
import {InputField} from "@ui/atoms/InputField";
import styles from "./AddUser.module.scss";
import InputMask from 'react-input-mask';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation,} from '@fortawesome/free-solid-svg-icons';
import {usersActions} from "@users";
import {IUserInfo} from "@api/index";
import {useDispatch} from "react-redux";
import {EventHandler, FC} from "react";

interface IAddUserProps {
  closeModal: ()=>void
}

export const AddUser:FC<IAddUserProps> = ({closeModal}) => {


  const {
    register, handleSubmit, errors
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data: IUserInfo) => {
    console.log(errors)
    dispatch(usersActions.addUser(data));
    closeModal()
  };

  const onCloseModal =(e: React.MouseEvent<HTMLFormElement>)=> {
    const target = e.target as HTMLFormElement;
    if(target.classList.contains(styles.form)) closeModal()
  };

  return (

      <form onClick={onCloseModal} className={styles.form} onSubmit={handleSubmit(onSubmit)}>

        <div className={styles.inputs}>
          <InputField
              errorClassName={styles.error}
              fieldText="ID"
              fieldName="id"
              pattern={{
                value: /^\d+$/,
                message: 'ID must be a number',
              }}
              register={register}
              errors={errors}
          />
          <InputField
              type="email"
              errorClassName={styles.error}
              fieldText="E-mail"
              fieldName="email"
              register={register}
              errors={errors}
              required="Enter your e-mail"
              pattern={{
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Enter a valid e-mail address',
              }}
          />
          <div>
            <label>
              <p>Phone Number</p>
              <InputMask mask="(999)999-9999">
                {(inputProps: any) => {
                  return <input
                      ref={register({
                        pattern: {
                          value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                          message: 'Enter a valid phone number',
                        },
                        required: 'Enter your phone number'
                      })}
                      name="phone"
                      {...inputProps}
                      type="tel"
                  />
                }}
              </InputMask>
              {errors.phoneNumber && (
                  <span className={styles.error}>
                  <FontAwesomeIcon icon={faExclamation}/>
                    {' '}
                    {errors.phoneNumber.message || 'This field is required'}
                  </span>
              )}
            </label>
          </div>
          <p className={styles.billing}>Billing Address</p>
          <InputField
              errorClassName={styles.error}
              fieldText="First Name"
              fieldName="firstName"
              pattern={{
                value: /^[^0-9]+$/,
                message: 'firstName must be a text',
              }}
              register={register}
              errors={errors}
          />
          <InputField
              errorClassName={styles.error}
              fieldText="Last Name"
              fieldName="lastName"
              pattern={{
                value: /^[^0-9]+$/,
                message: 'LastName must be a text',
              }}
              register={register}
              errors={errors}
          />
          <InputField
              errorClassName={styles.error}
              fieldText="Street Address"
              fieldName="address[streetAddress]"
              register={register}
              errors={errors}
          />
          <InputField
              errorClassName={styles.error}
              fieldText="City"
              fieldName="address[city]"
              pattern={{
                value: /^[^0-9]+$/,
                message: 'City must be a text',
              }}
              register={register}
              errors={errors}
          />
          <InputField
              errorClassName={styles.error}
              fieldText="ZIP"
              fieldName="address[zip]"
              pattern={{
                value: /^\d{5}$/,
                message: 'ZIP must be a number and contain 5 digits',
              }}
              register={register}
              errors={errors}
          />
          <InputField
              errorClassName={styles.error}
              fieldText="State"
              fieldName="address[state]"
              pattern={{
                value: /^[^0-9]+$/,
                message: 'State must be a text',
              }}
              register={register}
              errors={errors}
          />
          <input className={styles.button_submit}  type="submit"/>
        </div>
      </form>
  )
}
