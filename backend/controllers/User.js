import User from "../models/User.js";
export const getUsers = async (req, res) => {
    try {
        const { page = 1, pageSize = 20, filters, searchQuery } = req.query;
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
            if(filtersArray.available.length){
                filter['available']={$in: filtersArray.available}
            }
        }
        if(searchQuery.length){
            filter['first_name']=new RegExp(searchQuery,'i')
        }
        const users = await User.find(filter).skip((page - 1) * pageSize).limit(Number(pageSize))
        const totalUsers = await User.countDocuments(filter)
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

