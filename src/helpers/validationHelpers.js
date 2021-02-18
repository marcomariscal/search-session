export function validate(formData) {
  let isValid = false;

  for (const data in formData) {
    const item = formData[data];
    const {
      formInputs: { firstInput, secondInput, operator },
    } = item;

    if (operator === "between") {
      isValid =
        isValidItem(firstInput, item.type, item.sql, operator) &&
        isValidItem(secondInput, item.type, item.sql, operator);
    } else {
      isValid = isValidItem(firstInput, item.type, item.sql, operator);
    }

    if (!isValid) return false;
  }

  return isValid;
}

function isValidItem(value, itemType, itemName, operator) {
  // checking for empty
  if (value === "") {
    console.log(value, "in here");
    return false;
  }

  // only processing strings
  if (typeof value !== "string") return false;

  if (itemType === "numeric") {
    if (isNaN(value) || isNaN(parseFloat(value))) return false;
  }

  // checking for valid email
  if (itemName === "user_email" && operator === "equals") {
    return validateEmail(value);
  }

  // checking for valid domain
  if (itemName === "domain" && operator === "equals") {
    return validateDomain(value);
  }

  return true;
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateDomain(domain) {
  const re = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  return re.test(String(domain).toLowerCase());
}
