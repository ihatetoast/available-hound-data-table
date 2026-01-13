import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getAgeInYears } from '../helpers';

const TableRow = ({ dog, isSelected, expandable, isExpanded, onRowClick }) => {
  const [isClosing, setIsClosing] = useState(false);
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
      : dog.status === 'adopted' ||
        dog.status === 'injured reserve' ||
        dog.status === 'training camp'
      ? 'Unavail'
      : 'Avail';

  const longStatusText =
    dog.status === 'adoption pending'
      ? 'Adoption pending'
      : dog.status === 'adopted' ||
        dog.status === 'injured reserve' ||
        dog.status === 'training camp'
      ? 'Unavailable'
      : 'Available';

  const pedigreeText = dog.pedigree === 'yes' ? 'greyhound' : 'sighthound mix';

  function handleRowClick(dog) {
    if (expandable && isExpanded) {
      // Start closing animation
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        onRowClick(dog);
      }, 400); // if this changes, change .detail-row.close/open to match
    } else {
      onRowClick(dog);
    }
  }

  // a11y see onkeydown

  return (
    <>
      <tr
        role='button'
        tabIndex={0}
        className={`main-row clickable ${expandable ? 'expandable' : ''} ${
          isSelected || isExpanded ? 'selected' : ''
        }`}
        onClick={() => handleRowClick(dog)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevent page scroll on Space
            handleRowClick(dog);
          }
        }}
      >
        <td className='dog-name'>
          {dog.name}
          {expandable && (
            <span className={`expand-chevron ${isExpanded ? 'opened' : ''} `}>
              {' '}
              <ChevronDown className='expand-chevron-icon' />
            </span>
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
        <tr
          className={`detail-row ${isExpanded ? 'open' : ''} ${
            isClosing ? 'close' : ''
          }`}
        >
          <td colSpan={5}>
            <div className='details-container'>
              <div className='detail-row-dog-info'>
                <h3 className='detail-row-intro'>
                  {dog.name} is a {dog.color} {pedigreeText} from{' '}
                  {dog.originLocation}.
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
                  {dog.media.videoUrl && (
                    <a
                      className='detail-row-video-link'
                      href={dog.media.videoUrl}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {dog.name}'s video
                    </a>
                  )}
                </div>
                {(dog.sire || dog.dam) && (
                  <div className='detail-pedigree'>
                    {dog.sire && (
                      <span className='pedigree male'>Sire: {dog.sire}</span>
                    )}
                    {dog.dam && (
                      <span className='pedigree female'>Dam: {dog.dam}</span>
                    )}
                  </div>
                )}
                <div className='detail-row-media-desktop'>
                  <div className='detail-row-image-row'>
                    {dog.media.imageGallery.map((image, idx) => (
                      <div key={idx} className='detail-row-image-container'>
                        <img src={image} alt={`a ${dog.color} greyhound`} />
                      </div>
                    ))}
                  </div>
                  {dog.media.videoUrl && (
                    <a
                      className='detail-row-video-link'
                      href={dog.media.videoUrl}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {dog.name}'s video
                    </a>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TableRow;
