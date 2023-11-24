import React from "react";
import styles from "./styles.module.css";
import logoIcon from "/icons/shop-svgrepo-com.svg";

export default function Logo({}) {
  return (
    <div className={styles.logo}>
      <img src={logoIcon} alt="" />
      Tasker
    </div>
  );
}
