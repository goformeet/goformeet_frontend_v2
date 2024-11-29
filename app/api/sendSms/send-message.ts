import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { mobileNumber } = req.body;
    const url = "https://enterprise.smsgupshup.com/GatewayAPI/rest";
    const queryParams = {
      method: "SendMessage",
      send_to: mobileNumber,
      msg: `Hi,\nThank you for your interest in creating an account on Goformeet. Please download our app: 123\nGoformeet`,
      msg_type: "TEXT",
      userid: "2000236219",
      auth_scheme: "plain",
      password: "JWLEzyyqC",
      v: "1.1",
      format: "text",
    };

    try {
      const response = await axios.get(url, { params: queryParams });
      res.status(200).json(response.data);
    } catch (error: Error | any) {
      res
        .status(error.response?.status || 500)
        .json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
