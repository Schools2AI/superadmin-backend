import { insertFeature, findFeatureById, toggleFeatureModel, } from "../model/features.model.js";
export const createFeature = async (newFeature) => {
    const value = [newFeature.feature_name, newFeature.description];
    try {
        const status = await insertFeature(value);
    }
    catch (error) {
        // console.log(error);
        throw { status: 500, message: "Database error" };
    }
};
export const getFeature = async (id) => {
    try {
        const feature = await findFeatureById([id]);
        return feature;
    }
    catch (error) {
        // console.log(error);
        throw { status: 500, message: "Database error" };
    }
};
export const toggleFeature = async ({ featureId, schoolId, }) => {
    console.log(featureId);
    console.log(schoolId);
    try {
        const feature = await toggleFeatureModel([schoolId, featureId]);
        return feature;
    }
    catch (error) {
        // console.log(error);
        throw { status: 500, message: "Database error" };
    }
};
//# sourceMappingURL=features.service.js.map