import { useState } from 'react';

import { getAgeInYears } from '../helpers';

const TableRow = ({ dog, isSelected, expandable, onRowClick }) => {
  const [openRow, setOpenRow] = useState(isSelected);
  const shortCatText =
    dog.cats === 'unknown' ? '?' : dog.cats === 'no' ? 'N' : 'Y';

  const longCatText =
    dog.cats === 'unknown'
      ? 'Unknown'
      : dog.cats === 'no'
      ? 'No cats'
      : 'Cats OK';

  const shortStatusText =
    dog.status === 'adoption pending'
      ? 'Pending'
      : dog.status === 'adopted' || dog.status === 'injured reserve'
      ? 'Unavail'
      : 'Avail';

  const longStatusText =
    dog.status === 'adoption pending'
      ? 'Adoption pending'
      : dog.status === 'adopted' || dog.status === 'injured reserve'
      ? 'Unavailable'
      : 'Available';

  function handleRowClick(dog) {
    if(expandable) {
      setOpenRow((prev) => !prev);
    }
    onRowClick(dog);
  }

  // TOMORROW: WORK ON THE DRAWER STAYING OPEN WHEN ANOTHER IS CLICKED. 

  const pedigreeText = dog.pedigree === 'yes' ? 'greyhound' : 'sighthound mix';

  return (
    <>
      <tr
        className={`main-row ${expandable ? 'expandable' : ''} ${
          isSelected ? 'selected' : ''
        }`}
        onClick={() => handleRowClick(dog)}
      >
        <td className='dog-name'>
          {dog.name}
          {expandable && (
            <span
              className={`expand-chevron ${openRow ? 'opened' : ''}`}
            ></span>
          )}
        </td>
        <td>{dog.sex[0].toUpperCase()}</td>
        <td>{getAgeInYears(dog.whelped)}yrs</td>
        <td
          className='cat-cell'
          data-short-text={shortCatText}
          data-long-text={longCatText}
        ></td>
        <td
          className='status-cell'
          data-short-text={shortStatusText}
          data-long-text={longStatusText}
        ></td>
      </tr>
      {expandable && (
        <tr className={`detail-row ${openRow ? 'open' : ''}`}>
          <td colSpan={5}>
            <div className='details-container'>
              <div className='detail-row-dog-info'>
                <h3 className='detail-row-intro'>
                  {dog.name} is a {dog.color} {pedigreeText} from {dog.originLocation}.
                </h3>
                <div className='detail-row-bio'>
                  <p>Notes from {dog.name}'s carers:</p>
                    {dog.bio}
                </div>
                <div className='detail-row-media-mobile'>
                  <div className='detail-row-image-container'>
                    <img
                      src={dog.media.imageGallery[0]}
                      alt={`a ${dog.color} greyhound`}
                    />
                  </div>
                  {dog.media.videoUrl &&
                    <a
                      className='detail-row-video-link'
                      href={dog.media.videoUrl}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {dog.name}'s video
                    </a>
                  }
                </div>
                <div className='detail-row-media-desktop'></div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TableRow;
