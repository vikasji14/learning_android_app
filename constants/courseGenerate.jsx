import dedent from "dedent";


const generatePromptTopic = (userInput) => {
    if (!userInput) {
        console.error("⚠️ generatePromptTopic called with empty userInput!");
        return "";
    }

    return dedent`
      - As you are a coaching teacher
      - User wants to learn about the topic
      - Create 2 Course With Course Name, Descriptionm, and 3 Chapters
      - Make sure to add chapters with all learning material courses
      - Make sure it is related to the description
      - Add CourseBanner Image from ( '/bannerl.png' , '/banner2.png' , '/banner3.png' )
      - Add CourseImage from ( '/course1.png' , '/course2.png' , '/course3.png' )
      - Explain the chapter content as detailed tutorial
      - Generate 5 Quizz, 10 Flashcard and 5 Questions answers for each chapter
      - Generate 5 Assignment for each chapter
      - Output in JSON FORMAT only
      - 'courses':[
      {
      "courseTitle": '<lntro to Python>',
      "description": '
      "banner_ image": "/bannerl. png" ,
      "chapters": [
      {
      "chapterName": "",
      "content":[
      {
      topic:'<Topic Name in 5 to 10 words ex.(Python Basics)>',
      explain:'<Detailed Ex tarnation tutorial>',
      code :'<Code example of required else null>',
      example:'<Example of required else null>',
      }
      ]
      }
      ],
      quiz:[
      {
      question: "",
      options:[a, b, c, d],
      correctAnswer: "",

      }
      ],
      flashcard:[
      {
      front: "",
      back: "",
      },
      ],
      qa:[
      {
      question: "",
      answer: "",
      },
      ],
  }
  ]
      
      User's Input: ${userInput}
    `;
};


export default generatePromptTopic; ;