const TypingIndicator = () => (
  [
    <style key="styles" jsx>{`
      .typing-indicator {
        background-color: #E6E7ED;
        width: auto;
        border-radius: 50px;
        padding: 16px;
        display: table;
        margin-bottom: 4px;
        position: relative;
        animation: .25s linear forwards flyin;
        transform-origin: bottom left;
      }

      .typing-indicator::before,
      .typing-indicator::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: -2px;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background-color: #E6E7ED;
      }

      .typing-indicator::after {
        height: 10px;
        width: 10px;
        left: -10px;
        bottom: -10px;
      }

      span {
        height: 12px;
        width: 12px;
        float: left;
        margin: 0 1px;
        background-color: #9E9EA1;
        display: block;
        border-radius: 50%;
        opacity: 0.4;
      }

      span:nth-of-type(3) {
        animation: 1s blink infinite 1s;
      }

      span:nth-of-type(2) {
        animation: 1s blink infinite .6666s;
      }

      span:nth-of-type(1) {
        animation: 1s blink infinite .3333s;
      }

      @keyframes blink {
        50% {
          opacity: 1;
        }
      }

      @keyframes flyin {
        0% {
          opacity: 0;
          transform: scale(0);
        }

        90% {
          transform: scale(1.1);
        }

        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}>
    </style>,
    <div key="element" className="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  ]
);

export default TypingIndicator;
