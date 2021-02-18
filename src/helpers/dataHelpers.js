import { v4 as uuid } from "uuid";

const filterValues = [
  {
    name: "User Email",
    sql: "user_email",
    type: "string",
    formType: "email",
    placeholder: "nice@gmail.com",
  },
  {
    name: "Screen Width",
    sql: "screen_width",
    type: "numeric",
    formType: "number",
    placeholder: "0",
  },
  {
    name: "Screen Height",
    sql: "screen_height",
    type: "numeric",
    formType: "number",
    placeholder: "0",
  },
  {
    name: "# of Visits",
    sql: "visits",
    type: "numeric",
    formType: "number",
    placeholder: "0",
  },
  {
    name: "First Name",
    sql: "user_first_name",
    type: "string",
    formType: "text",
    placeholder: "0",
  },
  {
    name: "Last Name",
    sql: "user_last_name",
    type: "string",
    formType: "text",
    placeholder: "billy bob",
  },
  {
    name: "Page Response Time (ms)",
    sql: "page_response",
    type: "numeric",
    formType: "number",
    placeholder: "0",
  },
  {
    name: "Domain",
    sql: "domain",
    type: "string",
    formType: "url",
    placeholder: "nicedomain.com",
  },
];

const strSelectOptionValues = ["equals", "contains", "starts with", "in list"];

const numSelectOptionValues = [
  "equals",
  "between",
  "greater than",
  "less than",
  "in list",
];

function generateFormInputs(formData) {
  const formInputs = {
    filterName: formData.name,
    operator: formData.options[0],
    firstInput: "",
    secondInput: "",
  };
  return formInputs;
}

const filterWithOptions = filterValues.map((c) => ({
  ...c,
  options: c.type === "string" ? strSelectOptionValues : numSelectOptionValues,
}));

export const filterFormData = filterWithOptions.map((c) => ({
  ...c,
  formInputs: generateFormInputs(c),
}));

export const filterNames = filterFormData.map((c) => c.name);

/**
 *  creates a new form item, corresponding to a newly created criteria filter in the UI
 */
export function generateNewFormItem() {
  const id = uuid();
  const newFormItem = {
    [id]: filterFormData[0],
  };

  return newFormItem;
}

export const tableName = "sessions";
