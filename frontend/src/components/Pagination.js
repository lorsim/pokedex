<<<<<<< HEAD
import React from 'react'

=======
>>>>>>> 5dfd729b8f0cd39177510ca03655373b9d727a67
export default function Pagination({gotoNextPage, gotoPrevPage}) {
  return (
    <div>
      {gotoPrevPage && <button className="load-more" onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button className="load-more" onClick={gotoNextPage}>Next</button>}
    </div>
  )
}
