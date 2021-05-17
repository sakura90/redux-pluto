import { APIDef, POST, Success201, ResponseDef } from "agreed-typed";

export type PostCommentAPI = APIDef<
  POST,
  ["hello"],
  {}, // header
  {}, // query
  { text: string }, // request body
  {}, // response header
  ResponseDef<Success201, { text: string }>
>;

const api: PostCommentAPI = {
  request: {
    path: ["hello"],
    method: "POST",
    body: {
      text: "{:text}",
    },
    values: {
      text: "hello",
    },
  },
  response: {
    status: 201,
    body: {
      id: "0003",
      text: "{:text}",
    }
  },
};

module.exports = api;