export const gridSpacing = 3;
export const drawerWidth = 280;
export const API_DOMAIN = 'https://api.covid19india.org';
export const DATA_API_ROOT = `${API_DOMAIN}/v4/min`;
export const VACCINE_API = 'https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports';
export const VACCINE_SETU_API = 'https://cdn-api.co-vin.in/api/v2';

export const getDateData = (date) => {
  const newDate = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
  return newDate;
}

export const timeDifference = (current, previous) => {
    var msPerMinute = 60;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

export const numDifferentiation = (value) => {
  if (isNaN(value)) {
    return null;
  }
  var val = Math.abs(value)
  if (val >= 10000000) {
    val = (val / 10000000).toFixed(2) + ' Cr';
  } else if (val >= 100000) {
    val = (val / 100000).toFixed(2) + ' L';
  }
  else {
    val = val.toLocaleString('en-IN');
  }

  if(value>0) { return val; }
  else { return '-' + val; }

};

export const checkNumber = (number) => {
  const num = parseInt(number)
  
  if(isNaN(num)) return null;
  if(num>0) return "+ " + number;
  else return "- " + number;
};

export const STATE_NAMES = {
  AN: 'Andaman and Nicobar Islands',
  AP: 'Andhra Pradesh',
  AR: 'Arunachal Pradesh',
  AS: 'Assam',
  BR: 'Bihar',
  CH: 'Chandigarh',
  CT: 'Chhattisgarh',
  DL: 'Delhi',
  DN: 'Dadra and Nagar Haveli and Daman and Diu',
  GA: 'Goa',
  GJ: 'Gujarat',
  HP: 'Himachal Pradesh',
  HR: 'Haryana',
  JH: 'Jharkhand',
  JK: 'Jammu and Kashmir',
  KA: 'Karnataka',
  KL: 'Kerala',
  MH: 'Maharashtra',
  ML: 'Meghalaya',
  MN: 'Manipur',
  MP: 'Madhya Pradesh',
  MZ: 'Mizoram',
  NL: 'Nagaland',
  OR: 'Odisha',
  PB: 'Punjab',
  PY: 'Puducherry',
  RJ: 'Rajasthan',
  SK: 'Sikkim',
  TG: 'Telangana',
  TN: 'Tamil Nadu',
  TR: 'Tripura',
  UP: 'Uttar Pradesh',
  UT: 'Uttarakhand',
  WB: 'West Bengal',
  LA: 'Ladakh',
  LD: 'Lakshadweep',
  TT: 'India',
};

const stateCodes = [];
const stateCodesMap = {};
Object.keys(STATE_NAMES).map((key, index) => {
  stateCodesMap[STATE_NAMES[key]] = key;
  stateCodes.push({code: key, name: STATE_NAMES[key]});
  return null;
});
export const STATE_CODES = stateCodesMap;
export const STATE_CODES_ARRAY = stateCodes;