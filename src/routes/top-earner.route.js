const axios = require("axios").default;
const topEarnerService = require("../services/top-earner.service");

async function topEarners(req, res, headers) {
  res.writeHead(200, headers);
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
    salarySumsByIds = topEarnerService.getSalarySumsOfLastYear(
      transactionsList,
      salarySumsByIds
    ); // Getting employee with the highest sum total of amount within the prior calendar year
    result = topEarnerService.getTopEarnersTransactions(
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
    console.log(
      "-------------------------------------------------------------------"
    );
    res.write(
      `<h2>Response from server says: ${postResponse.data}(${postResponse.status})</h2>`
    );
    res.end("Watch console for detailed flow");
  } catch (error) {
    console.log("Error: ", error?.message);
    console.log(
      "-------------------------------------------------------------------"
    );
    res.write(`<h3>Error: ${error?.message}</h3>`);
    res.end("Watch console for detailed flow");
  }
}

module.exports = topEarners;
