
import mockDistrictData from './sample-data/districts-response';
import mockEndorserData from './sample-data/endorsers-response';

function GetDistricts() {
    return mockDistrictData;
}

function GetEndorsers() {
    return mockEndorserData;
}

export { GetDistricts, GetEndorsers }
