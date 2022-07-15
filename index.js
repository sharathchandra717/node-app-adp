const axios = require("axios").default;

const getSalarySumsOfLastYear = (
  transactionsList = [],
  salarySumsByIds = {}
) => {
  const previousYear = new Date().getFullYear() - 1;
  for (let i = 0; i < transactionsList.length; i++) {
    if (
      new Date(transactionsList[i].timeStamp).getFullYear() === previousYear
    ) {
      salarySumsByIds[transactionsList[i]?.employee?.id] =
        (salarySumsByIds[transactionsList[i]?.employee?.id]
          ? salarySumsByIds[transactionsList[i]?.employee?.id]
          : 0) + transactionsList[i].amount;
    }
  }
  return salarySumsByIds;
};

const getTopEarnersTransactions = (
  transactionsList = [],
  salarySumsByIds = {},
  result = []
) => {
  const maxSalaryId = Object.keys(salarySumsByIds).reduce((a, b) =>
    salarySumsByIds[a] > salarySumsByIds[b] ? a : b
  );
  for (let i = 0; i < transactionsList.length; i++) {
    if (
      transactionsList[i]?.employee?.id === maxSalaryId &&
      transactionsList[i]?.type === "alpha"
    ) {
      result.push(transactionsList[i]?.transactionID);
    }
  }
  return result;
};

(async function main() {
  try {
    let salarySumsByIds = {};
    let result = [];
    console.log("GET request to 'get-tasks'");
    const getResponse = await axios.get(
      "https://interview.adpeai.com/api/v2/get-task"
    );
    console.log(`GET request to 'get-tasks': Success(${getResponse.status})`);
    console.log("Processing the response...");
    const transactionData = getResponse.data;
    const transactionsList = transactionData.transactions;
    salarySumsByIds = getSalarySumsOfLastYear(
      transactionsList,
      salarySumsByIds
    ); // Getting employee with the highest sum total of amount within the prior calendar year
    result = getTopEarnersTransactions(
      transactionsList,
      salarySumsByIds,
      result
    ); // Getting last year's top earner's transactionIDs where the type is alpha.
    console.log("POST request to 'submit-task' with processed data");
    const postResponse = await axios.post(
      "https://interview.adpeai.com/api/v2/submit-task",
      {
        id: transactionData.id,
        result,
      }
    );
    console.log(
      `POST request to 'submit-task' with processed data: Success(${postResponse.status})`
    );
    console.log("Response from server says:", postResponse.data);
  } catch (error) {
    console.log("Error: ", error?.message);
  }
})();
