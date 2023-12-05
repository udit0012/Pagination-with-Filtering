import User from "../models/User.js";
export const getUsers = async (req, res) => {
    try {
        const { page = 1, pageSize = 20, filters, search } = req.query;
        const filter = {};

        // Parse filters as an array of field-value pairs
        if (filters) {
            const filtersArray = JSON.parse(filters);
            if(filtersArray.domain.length){
                filter['domain']={$in: filtersArray.domain}
            }
            if(filtersArray.gender.length){
                filter['gender']={$in: filtersArray.gender}
            }
        }
        const users = await User.find(filter).skip((page - 1) * pageSize).limit(Number(pageSize))
        const totalUsers = await User.countDocuments(filter)
        // console.log(users);
        // console.log(filters);
        return res.status(200).json({
            msg: "success",
            data: users,
            totalUsers:totalUsers,
            error: null
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "failed",
            data: null,
            error: "Internal server error"
        })
    }
}
export const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOne({ id })
        if (!user) {
            return res.status(404).json({
                msg: "failed",
                data: null,
                error: "User not found"
            })
        }
        return res.status(200).json({
            msg: "success",
            data: user,
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
global.autoIncrementId = 1001
export const addUser = async (req, res) => {
    try {
        const user = await User.create({
            id: global.autoIncrementId,
            ...req.body,
        })
        global.autoIncrementId++;
        return res.status(200).json({
            msg: "success",
            data: user,
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
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOneAndUpdate({ id }, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).json({
                msg: "failed",
                data: null,
                error: "User not found"
            })
        }
        return res.status(200).json({
            msg: "success",
            data: user,
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
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOneAndDelete({ id })
        if (!user) {
            return res.status(404).json({
                msg: "failed",
                data: null,
                error: "User not found"
            })
        }
        return res.status(200).json({
            msg: "success",
            data: user,
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
export const getAllUniqueValue = async(req,res)=>{
    try {
        const domainValues = await User.distinct('domain')
        const genderValues = await User.distinct('gender')
        return res.status(200).json({
            msg: "success",
            data: {domainValues,genderValues},
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

