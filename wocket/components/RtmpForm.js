import React, { useState } from "react";
import styles from "../styles/demo.module.css";

export const RtmpForm = () => {
  const [form, setForm] = useState({
    key: "",
    link: "",
  });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const sendHendler = () => {
    console.log(form);
  };
  return (
    <>
      <input
        placeholder="RTMP linkk"
        type="text"
        name="link"
        onChange={(e) => changeHandler(e)}
      />
      <input
        placeholder="RTMP Key"
        type="text"
        name="key"
        onChange={(e) => changeHandler(e)}
      />

      <button className={styles.startButton} onClick={sendHendler}>
        Set server
      </button>
    </>
  );
};
