import dedent from "dedent";


const generatePromptTopic = (userInput) => {
    if (!userInput) {
        console.error("⚠️ generatePromptTopic called with empty userInput!");
        return "";
    }

    return dedent`
    - As you are a coaching teacher
    - Generate 20 Quizz, 10 Flashcard and 10 Questions answers for each chapter
    -Add CourseBanner Image from ( '/bannerl.png' , '/banner2.png' , '/banner3.png' )
    -Add CourseImage from ( '/course1.png' , '/course2.png' , '/course3.png' )
    - Explain the chapter content as detailed tutorial
      {
        "userInput": "${userInput}",
        "courses": [
          {
            "courseTitle": "<Title>",
            "description": "<Description>",
            "bannerImage": "/banner1.png",
            "chapters": [
              {
                "chapterName": "<Name>",
                "content": [
                  {
                    "topic": "<Topic>",
                    "explain": "<Detailed Explanation>",
                    "code": "<Code Example>",
                    "example": "<Example>"
                  }
                ]
              }
            ],
            "quiz": [
              {
                "question": "<Question>",
                "options": ["A", "B", "C", "D"],
                "correctAnswer": "<Correct Answer>"
              }
            ],
            "flashcard": [
              {
                "front": "<Front>",
                "back": "<Back>"
              }
            ],
            "qa": [
              {
                "question": "<Question>",
                "answer": "<Answer>"
              }
            ]
          }
        ]
      }
    `;
    

}
export default generatePromptTopic; ;