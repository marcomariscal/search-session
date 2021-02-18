/**
 * takes form data as an input, whihc is an object of criteria items
 * returns the sql string representation of the data
 */
export function generateSQL(data, table) {
  const operatorToSqlArr = [
    ["equals", "="],
    ["between", "BETWEEN"],
    ["greater than", ">"],
    ["less than", "<"],
    ["in list", "IN"],
    ["contains", "LIKE"],
    ["starts with", "LIKE"],
  ];

  const operatorToSqlMap = new Map(operatorToSqlArr);

  let baseQuery = `SELECT * FROM ${table}`;
  let whereExpressions = [];

  for (const item in data) {
    const criteria = data[item];
    const operator = criteria.formInputs.operator;
    const operatorStr = operatorToSqlMap.get(operator);
    const firstInputValue = criteria.formInputs.firstInput;
    const secondInputValue = criteria.formInputs.secondInput;

    let firstInputStr = "";

    // using '%' to align with the operator in sql:w
    if (operator === "contains") {
      firstInputStr = `%${firstInputValue}%`;
    } else if (operator === "starts with") {
      firstInputStr = `${firstInputValue}%`;
    } else if (operator === "in list" && criteria.type === "string") {
      const listStr = firstInputValue
        .split(",")
        .map((v) => `'${v.trim()}'`)
        .join(", ");
      firstInputStr = `(${listStr})`;
    } else if (operator === "in list" && criteria.type !== "string") {
      const listNumStr = firstInputValue
        .split(",")
        .map((v) => `${v.trim()}`)
        .join(", ");
      firstInputStr = `(${listNumStr})`;
    } else {
      firstInputStr = firstInputValue;
    }

    // wrapping with single quotes to align with sql syntax if the input is a string
    firstInputStr =
      criteria.type === "string" && operator !== "in list"
        ? `'${firstInputStr}'`
        : firstInputStr;

    const valuesStr = secondInputValue
      ? `${firstInputStr} AND ${secondInputValue}`
      : `${firstInputStr}`;

    whereExpressions.push(`${criteria.sql} ${operatorStr} ${valuesStr}`);
  }

  if (whereExpressions.length > 0) {
    baseQuery += ` WHERE `;
  }

  const finalQuery = `${baseQuery}${whereExpressions.join(" AND ")};`;
  return finalQuery;
}
