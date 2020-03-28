import axios from 'axios';
import {useState} from 'react';

function HomePage() {
  const [number, setNumber] = useState('');

  return (
    <div>
      <h1>hello</h1>
      <form
        method="POST"
        action="/api/signup"
        onSubmit={(e) => {
          e.preventDefault();
          axios.post('/api/signup', {number});
        }}
      >
        <label for="number">Phone number</label>
        <input
          onChange={(e) => { setNumber(e.target.value); }}
          value={number}
          id="number"
          type="tel"
          name="number"
        />
        <button type="submit">Remind me</button>
      </form>
    </div>
  );
}

export default HomePage;
