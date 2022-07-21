import React, { useState } from "react";

import useTable from "./useTable";
import styles from "./Table.module.css";
import TableFooter from "./tableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>User Id</th>
            <th className={styles.tableHeader}>Id</th>
            <th className={styles.tableHeader}>Title</th>
            <th className={styles.tableHeader}>Status</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el.id}>
              <td className={styles.tableCell}>{el.userId}</td>
              <td className={styles.tableCell}>{el.id}</td>
              <td className={styles.tableCell}>{el.title}</td>
              <td className={el.completed ? styles.valid : styles.invalid}>{el.completed ? "Valid" : "InValid"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;