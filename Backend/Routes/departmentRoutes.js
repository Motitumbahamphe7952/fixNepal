const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../Middlewares/isAuthenticated");
const { isAuthorized } = require("../Middlewares/isAuthorized");
const { getallDepartments,singleDepartment,createDepartment, updateDepartment, deleteDepartment } = require("../Controllers/departmentController");

router.get("/",isAuthenticated,getallDepartments);
router.get("/:id",isAuthenticated,singleDepartment);

router.post("/",isAuthenticated,isAuthorized("admin"),createDepartment)
router.put("/:id",isAuthenticated,isAuthorized("admin"),updateDepartment)
router.delete("/:id",isAuthenticated,isAuthorized("admin"),deleteDepartment)


module.exports = router;