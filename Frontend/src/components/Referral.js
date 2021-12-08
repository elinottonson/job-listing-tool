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
  return (
    <div>
      <p>{referralObj.referralText}</p>
    </div>
  );
};

export default Referral;