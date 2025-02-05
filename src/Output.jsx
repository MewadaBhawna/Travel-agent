import React from "react";

const Output = () => {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  return <div>Output</div>;
};

export default Output;
