import Axios from "axios";
import { read, create } from "./utils";
 
export default class Hello {
  name: string;
  axios: any;
  pathname: string;
 
  constructor(config: any) {
    this.name = "hello"; // hello と言う名前をつける
    // server の設定ファイル (src/server/configs) の中から agreed 向けの axios を設定
    this.axios = Axios.create(config.agreed.config.axios);
    this.pathname = "hello";
  }
 
  read(req: any, resource: any, params: any = {}, config: any) {
    return read(this.axios, this.name, this.pathname, params, {});
  }
  
  create(req: any, resource: any, params: any, body?: any, config?: any) {
    return create(this.axios, this.name, this.pathname, body, params, {});
  }
}
