import axios from 'axios';
import { useState } from 'react';

import { Label } from '../components/label';
import { Input } from '../components/input';
import { Button } from '../components/button';

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
            const res = axios.post('/api/signup', { number });
            setStep(STEPS.VERIFY);
          }}
        >
          <Label htmlFor="phonenumber">Where can we remind you?</Label>
          <Input
            placeholder="212-424-4242"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            value={number}
            id="phonenumber"
            type="tel"
            name="phonenumber"
          />
          <Button type="submit">Remind me</Button>
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
            const res = axios.post('/api/verify', { code });
            setStep(STEPS.SIGNEDUP);
          }}
        >
          <Label htmlFor="code">Please type in the 4-digit code we sent you.</Label>
          <Input
            onChange={(e) => {
              setCode(e.target.value);
            }}
            value={code}
            id="code"
            type="text"
            name="code"
          />
          <Button type="submit">Verify</Button>
        </form>
      );
      break;
    }
    case STEPS.SIGNEDUP: {
      onboarding = (
        <form method="POST" action="/api/friends">
          <Label htmlFor="friends">Who do you want to remember?</Label>
          <textarea
            name="friends"
            placeholder={'Jane Doe\nYefim Vedernikoff'}
            className="block w-1/2 border border-black mb-4"
          />
          <Button type="submit">Remember</Button>
        </form>
      );
      break;
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-8">
      <header className="flex justify-between items-center">
        <h1 className="text-5xl">Forget Me Not Bot</h1>
        <nav>
          <span className="mr-4 text-xl">About</span>
          <span className="text-xl">Log in</span>
        </nav>
      </header>
      <section>
        <h2 className="text-center text-3xl py-40">Gentle reminders to reach out to your friends.</h2>
      </section>
      <section>
        {onboarding}
      </section>
    </main>
  );
}

export default HomePage;
