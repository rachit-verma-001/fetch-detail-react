import React from 'react'
import Pagination from "react-bootstrap/Pagination";

export default function PaginationComponent(props) {

    let page = props.page
    let pages = props.pages
    let items = [];
    for (let number = page; number <= (page + 4) && number < pages; number++) {
      items.push(
        <Pagination.Item onClick={() => props.fetchData(number)} key={number} active={number === page}>
          {number}
        </Pagination.Item>
      );
    }

    return (
        <div>
          <Pagination>
            <Pagination.First onClick={() => props.fetchData(1)}/>
            <Pagination.Prev onClick={() => props.fetchData(page - 1)}/>
            {items}
            <Pagination.Ellipsis />
            <Pagination.Item onClick={() => props.fetchData(pages)}>{pages}</Pagination.Item>
            <Pagination.Next onClick={() => props.fetchData(page + 1)}/>
            <Pagination.Last onClick={() => props.fetchData(pages)}/>
          </Pagination>
          <br />
        </div>
    )
}