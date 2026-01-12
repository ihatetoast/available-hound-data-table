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
    sortIcon =
      dir === 'asc' ? (
        <span className='table-head-sorted-icon'>▲</span>
      ) : (
        <span className='table-head-sorted-icon'>▼</span>
      );
  } else {
    sortIcon = <span className='table-head-unsorted-icon'>◀▶</span>;
  }
  let mobileSortIcon;
  if (isSorted) {
    mobileSortIcon =
      dir === 'asc' ? (
        <span className='table-head-sorted-icon mobile'>▲</span>
      ) : (
        <span className='table-head-sorted-icon mobile'>▼</span>
      );
  } else {
    mobileSortIcon = (
      <span className='table-head-unsorted-icon mobile'>◀▶</span>
    );
  }

  return (
    <th
      scope="col"
      role='button'
      className={`sortable-table-head ${isAnimating ? '' : 'clickable'} `}
      onClick={() => onHeadClick(column)}
    >
      <p className='table-head-sort-col desktop'>
        <span className={`text ${isAnimating ? '' : 'show'}`}>{text}</span>
        <span className={`text ${isAnimating ? 'show' : ''}`}>{aniText}</span>
        {sortIcon}
      </p>
      <p className='table-head-sort-col mobile'>
        {text}
        {mobileSortIcon}
      </p>
    </th>
  );
};

export default TableHeadButton;
