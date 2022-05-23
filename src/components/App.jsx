import OpenAI from "openai-api";
import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

import Response from "./Response";
import Header from "./Header";

require("dotenv").config();
const openai = new OpenAI(process.env.OPENAI_API);

export default function App() {
  const [output, setOutput] = useState([]);
  const inputRef = useRef();
  let input = "";
  function handleSubmit(submitEvent) {
    // prevent reloading
    submitEvent.preventDefault();
    input = inputRef.current.value;
    (async () => {
      const res = await openai.complete({
        engine: "davinci",
        prompt: input,
        maxTokens: 50,
        temperature: 0.7,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1
      });

      setOutput((prevOutputs) => {
        return [
          ...prevOutputs,
          { response: res.data.choices[0].text, prompt: input }
        ];
      });
    })();
  }

  return (
    <>
      <Header />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            placeholder="What would you like to tell davinci?"
            ref={inputRef}
          />
          <Button type="submit">Let's try</Button>
        </Form.Group>
      </Form>
      {output.map((responseItem, index) => {
        return <Response key={index} id={index} content={responseItem} />;
      })}
    </>
  );
}
