
const user = require("../models/user")


exports.getallusers = async (req,res)=>{
    try {
        const users = await user.find();
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send(err.message)
    }
};

exports.getuserbyid = async(req,res)=>{
    try {
        const user = await user.findOne({ _id: req.params.id});
        if(!user){
            res.status(200).send(user)
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.addoneuser= async(req,res)=>{
    try {
        console.log(req.body)
        const {firstname,lasttname,profession,company} = req.body;
        if(!(title &&  body && category && image)) {
          return  res.status(400).send("all input are required");
        }
        const saveduser = await user.create({
            firstname,
            lasttname,
            profession,
            company,
        });
        res.status(201).json({ msg:"blog created", data: saveduser})
    } catch (err) {
        res.status(500).send(err.message)
    }
}
exports.updateuserbyid = async(req,res)=>{
    try {
        const  updateduser = await user.findOneAndUpdate(
            {
                _id:req.params.id
            },req.body,
            { new: true, useFindAndModify: false },
        );
        res.status(200).json({ messae: "user update", data: updateduser });
    } catch (err) {
        res.status(500).send(err.message)
    }
}
exports.delateuserbyid = async(req,res)=>{
    try {
        await user.deleteOne({ _id: req.params.id });
        res.status(200).send("user deleted");
    } catch (err) {
        res.status(500).send(err.message)
    }
}
