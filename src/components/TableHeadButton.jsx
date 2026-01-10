import React from 'react';

const TableHeadButton = ({
  text,
  animatedText,
  onHeadClick,
  column,
  animatingCol,
  sortConfig,
}) => {
  const dir = sortConfig.direction;
  const isAnimating = animatingCol === column;

  const aniText = dir === 'asc' ? animatedText.asc : animatedText.desc;
  let sortSpanElem = <span className={`table-head-unsorted-icon ${column} ${isAnimating ? "hide"  :'show'}`} >◀▶</span>;

  //   if(dir === "asc") {
  //   sortSpanElem = <span className="table-head-sorted-icon">▲</span>;
  // } else if (dir === "desc") {
  //   sortSpanElem = <span className="table-head-sorted-icon">▼</span>;
  // }

  
  // NOTE: no animation on mob until sure the text fits
  // holding isAnimating ? aniText : text
  return (
    <th  role='button' className={`sortable-table-head ${isAnimating ? ""  :'clickable'} `} onClick={() => onHeadClick(column)}>
      <p className="table-head-sort-col desktop"> 
        <span className={`text ${isAnimating ? '' : 'show'}`}>{text}</span>
        <span className={`text ${isAnimating ? 'show' : ''}`}>{aniText}</span>
      {sortSpanElem}
      </p>
      <p className="table-head-sort-col mobile">{text}
        <span className="table-head-unsorted-icon mobile" >◀▶</span>
      </p>
    </th>
  );
};

export default TableHeadButton;
