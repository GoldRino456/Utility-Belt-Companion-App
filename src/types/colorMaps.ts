import { AspectType, AspectColorClasses } from '../types';

export function GetColorMapForAspect(aspect: AspectType): AspectColorClasses {
    switch (aspect) {
        case AspectType.BASIC:
            return AspectColorClasses.BASIC;
        case AspectType.AGGRESSION:
            return AspectColorClasses.AGGRESSION;
        case AspectType.JUSTICE:
            return AspectColorClasses.JUSTICE;
        case AspectType.LEADERSHIP:
            return AspectColorClasses.LEADERSHIP;
        case AspectType.PROTECTION:
            return AspectColorClasses.PROTECTION;
        case AspectType.POOL:
            return AspectColorClasses.POOL;
        default:
            return AspectColorClasses.BASIC;
    }
};