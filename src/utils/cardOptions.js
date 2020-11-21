import { MASTERCARD_LOGO, VISA_LOGO } from "./constants";

export const cardOptions = [
  {
    value: "4242424242424242", //Good Visa
    label: "4242 4242 4242 4242", //Good Visa
    logo: VISA_LOGO,
  },
  {
    value: "5555555555554444", //Good Mastercard
    label: "5555 5555 5555 4444", //Good Mastercard
    logo: MASTERCARD_LOGO,
  },
  {
    value: "2223003122003222", //Good Mastercard 2-series
    label: "2223 0031 2200 3222", //Good Mastercard 2-series
    logo: MASTERCARD_LOGO,
  },
  {
    value: "4000056655665556", //Good Visa Debit
    label: "4000 0566 5566 5556", //Good Visa Debit
    logo: VISA_LOGO,
  },
  {
    value: "5200828282828210", //Good Mastercard debit
    label: "5200 8282 8282 8210", //Good Mastercard debit
    logo: MASTERCARD_LOGO,
  },
  {
    value: "5105105105105100", //Good Mastercard prepaid
    label: "5105 1051 0510 5100", //Good Mastercard prepaid
    logo: MASTERCARD_LOGO,
  },
];
