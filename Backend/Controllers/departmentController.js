const departmentModel = require("../Models/departmentModel");


module.exports.getallDepartments = async (req,res)=>{
    try {
        const departments = await departmentModel.find();
        if(departments.length === 0){
            return res.status(404).json({message:"No departments found"})
        }
        res.status(200).json({departments})


    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
}

module.exports.singleDepartment = async (req,res)=>{
    try {
        const department = await departmentModel.findById(req.params.id);
        if(!department){
            return res.status(404).json({message:"Department not found"})
        }
        res.status(200).json({department:department})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.createDepartment = async (req, res) => {
 try {
    const { name,email,phone,description, categories } = req.body;
    if (!name || !email || !phone || !categories) { 
      return res.status(400).json({ message: "All fields are required" });
    }
    const categoriesArray = categories.split(",").map((cat) => cat.trim());


        
    const department = await departmentModel.create({
      name,
      categories: categoriesArray,
      email,
      phone,
      description,
    });

    res.status(201).json({
      message: "Department created",
      department,
    });

  } catch (err) {
    res.status(500).json({message1:"Error creating department", message: err.message });
  }

}

module.exports.updateDepartment = async (req,res)=>{
    try {
        const departmentId = req.params.id;
        const { name,email,phone,description, categories } = req.body;
        const department = await departmentModel.findById(departmentId);
        if(!department){
            return res.status(404).json({ message: "Department not found" });
        }
        department.name = name || department.name;
        department.email = email || department.email;
        department.phone = phone || department.phone;
        department.description = description || department.description;
        if(categories){
            const categoriesArray = categories.split(",").map((cat) => cat.trim());
            department.categories = categoriesArray;
        }
        await department.save();
        res.status(200).json({ message: "Department updated", department });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.deleteDepartment = async (req,res)=>{
    try {
        const departmentId = req.params.id;
        const department = await departmentModel.findById(departmentId);
        if(!department){
            return res.status(404).json({ message: "Department not found" });
        }
        await department.findByIdAndDelete(departmentId);
        res.status(200).json({ message: "Department deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}