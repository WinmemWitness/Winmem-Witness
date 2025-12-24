import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  scenarios: {
    reads: {
      executor: "ramping-vus",
      startVUs: 5,
      stages: [
        { duration: "30s", target: 20 },
        { duration: "1m", target: 50 },
        { duration: "30s", target: 10 }
      ],
      gracefulRampDown: "10s"
    }
  }
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:8080";
const TOKEN = __ENV.TOKEN || "";

export default function () {
  const headers = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};
  const res = http.get(`${BASE_URL}/projects`, { headers });
  check(res, { "status is ok": (r) => r.status === 200 || r.status === 401 });
  sleep(0.25);
}
