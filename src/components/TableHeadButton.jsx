import {
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  ArrowDownAZ,
  ArrowDownZA,
  ArrowDown01,
  ArrowDown10,
} from 'lucide-react';

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
  const isSorted = sortConfig.column === column;

  const aniText = dir === 'asc' ? animatedText.asc : animatedText.desc;

  let sortIcon;
  if (isAnimating) {
    sortIcon = null;
  } else if (isSorted) {
    sortIcon = dir === 'asc' ? <ChevronUp /> : <ChevronDown />;
  } else {
    sortIcon = <ChevronsUpDown />;
  }

  let mobileSortIcon;
  if (isSorted) {
    mobileSortIcon =
      dir === 'asc' ? (
        column === 'name' ? (
          <ArrowDownAZ />
        ) : (
          <ArrowDown01 />
        )
      ) : column === 'name' ? (
        <ArrowDownZA />
      ) : (
        <ArrowDown10 />
      );
  } else {
    mobileSortIcon = <ChevronsUpDown />;
  }
  return (
    <th scope='col' role='button' onClick={() => onHeadClick(column)}>
      <div className='table-head-sort-col desktop'>
        <div className='span-cont'>
          <span className={`text ${isAnimating ? '' : 'show'}`}>{text}</span>
          <span className={`text ${isAnimating ? 'show' : ''}`}>{aniText}</span>
        </div>
<span className="sort-arrows">{sortIcon}</span>
        
      </div>
      <div className='table-head-sort-col mobile'>
        {text}
        <span
          className={`table-head-${
            isSorted ? 'sorted' : 'unsorted'
          }-icon mobile`}
        >
          {mobileSortIcon}
        </span>
      </div>
    </th>
  );
};

export default TableHeadButton;
