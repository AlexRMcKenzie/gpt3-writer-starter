import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
I want to learn about something, but I don't have a good background knowledge. Could you give me suggestions on core topics to learn, so I can understand the fundamentals of the subject. Please order the topics in terms of which is most important to understand first.

The subject I want to learn about is:
`;
const generateAction = async (req, res) => {
  //Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  // // Prompt #2
  // const secondPrompt =
  // `
  // Take the first topic from the list above and write a short primer on the topic to give a good base level of understanding on that particular subject:
  // `

  // const secondPromptCompletion = await openai.createCompletion({
  //   model: 'text-davinci-003',
  //   prompt: `${secondPrompt}`,
  //   temperature: 0.7,
  //   max_tokens: 500,
  // });

  // const secondPromptOutput = secondPromptCompletion.data.choices.pop();


  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
