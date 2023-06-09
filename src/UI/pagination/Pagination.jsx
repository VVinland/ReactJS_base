import { getPagesArray } from "../../utils/pages";

const Pagination = ({ totalPages, page, changePage }) => {
    const pagesArray = getPagesArray(totalPages);
    return (
        <div className='page_wrapper'>
            {pagesArray.map(el => {
                return <span
                    key={el}
                    className={page === el ? 'page page_current' : 'page'}
                    onClick={() => changePage(el)}
                >
                    {el}
                </span>
            })}
        </div>
    );
}

export default Pagination;