import { useForm } from "react-hook-form";
import styles from "./LoginForm.module.scss";
import Input, { InputVariant } from "../Input/Input";
import Button, { ButtonVariant } from "../common/Button/Button";

interface ILoginFormFields {
  login: string;
  password: string;
}

interface ILoginFormProps {}

const LoginForm = (props: ILoginFormProps) => {
  const {} = props;
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<ILoginFormFields>({mode: "all"});

  return (
    <div className={styles.loginFormWrapper}>
      <h2>Sign in</h2>
      <div className={styles.inputRow}>
        <Input
          className={styles.formInput}
          inputVariant={InputVariant.Default}
          placeholder="Login"
          errorStyles={styles.errorMessage}
          inputProps={{
            ...register("login", {
              required: {
                value: true,
                message: "Login is required",
              },
              minLength: {
                value: 3,
                message: "Min length is 3",
              },
            }),
          }}
          errorText={errors.login?.message}
        />
      </div>
      <Input
        className={styles.formInput}
        inputVariant={InputVariant.Default}
        placeholder="Password"
        errorStyles={styles.errorMessage}
        inputProps={{
          ...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 3,
              message: "Min length is 3",
            },
          }),
        }}
        errorText={errors.password?.message}
      />
      <Button
        buttonVariant={ButtonVariant.Green}
        title="Sign in"
        onClick={() => {
          console.log(getValues());
          console.log(errors);
          handleSubmit(
            () => console.log("valid"),
            () => console.log("invalid")
          );
        }}
      />
    </div>
  );
};

export default LoginForm;
