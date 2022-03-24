import { useEffect, useState } from "react";

interface IPaginateProps {
  callback(i: number): void;
  recordsPerpage: number;
  totalRecords: number;
  currentPage: number;
}

export const Pagination = ({
  callback,
  recordsPerpage,
  totalRecords,
  currentPage,
}: IPaginateProps) => {
  const [iter, setIter] = useState([]);
  const breakpoint = 3;
  useEffect(() => {
    const tr = Math.ceil(totalRecords / recordsPerpage);
    if (tr > 0) setIter(Array(tr).fill(0));
    else setIter([]);
  }, [totalRecords]);

  return (
    <div className="col-md-12">
      <div className="pagination ml-auto" style={{ float: "right" }}>
        <a
          href="#"
          onClick={() => {
            if (currentPage != 1) {
              callback(currentPage - 1);
            }
          }}
          style={
            currentPage == 1 ? { color: "gray", pointerEvents: "none" } : null
          }
        >
          « Prev
        </a>
        {iter.map((_, index: number) => {
          if (totalRecords / recordsPerpage > 8) {
            if (index < breakpoint) {
              return (
                <a
                  key={index}
                  href="#"
                  onClick={() => {
                    callback(index + 1);
                  }}
                  className={currentPage == index + 1 ? "active" : ""}
                >
                  {index + 1}
                </a>
              );
            }
            if (index == breakpoint) {
              return (
                <a
                  key={index}
                  href="#"
                  style={{ color: "gray", pointerEvents: "none" }}
                >
                  ...
                </a>
              );
            }
            if (index + breakpoint >= totalRecords / recordsPerpage) {
              return (
                <a
                  key={index}
                  href="#"
                  onClick={() => {
                    callback(index + 1);
                  }}
                  className={currentPage == index + 1 ? "active" : ""}
                >
                  {index + 1}
                </a>
              );
            }
            return null;
          }
          return (
            <a
              key={index}
              href="#"
              onClick={() => {
                callback(index + 1);
              }}
              className={currentPage == index + 1 ? "active" : ""}
            >
              {index + 1}
            </a>
          );
        })}
        <a
          href="#"
          onClick={() => {
            if (currentPage < Math.ceil(totalRecords / recordsPerpage)) {
              callback(currentPage + 1);
            }
          }}
          style={
            currentPage >= Math.ceil(totalRecords / recordsPerpage)
              ? { color: "gray", pointerEvents: "none" }
              : null
          }
        >
          Next »
        </a>
      </div>
    </div>
  );
};
