import { useForm } from "react-hook-form";
import clsx from "clsx";

const cv = require("card-validator");

const onSubmit = async (data) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  console.log(data);
};

export const PaymentForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting, isValid },
    trigger,
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-column"
      style={{ gap: "1ch" }}>
      <div className="flex flex-column" style={{ gap: "0.5ch" }}>
        <label htmlFor="cardNumber">Card Number</label>
        <input
          {...register("cardNumber", {
            required: true,
            maxLength: 16,
            validate: (v) => {
              console.debug(v);
              console.debug(cv.number(v));
              return cv.number(v)?.isValid || "Invalid card number";
            },
          })}
          className={clsx(errors?.cardNumber && "b--light-red")}
          placeholder="0123456789012345"
          onBlur={() => trigger("cardNumber")}
        />
      </div>
      <div className="flex flex-column" style={{ gap: "0.5ch" }}>
        <label htmlFor="expMonth">Expiration Month</label>
        <input
          {...register("expMonth", {
            required: true,
            maxLength: 2,
            validate: (v) => cv.expirationMonth(v).isValid,
          })}
          className={clsx(errors?.expMonth && "b--light-red")}
          placeholder="12"
          onBlur={() => trigger("expMonth")}
        />
      </div>
      <div className="flex flex-column" style={{ gap: "0.5ch" }}>
        <label htmlFor="expYear">Expiration Year</label>
        <input
          {...register("expYear", {
            required: true,
            validate: (v) => cv.expirationYear(v).isValid,
          })}
          placeholder="2022"
          onBlur={() => trigger("expYear")}
        />
      </div>
      <div className="flex flex-column" style={{ gap: "0.5ch" }}>
        <label htmlFor="cvv">CVV</label>
        <input
          {...register("cvv", {
            required: true,
            validate: (v) => cv.cvv(v, { minLength: 5 }).isValid,
          })}
          placeholder="999"
          onBlur={() => trigger("cvv")}
        />
      </div>
      <div className="flex flex-column" style={{ gap: "0.5ch" }}>
        <label htmlFor="zip">Zip Code</label>
        <input
          {...register("zip", {
            required: true,
            validate: (v) => cv.postalCode(v, { minLength: 5 }).isValid,
          })}
          placeholder="54321"
          onBlur={() => trigger("zip")}
        />
      </div>
      <button
        type="submit"
        onFocus={() => trigger()}
        disabled={isSubmitting || !isValid}
        className={clsx(
          "mt4 pa2 br2",
          isValid && "dark-green b--dark-green bg-light-green"
        )}>
        Submit
      </button>
    </form>
  );
};
