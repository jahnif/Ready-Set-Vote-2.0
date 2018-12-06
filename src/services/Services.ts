
import mockDistrictData from './sample-data/districts-response';
import mockEndorserData from './sample-data/endorsers-response';
import mockMeasureData from './sample-data/measures-response';

function GetDistricts() {
    return mockDistrictData;
}

function GetEndorsers() {
    return mockEndorserData;
}

function GetMeasures() {
    return mockMeasureData;
}

export { GetDistricts, GetEndorsers, GetMeasures }
