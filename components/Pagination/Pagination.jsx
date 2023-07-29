// import Pagination from 'react-bootstrap/Pagination';
import ReactPaginate from "react-paginate";
export default function PaginationComponent({ getPage }) {
    const handlePageClick = (data) => {
        getPage(data.selected + 1);
    };
    const pageCount = 500;
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={handlePageClick}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="<<"
            containerClassName={"pagination justify-content-center p-3"}
            pageClassName={"page item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page item"}
            nextClassName={"page item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            breakClassName={"page item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
        />
    );
}
