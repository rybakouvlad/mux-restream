import React, { useState } from "react";
import styles from "../styles/demo.module.css";
import axios from "axios";
// const Mux = require("@mux/mux-node");

const baseURL = "https://api.mux.com/video";
const idStream = "RMKQjQyts01pP3exrXWXBkKnbjHLdh0200XzSe9WKAkOrA";
const url = `v1/live-streams/${idStream}/simulcast-targets`;
const username = "a2d41ceb-e5e9-4bc7-ade7-e222f7b38dcf";
const password =
  "NrJOHocANNp7hN1XrD4khIW5odvbf3PpzQfb03u2K1sNvf6/oDAYuLcwdCMsld7JBLCc2Xv7VMb";
export const RtmpForm = () => {
  // const { Video } = new Mux(username, password);
  // console.log(Video.LiveStreams.getSimulcastTarget(idStream));
  const [form, setForm] = useState({
    key: "",
    link: "",
  });

  const [simulcastId, setSimulatcastId] = useState(null);
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const sendHendler = async () => {
    try {
      const response = await axios({
        url: url,
        method: "post",
        baseURL: baseURL,
        headers: { "Content-Type": "application/json" },
        data: {
          url: form.link,
          stream_key: form.key,
          passthrough: "Example",
        },
        auth: {
          username: username,
          password: password,
        },
      });
      setSimulatcastId(response.data.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const removeSimulatcast = async () => {
    try {
      const data = await axios.delete(
        `https://api.mux.com/video/v1/live-streams/${idStream}/simulcast-targets/${simulcastId}`,
        {
          headers: { "Content-Type": "application/json" },
          auth: {
            username: username,
            password: password,
          },
        }
      );
      setSimulatcastId(null);
    } catch (error) {}
  };

  return (
    <>
      <input
        placeholder=" simulcast RTMP Link"
        type="text"
        name="link"
        onChange={(e) => changeHandler(e)}
      />
      <input
        placeholder="simulcast RTMP Key"
        type="text"
        name="key"
        onChange={(e) => changeHandler(e)}
      />

      <button className={styles.startButton} onClick={sendHendler}>
        Set simulcast RTMP
      </button>
      <button
        className={styles.startButton}
        style={{ marginTop: "1.5em" }}
        onClick={removeSimulatcast}
      >
        Delete simulcast
      </button>
    </>
  );
};
