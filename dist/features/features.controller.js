import { createFeature, getFeature, toggleFeature, } from "./features.service.js";
export const createFeatureController = async (req, res) => {
    try {
        const status = await createFeature(req.body);
        res.status(200).json(status);
    }
    catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
export const getFeatureController = async (req, res) => {
    try {
        const { id } = req.params;
        const features = await getFeature(id);
        res.status(200).json(features);
    }
    catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
export const toggleFeatureController = async (req, res) => {
    try {
        const features = await toggleFeature(req.body);
        res.status(200).json(features);
    }
    catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
//# sourceMappingURL=features.controller.js.map