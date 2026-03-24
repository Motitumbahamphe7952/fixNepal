const { GoogleGenAI } =  require("@google/genai");
const puter = require("@heyputer/puter.js")

// The client gets the API key from the environment variable `GEMINI_API_KEY`.

// const generateCategory = async () => {
//   const response = await puter.ai.chat("Explain how AI works in a few words",{
//     model: "gemini-3-flash-preview",
//   });
//   console.log(response.text);
// }
// generateCategory();
 puter.ai.chat(`Why did the chicken cross the road?`).then(puter.print);