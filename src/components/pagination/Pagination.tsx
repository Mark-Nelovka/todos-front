import React, { useState } from 'react'
import { useAppDispatch } from 'redux/hook'

export default function Pagination({changePageFunc}: {changePageFunc: (page: number) => void}):JSX.Element {
    const [activePage, setActivePage] = useState(1);
    const dispatch = useAppDispatch();

    const changePage = (e: React.MouseEvent) => {
      const { textContent } = e.target as HTMLLIElement;
      // console.log(textContent);
      if(textContent) {
        changePageFunc(+textContent);
      }
        // setActivePage((prevState) => prevState + 1);
    }

  return (
    <div className='pagination__container'>
        <ul onClick={changePage} className='pagination__list'>
            <li className={activePage === 1 ? "active" : ""}>1</li>
            <li className={activePage === 2 ? "active" : ""}>2</li>
            <li className={activePage === 3 ? "active" : ""}>3</li>
        </ul>
    </div>
  )
}
