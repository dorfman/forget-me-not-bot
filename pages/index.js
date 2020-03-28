import axios from 'axios';
import {useState} from 'react';

const STEPS = {
  SIGNUP: 0,
  VERIFY: 1,
  SIGNEDUP: 2,
};

function HomePage() {
  const [step, setStep] = useState(STEPS.SIGNUP);
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');
  let onboarding = null;

  switch (step) {
    case STEPS.SIGNUP: {
      onboarding = (
        <form
          method="POST"
          action="/api/signup"
          onSubmit={async (e) => {
            e.preventDefault();
            const res = axios.post('/api/signup', {number});
            setStep(STEPS.VERIFY);
          }}
        >
          <label for="phonenumber">Where can we remind you?</label>
          <input
            placeholder="212-424-4242"
            onChange={(e) => { setNumber(e.target.value); }}
            value={number}
            id="phonenumber"
            type="tel"
            name="phonenumber"
          />
          <button type="submit">Remind me</button>
        </form>
      );
      break;
    }
    case STEPS.VERIFY: {
      onboarding = (
        <form
          method="POST"
          action="/api/verify"
          onSubmit={async (e) => {
            e.preventDefault();
            const res = axios.post('/api/verify', {code});
            setStep(STEPS.SIGNEDUP);
          }}
        >
          <label for="code">Code</label>
          <input
            onChange={(e) => { setCode(e.target.value); }}
            value={code}
            id="code"
            type="text"
            name="code"
          />
          <button type="submit">Remind me</button>
        </form>
      );
      break;
    }
    case STEPS.SIGNEDUP: {
      onboarding = (
        <form method="POST" action="/api/friends">
          <label>Who do you want to remember?</label>
          <textarea />
          <button type="submit">Remember</button>
        </form>
      );
      break;
    }
  }

  return (
    <div>
      <h1>Forget Me Not Bot</h1>
      {onboarding}
    </div>
  );
}

export default HomePage;
