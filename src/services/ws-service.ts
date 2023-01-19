import PubSub from "pubsub-js";

interface WSServiceProps {
  url: string;
  topic: string;
}

export class WSService<T> {
  protected topic: string;
  protected url: string;
  protected pingClock:number;

  constructor(props: WSServiceProps) {
    const { url, topic } = props;
    this.url = url;
    this.topic = topic;
    this.pingClock = 0;
  }

  public connect() {
    const ws = new WebSocket(this.url);
    ws.onopen = () => {
      // connection opened
      console.log("WebSocket Client Connected");
      window.clearInterval(this.pingClock);
      this.pingClock = window.setInterval(() => {
        ws.send(JSON.stringify({ op: "ping" }));
      }, 20000);

      ws.send(JSON.stringify({ op: "subscribe", args: [this.topic] }));
    };

    ws.onmessage = (e) => {
      const { topic, data } = JSON.parse(e.data);

      if (topic !== this.topic) {
        return;
      }

      PubSub.publish("ws-data", data);
    };

    ws.onerror = (e) => {
      // an error occurred
      console.error("onerror");
      console.error(e);
      ws.close();
    };

    ws.onclose = (e) => {
      // connection closed
      console.log("onclose");
      console.error(e.code, e.reason);
      const self = this;
      setTimeout(function () {
        console.log("re-subscribing !");
        self.connect();
      }, 1000);
    };
  }

  public close() {}
}
