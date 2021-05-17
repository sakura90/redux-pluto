import { APIDef, GET, Success200, ResponseDef, Error404 } from "agreed-typed";
 
export type HelloGetAPI = APIDef<
  GET, // HTTP Method
  ["hello"],
  {}, // request header
  {}, // request query
  undefined, // request body
  {}, // response header
  ResponseDef<Success200, { results: { comments: {id: string, text: string }[] } }>
>;
 
const api: HelloGetAPI = {
  request: {
    path: ["hello"],
    method: "GET",
    body: undefined,
  },
  response: {
    status: 200,
    body: {
      results: {
          comments: [
            {
                id: "0001",
                text: "Hello",
            },
            {
                id: "0002",
                text: "world",
            }
          ]
      },
    }
  },
};
 
module.exports = api;
