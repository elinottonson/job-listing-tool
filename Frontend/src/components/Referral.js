import React from 'react';
/* SAMPLE REFERRAL OBJECT
  const referral = {
    firstName: 'referral's first name',
    lastName: 'referral's last name',
    email: 'referral's email',
    referralText: 'why referral is a good fit',
    listingId: integer id of parent listing,
    companyName: 'name of company referral is for',
    authorId: integer employee id of author
  };
*/

const Referral = ({ referralObj }) => {

  const [ referrer, setReferrer ] = React.useState({});

  React.useEffect(() => {
    if(!Object.keys(referrer).length) {
      const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      fetch(`/api/user/${referralObj.authorId}`, options)
        .then(res => {
          if(res.status === 200) {
            return res.json();
          }
        })
        .then(data => {
          setReferrer(data);
        })
        .catch(e => { throw e; });
    }
  }, []);

  return (
    <div className='referral-container'>
      <div className='referral-header'>
        <div className='referral-header-referrer'>
          <p id='referrer-name'>{
            referrer.firstName && referrer.lastName ? 
              referrer.firstName + ' ' + referrer.lastName 
              : 'Error retreiving referrer name'
          }
          </p>
          <p id='referrer-pos'>{
            referrer.positionTitle ? referrer.positionTitle : 'Error retreiving referrer position'
          }
          </p>
        </div>
        <p id='referral-splitter-text'>→</p>
        <div className='referral-name-email'>
          <p id='referree-name'>{referralObj.firstName + ' ' + referralObj.lastName}</p>
          <p id='referree-email'>{referralObj.email}</p>
        </div>
      </div>
      <p className='referral-text'>{referralObj.referralText}</p>
    </div>
  );
};

export default Referral;