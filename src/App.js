import data from "./frontend-assignment.json"
import './App.css';
import { useEffect, useRef, useState } from "react";

function App() {

  let rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.focus();
    }
  }, [currentPage]);


  const getPageNumbers = () => {
    const pageNumbers = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pageNumbers.push(i);
      } else if (
        (i === currentPage - delta - 1 || i === currentPage + delta + 1) &&
        !pageNumbers.includes("...")
      ) {
        pageNumbers.push("...");
      }
    }

    return pageNumbers;
  };

  
  const handlePageChange = (page) => {
    if (typeof page === "number" && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  };

  const renderEmptyRows = () => {
    const emptyRows = rowsPerPage - getPaginatedData().length;
    return Array.from({ length: emptyRows }, (_, index) => (
      <tr key={`empty-row-${index}`}>
        <td colSpan={3}>&nbsp;</td>
      </tr>
    ));
  };


  return (
    <div className="app">

      <h1 className="table-title">Pagination Assignement Table</h1>

      <table ref={tableRef} tabIndex={-1} aria-label="Paginated Table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Percentage funded</th>
            <th scope="col">Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedData().map((item) => (
            <tr key={item["s.no"]}>
              <td headers="s-no">{item["s.no"] + 1}</td>
              <td headers="percentage-funded">{item["percentage.funded"]}</td>
              <td headers="amount-pledged">{item["amt.pledged"]}</td>
            </tr>
          ))}
          {renderEmptyRows()}
        </tbody>
      </table>



      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          tabIndex={0}
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="dots">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? "active" : ""}
              aria-current={currentPage === index + 1 ? "page" : undefined}
              tabIndex={0}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          tabIndex={0}
        >
          Next
        </button>
      </div>




    </div>
  );
}

export default App;
