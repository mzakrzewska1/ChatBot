import { Configuration, OpenAIApi } from 'openai'
import { process } from './env'

import axios from 'axios'


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)
// console.log(openai)

const conversationArr = [
        {
            role: 'system',
            content: 'You are a useful assistant.'
        }
    ]

async function fetchReply() {
    // const response = await openai.createChatCompletion({
    //     model: 'gpt-3.5-turbo',
    //     messages: conversationArr,
    // })
    // console.log(response)
    const apiKey = process.env.OPENAI_API_KEY;
    const config = {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    };

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: conversationArr,
            },
            config
        );
        console.log(response.data);
    } catch (error) {
  if (error.response && error.response.status === 429) {
    const resetTime = error.response.headers['x-ratelimit-reset'];
    const remainingRequests = error.response.headers['x-ratelimit-remaining'];
    const totalRequests = error.response.headers['x-ratelimit-limit'];

    console.log(`Rate limit exceeded.`);
    console.log(`Reset time: ${new Date(resetTime * 1000)}`);
    console.log(`Remaining requests: ${remainingRequests}`);
    console.log(`Total requests allowed: ${totalRequests}`);
  } else {
    console.error(error);
  }
}
}

const chatbotConversation = document.getElementById('chatbot-conversation')


document.addEventListener('submit', (e) => {
    e.preventDefault()

    const userInput = document.getElementById('user-input')

    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-human')

    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value

    conversationArr.push({
        role: 'user',
        content: userInput.value
    })    

    userInput.value = ''

    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
    console.log(conversationArr)

    fetchReply()
})    














// 
// const chatbotConversation = document.getElementById('chatbot-conversation')
// 
// document.addEventListener('submit', (e) => {
    // e.preventDefault()
    // const userInput = document.getElementById('user-input')
    // const newSpeechBubble = document.createElement('div')
    // newSpeechBubble.classList.add('speech', 'speech-human')
    // chatbotConversation.appendChild(newSpeechBubble)
    // newSpeechBubble.textContent = userInput.value
    // userInput.value = ''
    // chatbotConversation.scrollTop = chatbotConversation.scrollHeight
// })
// 
// function renderTypewriterText(text) {
    // const newSpeechBubble = document.createElement('div')
    // newSpeechBubble.classList.add('speech', 'speech-ai', 'blinking-cursor')
    // chatbotConversation.appendChild(newSpeechBubble)
    // let i = 0
    // const interval = setInterval(() => {
        // newSpeechBubble.textContent += text.slice(i-1, i)
        // if (text.length === i) {
            // clearInterval(interval)
            // newSpeechBubble.classList.remove('blinking-cursor')
        // }
        // i++
        // chatbotConversation.scrollTop = chatbotConversation.scrollHeight
    // }, 50)
// }