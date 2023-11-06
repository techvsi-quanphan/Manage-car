var mysql = require("mysql");
var express = require("express");
var car_md = require("../models/cars");
var config = require("config");


var router = express.Router();
// router.get("/",function(req,res){
//     var data= car_md.getAllcars();
//     data.then(function(cars){
//         var data ={
//             cars:cars,
//             error:"false"
//         };
//         res.render("admin/car",{data:data});
//     }).catch(function(err){
//         res.render("admin/car",{data:{error:"get cars data is error"}});
//     });
    
// })

//Hiển thị danh sách xe
router.get("/", function (req, res) {
    const data = car_md.getAllcars();
    data.then(function (cars) {
        res.json({ cars: cars, error: "false" });
    }).catch(function (err) {
        res.status(500).json({ error: "get cars data is error" });
    });
});
// router.get("/car/:car_id",function(req,res){
//     var carid=req.params.car_id;
//     var data = car_md.getCarById(carid);
//     data.then(function(car){
//         if(!car){
//             res.render("admin/car_detail",{data:{error:"car not found"}});
//         }else{
//             res.render("admin/car_detail",{data:{car:car,error:false}});
//         }
//     }).catch(function(err){
//         res.render("admin/car_detail",{data:{error:"error fetching car data"}});
//     });

// });

//Xem chi tiết xe thông qua id
router.get("/car/:car_id",function(req,res){{
    var carid=req.params.car_id;
    var data=car_md.getCarById(carid);
    data.then(function(car){{
        if(!car){
            res.status(500).json({error:"not get car by id!"});
        }
        if(car){
            res.json({car:car,error:"false"});
        }
    }}).catch(function(err){
           res.status(500).json({error:"not get car by id!"});
    });
}});
// xem hãng xe thông qua id hãng
router.get("/maf/:maf_id",function(req,res){{
    var mafid=req.params.maf_id;
    var data=car_md.getmafID(mafid);
    data.then(function(car){{
        if(!car){
            res.status(500).json({error:"not get car by id!"});
        }
        if(car){
            res.json({car:car,error:"false"});
        }
    }}).catch(function(err){
           res.status(500).json({error:"not get car by id!"});
    });
}});
// router.get("/cars/add_car",function(req,res){
//     res.render("admin/cars/add_car",{data:{error:false}});
// });
// router.post("/cars/add_car",function(req,res){
//     var car = req.body;
//     if(car.car_id.trim().length==0){
//         return res.render("admin/cars/add_car",{data:{error:"car_id is require"}});
//     }
//     if(car.model.trim().length==0){
//         return res.render("admin/cars/add_car",{data:{error:"model is require"}});
//     }
//     if(car.specifications.trim().length==0){
//         return res.render("admin/cars/add_car",{data:{error:"specifications is require"}});
//     }
//     if(car.price.trim().length==0){
//         return res.render("admin/cars/add_car",{data:{error:"price is require"}});
//     }
//     if(car.manufacturer_id.trim().length==0){
//         return res.render("admin/cars/add_car",{data:{error:"manufacturer_id is require"}});
//     }

//     //insert to DB
//     var data =car_md.AddCar(car);
//     data.then(function(result){
//         console.log("Car added successfully. Result:", result);

//         res.redirect("/admin");
//     }).catch(function(err){
//         console.log("", err);

//         res.render("admin/cars/add_car",{data:{error:"err inserting car"}});

//     });
// });
router.get("/cars/add_car", function(req, res) {
    res.json({ data: { error: false } });
});

//thêm xe, thông tin chi tiết xe
router.post("/cars/add_car", function(req, res) {
    var car = req.body;
    if (car.car_id.trim().length == 0) {
        return res.json({ data: { error: "car_id is required" } });
    }
    if (car.model.trim().length == 0) {
        return res.json({ data: { error: "model is required" } });
    }
    if (car.specifications.trim().length == 0) {
        return res.json({ data: { error: "specifications is required" } });
    }
    if (car.price.trim().length == 0) {
        return res.json({ data: { error: "price is required" } });
    }
    if (car.manufacturer_id.trim().length == 0) {
        return res.json({ data: { error: "manufacturer_id is required" } });
    }

    // Insert to DB
    var data = car_md.AddCar(car);
    data.then(function(result) {
        console.log("Car added successfully. Result:", result);
        res.json({ message: "Car added successfully", success: true });
    }).catch(function(err) {
        console.log(err);
        res.json({ data: { error: "error inserting car" } });
    });
});
//thêm thông tin hãng xe
router.get("/maf/add_maf", function(req, res) {
    res.json({ data: { error: false } });
});
router.post("/maf/add_maf", function(req, res) {
    var maf = req.body;
    if (maf.maf_id.trim().length == 0) {
        return res.json({ data: { error: "car_id is required" } });
    }
    if (maf.name.trim().length == 0) {
        return res.json({ data: { error: "car_id is required" } });
    }
   
    // Insert to DB
    var data = car_md.Addmaf(maf);
    data.then(function(result) {
        console.log("manufacturers added successfully. Result:", result);
        res.json({ message: "manufacturers added successfully", success: true });
    }).catch(function(err) {
        console.log(err);
        res.json({ data: { error: "error inserting car" } });
    });
});




// router.get("/cars/edit/:car_id",function(req,res){
//     var carid=req.params.car_id;
//     console.log(carid);
//     var data = car_md.getcarID(carid);
//     if(data){
//         data.then(function(cars){
//             console.log(cars[0]);
//             var car = cars[0];
//             var data = {
//                 car:car,
//                 error:false
//             };
//             res.render("admin/cars/edit",{data:data});
//         }).catch(function(err){
//             var data = {error:"could not get car by car_id"};
//             res.render("admin/cars/edit",{data:data});

//         });
//     }else {
//         var data = {
//             error: "Could not get car by car_ID"
//         };
//         res.render("admin/cars/edit", { data:data  });
//     }
    
// });
router.get("/cars/edit/:car_id",function(req,res){
    var carid=req.params.car_id;
    var data = car_md.getcarID(carid);
    data.then(function(car){
        if(!car){
            res.status(500).json({error:"not get car ID"});
        }else{
            res.json({car:car,error:"false"});
        }
    }).catch(function(err){
        res.status(500).json({error:"not get car ID"});
    });
});
router.get("/maf/edit/:maf_id",function(req,res){
    var mafid=req.params.maf_id;
    var data = car_md.getmafID(mafid);
    data.then(function(maf){
        if(!maf){
            res.status(500).json({error:"not get maf ID"});
        }else{
            res.json({maf:maf,error:"false"});
        }

    }).catch(function(err){
        res.status(500).json({error:"not get maf ID"});
    })
})
// chỉnh sữa
router.put("/cars/edit/:car_id",function(req,res){
     var params=req.body;
     var data=car_md.updateCars(params);
     data.then(function(car){
        if(!car){
            res.json({ status_code: 500 });
        }else{
            res.json({ status_code: 200 });
        }
     }).catch(function(err){
        res.json({ status_code: 500 });

     });
});

router.put("/maf/edit/:maf_id", async function(req, res) {
    var params = req.body;
    try {
        var data = await car_md.editmaf(params);
        if (!data) {
            res.json({ status_code: 500 });
        } else {
            res.json({ status_code: 200 });
        }
    } catch (err) {
        res.json({ status_code: 500 });
    }
});
//xóa
router.delete("/cars/delete/:car_id", function (req, res) {
    var cars_id = req.params.car_id;
    console.log(cars_id);
    var data = car_md.deletecar(cars_id);

    if (!data) {
        console.log("Error: Unable to delete user.");
        res.json({ status_code: 500 });
    } else {
        data.then(function (result) {
            console.log( result);

            res.json({ status_code: 200 });
        }).catch(function (err) {
            console.log("Error:", err);
            res.json({ status_code: 500 });
        });
    }
});

router.delete("/maf/delete/:maf_id", function(req, res) {
    var mf_id = req.params.maf_id;
    console.log(mf_id);
    var data = car_md.deletemaf(mf_id);

  
        data.then(function(result) {
            if (!result) {
                console.log("Lỗi: Không thể xóa người dùng.");
                res.json({ status_code: 500 });
            } else {
                console.log(result);
                res.json({ status_code: 200 });
            }
        })
        .catch(function(err) {
            console.log("Lỗi:", err);
            res.json({ status_code: 500 });
        });
});
//lọc danh sách xe theo hãng và mức giá
router.get("/cars",async function(req,res){
    var{manufacturer,price}=req.query;//lấy tham số truy vẫn từ URL
    try{
        var cars = await car_md.getAllcars();
        //lọc danh sách xe dựa theo tham số truy vẫn;
        let filterCars = cars;
        if(manufacturer){
            filterCars=filterCars.filter(car=>car.maf_id===manufacturer);
        }
        if(price){
            filterCars=filterCars.filter(car=>car.price<=price);
        }
        res.json({cars:filterCars,error:"false"});
    }catch(err){
        res.status(500).json({error:"get cars data is error"});
    }
});
//tìm kiếm xe theo tên
router.get("/cars/search", async function(req,res){
    var{name}=req.query;
    try{
        var cars = await car_md.getAllcars();
        let filterCars= cars;
        if(name){
            filterCars=filterCars.filter(car=>car.model===name);
            //filterCar = filterCar.filter(car => car.model.toLowerCase().includes(name.toLowerCase()));

        }
        res.json({cars:filterCars,error:"false"});
    }catch(err){
        res.status(500).json({error:"get search car name is error"});
    }
});

module.exports=router;