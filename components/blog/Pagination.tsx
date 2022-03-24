export default function Pagination() {
  return (
    <nav aria-label="buttom-blog">
      <ul className="pagination float-right">
        <li className="page-item disabled">
          <a className="page-link" href="#">
            Previous
          </a>
        </li>
        {/* <li className="page-item"><a className="page-link active" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li> */}
        <li className="page-item disabled">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
