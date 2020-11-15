let arc = require("@architect/functions");
let data = require("@begin/data");

exports.handler = arc.http.async(ask);

/**
 * Adds a question to Begin Data or increments the times
 * the question has been asked.
 */
async function ask(req) {
  const { question, key, userId, correlationId } = req.body;
  if (userId && (question || key)) {
    try {
      if (question) {
        console.info(`user ${userId} asked question ${question}`);

        await data.set({
          table: "questions",
          question,
          correlationId,
          userId,
          upvotedBy: [userId],
        });
        return { statusCode: 201 };
      }

      if (key) {
        const votedQuestion = await data.get({ table: "questions", key });
        //this code could be used to prevent users spammin question upvotes
        // if (votedQuestion.upvotedBy.includes(userId)) {
        //   console.info(`user ${userId} already voted for ${key}`);
        //   return { statusCode: 200 };
        // }

        await data.set({
          ...votedQuestion,
          upvotedBy: [...votedQuestion.upvotedBy, userId],
        });
        return { statusCode: 200 };
      }
    } catch (error) {
      console.error(error.message);
      return { statusCode: 500, message: error.message };
    }
  }

  // either question or key are required
  return { statusCode: 400 };
}
