require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();

app.use(cors());
app.use(express.json());
const apikey = process.env.APIKEY;

app.get('/message', async (req, res) => {
  const prompt = req.query.prompt;
  console.log('User -> ' + prompt);

  const configuration = new Configuration({
    apiKey: apikey,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  const response = completion.data.choices[0].message;
  // console.log(response);
  console.log('Bot -> ' + response.content);

  res.send(response);
});

const port = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`Server is running on port ${port}.`);
});
