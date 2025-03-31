import dedent from "dedent";

const generatePrompt = (userInput) => {
    if (!userInput) {
        console.error("⚠️ generatePrompt called with empty userInput!");
        return "";
    }

  return dedent`
      - As you are a coaching teacher
      - User wants to learn about the topic
      - Generate 10-15 course titles for study (Short)
      - Make sure it is related to the description
      - Output will be an ARRAY of strings in JSON FORMAT only
      - Do not add any plain text in output.

      User's Input: ${userInput}
    `;
};




export default generatePrompt; ;
