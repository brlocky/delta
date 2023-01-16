import PubSub from "pubsub-js";


export interface IWSService {
  close(): void;
}

interface WSServiceProps {
  url: string;
  topic: string;
}

export class WSService<T> {
  protected ws: WebSocket;

  constructor(props: WSServiceProps) {
    const { url } = props;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      // connection opened
      console.log("WebSocket Client Connected");
      setInterval(() => {
        this.ws.send(JSON.stringify({ op: "ping" }));
      }, 30000);
      this.ws.send(JSON.stringify({ op: "ping" }));
      this.ws.send(JSON.stringify({ op: "subscribe", args: [props.topic] }));
    };

    this.ws.onmessage = (e) => {
      const { topic, data } = JSON.parse(e.data);

      if (topic !== props.topic) {
        return;
      }

      data.map((data: T) => PubSub.publish('ws-data', data));
    };

    this.ws.onerror = (e) => {
      // an error occurred
      console.error(e);
    };

    this.ws.onclose = (e) => {
      // connection closed
      console.error(e.code, e.reason);
    };
  }

  public close() {}
}
