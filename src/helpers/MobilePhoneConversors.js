const omitCountryCode = (phone) => {
  if (phone && phone.substr(0, 1) === '0') {
    return phone;
  }
  return `0${phone.substr(3)}`;
};

const includeCountryCode = (phone) => {
  if (phone && phone.substr(0, 1) === '0') {
    return `+44${phone.substr(1)}`;
  }
  return phone;
};

const isValidMobileNumber = (p) => {
  const number = p.replace(/\s/g, '');
  const mobileRegEx = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
  return mobileRegEx.test(number);
};

export { omitCountryCode, includeCountryCode, isValidMobileNumber };
