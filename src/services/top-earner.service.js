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

module.exports = { getSalarySumsOfLastYear, getTopEarnersTransactions };
