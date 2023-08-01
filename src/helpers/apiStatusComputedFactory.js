import { apiStatus } from '@/api/apiStatus';
import { upperFirst } from 'lodash';

export const apiStatusComputedFactory = (reactivePropertyKey = "") => {
    let computed = {};

    for(const [statusKey, statusValue] of Object.entries(apiStatus)) {
        const normalisedStatus = upperFirst(statusKey.toLowerCase());

        computed[`${reactivePropertyKey}${normalisedStatus}`] = function() {
            return this[reactivePropertyKey] === statusValue;
        }
    }

    return computed;
}