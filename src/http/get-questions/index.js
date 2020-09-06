let arc = require("@architect/functions");
let data = require("@begin/data");

exports.handler = arc.http.async(questions);

/**
 * Retrieves the list of active questions from Begin Data and
 * returns a list sorted by times the question has been asked descending
 */
async function questions(req) {
  const { correlationId, debug } = req.queryStringParameters;
  console.info("fetching questions for ", correlationId);
  const table = "questions";
  try {
    let questions = [];

    const pages = data.page({ table, limit: 25 });

    for await (let page of pages) {
      questions = questions.concat(page);
    }

    const sortedQuestions = questions
      .filter((question) => question.correlationId === correlationId)
      .map((question) => ({
        ...question,
        count: question.upvotedBy.length,
      }))
      .sort((a, b) => b.count - a.count);

    if (debug) {
      const response = { questions, req };
      return { body: JSON.stringify(response) };
    } else {
      return { body: JSON.stringify(sortedQuestions) };
    }
  } catch (error) {
    console.error(error.message);
    console.error(error);
    return { statusCode: 500 };
  }
}
