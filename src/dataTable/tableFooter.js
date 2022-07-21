import React, { useEffect } from "react";
import styles from "./Table.module.css";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <div className={styles.tableFooter}>
      <ul>
        {range.map((el, index) => (
          <li class="page-item">
            <button
              key={index}
              className={`${styles.button} ${
                page === el ? styles.activeButton : styles.inactiveButton
              }`}
              onClick={() => setPage(el)}
            >
              {el}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableFooter;
