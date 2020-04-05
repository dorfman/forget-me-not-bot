import { useState, useEffect } from 'react';

import Text from '../components/text';
import TypingIndicator from '../components/typing-indicator';

const STEPS = {
  INTRO: 0,
  NUMBER_INPUT: 1,
  CODE_INPUT: 2,
  FRIEND_INPUT: 3,
};

const INTRO_TEXTS = [
  'Hello',
  'Welcome to 🌼forget me not bot🌼',
  'We\'ll send you a text every day reminding you to reach out to one person. At any point respond with "help" to learn more.',
  'What\'s the best number to reach you?',
];

function Home() {
  const [input, setInput] = useState('');
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [texts, setTexts] = useState([]);
  const [step, setStep] = useState(STEPS.INTRO);

  useEffect(() => {
    const sendIntroText = (i) => {
      if (step === STEPS.INTRO) {
        // set loading animation
        setTypingIndicator(true);

        setTimeout(() => {
          console.log(`Sending text #${i}: ${INTRO_TEXTS[i]}...`);
          setTypingIndicator(false);
          setTexts((texts) => [...texts, {from: 'bot', message: INTRO_TEXTS[i]}]);

          if (i + 1 < INTRO_TEXTS.length) {
            // Queue up next text
            setTimeout(() => {
              sendIntroText(i + 1);
            }, 800 + INTRO_TEXTS[i].length * 20);
          } else {
            setStep(STEPS.NUMBER_INPUT);
          }
        }, 800 + INTRO_TEXTS[i].length * 20);
      }
    };

    console.log('use effect');

    sendIntroText(0);
  }, []);

  return (
    <div className="mx-auto max-w-screen-lg py-20">
      <div className="flex flex-col border border-gray-500 rounded-md" style={{height: '600px', boxShadow: '0 18px 50px rgba(0, 0, 0, 0.52)'}}>
        <h1 style={{background: '#f0f0f0'}} className="border-b border-gray-400 text-center rounded-t-md py-4 text-xl">🌼 Forget Me Not Bot 🌼</h1>
        <div className="flex-grow px-8 py-4 overflow-x-scroll">
          {
            texts.map((text, i) => {
              let bottom = true;
              // if there is text below then check for from mismatches
              if (texts[i + 1]) {
                bottom = texts[i + 1].from !== text.from;
              } else if (text.from === 'bot') {
                bottom = !typingIndicator;
              }

              return (
                <Text bottom={bottom} from={text.from} key={i}>{text.message}</Text>
              );
            })
          }
          {
            typingIndicator && <TypingIndicator />
          }
        </div>
        <form
          style={{background: '#f0f0f0'}}
          method="POST"
          action=""
          className="flex border-t border-gray-400 rounded-b-md"
          onSubmit={(e) => {
            e.preventDefault();

            // fire http request

            setTexts((texts) => [...texts, {from: 'human', message: input}]);
            setInput('');
            
            // typing indicator
            setTimeout(() => {
              setTypingIndicator(true);
            }, 500);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full my-3 mx-4 py-1 px-3 border border-gray-400 rounded-full outline-none"
            type="text"
            placeholder="iMessage" />
        </form>
      </div>
    </div>
  );
}

export default Home;
