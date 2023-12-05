import User from "../models/User.js";

export const getUserByPage = async (req, res) => {
    try {
        const page = req.params.page;
        const users = await User.find().skip((page - 1) * 20).limit(Number(20))
        return res.status(200).json({
            msg: "success",
            data: users,
            error: null
        })
    } catch (error) {
        return res.status(500).json({
            msg: "failed",
            data: null,
            error: "Internal server error"
        })
    }
}
export const filterByDomain = async (req, res) => {
    try {
        const page = req.params.page;
        const users = await User.find().skip((page - 1) * 20).limit(Number(20))
        return res.status(200).json({
            msg: "success",
            data: users,
            error: null
        })
    } catch (error) {
        return res.status(500).json({
            msg: "failed",
            data: null,
            error: "Internal server error"
        })
    }
}
export const filterByGender = async (req, res) => {
    try {
        const gender = req.params.gender;
        const users = await User.find({gender})
        return res.status(200).json({
            msg: "success",
            data: users,
            error: null
        })
    } catch (error) {
        return res.status(500).json({
            msg: "failed",
            data: null,
            error: "Internal server error"
        })
    }
}
export const filterByAvailabilty = async (req, res) => {
    try {
        const page = req.params.page;
        const users = await User.find().skip((page - 1) * 20).limit(Number(20))
        return res.status(200).json({
            msg: "success",
            data: users,
            error: null
        })
    } catch (error) {
        return res.status(500).json({
            msg: "failed",
            data: null,
            error: "Internal server error"
        })
    }
}