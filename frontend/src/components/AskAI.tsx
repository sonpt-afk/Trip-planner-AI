import { useSquid } from '@squidcloud/react';
import { useState } from 'react';
import './AskAI.css';
import LoadingIndicator from './LoadingIndicator';
const AskAI = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const squid = useSquid();

  const askPressed = async () => {
    if (!text) return;
    setLoading(true);
    const result = await squid.executeFunction('askQuestion', text);
    setResult(result);
    setText('');
    setLoading(false);
  };
  const closeResult = () => {
    setResult('');
  };
  return (
    <div className="container">
      <h3>Ask a Question</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <button onClick={askPressed}>Ask</button>
      )}
      {result && (
        <div className="result-container">
          \<textarea name="" value={result} rows={4}></textarea>
          <button onClick={closeResult} className="close-button"></button>
        </div>
      )}
    </div>
  );
};

export default AskAI;
