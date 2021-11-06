import styles from './GridContainer.css';


export function GridContainer({children, columns}) {
  return (
    <ul
    //   className={styles.GridContainer}
      style={
        {
          // '--col-count': columns,
        maxWidth: "800px",
        display: "inline-grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: "10px",
        padding: "20px"

        }
      }
    >
      {children}
      {/* {console.log("COLUMNS", children)} */}
    </ul>
  );
}