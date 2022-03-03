/* eslint-disable no-template-curly-in-string */
export const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
  pattern: {
    mismatch: "Please enter a valid ${label}",
  },
};
/* eslint-enable no-template-curly-in-string */
