var q = require("q");
let db = require("../common/database");
var c = db.getConnection();


function getAllcars(){
    var defer =q.defer();
    var query = c.query('SELECT * FROM CARS',function(err,cars){
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(cars);
        }
    });
    return defer.promise;
}
function getCarById(car_id) {
    if (car_id) {
        var defer = q.defer();
        var query = c.query('SELECT * FROM cars WHERE car_id = ?', [car_id], function(err, result) {
            if (err) {
                defer.reject(err);
            } else {
                if (result.length > 0) {
                    defer.resolve(result[0]);
                } else {
                    defer.resolve(null);
                }
            }
        });
        return defer.promise;
    }
    return q.reject(new Error("Invalid ID")); // Trả về promise bị reject với thông báo lỗi
}
// function getMafById(maf_id) {
//     if (maf_id) {
//         var defer = q.defer();
//         var query = c.query('SELECT * FROM manufacturers WHERE maf_id = ?', [maf_id], function(err, result) {
//             if (err) {
//                 defer.reject(err);
//             } else {
//                 if (result.length > 0) {
//                     defer.resolve(result[0]);
//                 } else {
//                     defer.resolve(null);
//                 }
//             }
//         });
//         return defer.promise;
//     }
//     return q.reject(new Error("Invalid ID")); // Trả về promise bị reject với thông báo lỗi
// }
function AddCar(p){
    if(p){
        var defer = q.defer();
        var query = c.query('INSERT INTO cars SET ?',p,function(err,result){
            
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}
function Addmaf(d){
    if(d){
        var defer = q.defer();
        var query = c.query('INSERT INTO manufacturers SET ?',d,function(err,result){
            
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

function getcarID(car_id){
    var defer = q.defer();
    var query = c.query('SELECT * FROM cars WHERE ?',{car_id:car_id}, function (err, posts) {
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(posts);
        }


   });
   return defer.promise;

}

function updateCars(params){
    if(params){
        console.log('SQL Query:', 'UPDATE cars SET model = ?, specifications = ?, price = ? WHERE car_id = ?', [params.model, params.specifications, params.price, params.car_id]);

        var defer = q.defer();
        var query = c.query('UPDATE  cars SET model =?,specifications = ?,price=? WHERE car_id=?',[params.model,params.specifications,params.price,params.car_id],function(err,result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;

    }
    return false;
}
//Chỉnh sữa thông tin hãng xe
// function editmaf(p){
    
//         var defer = q.defer();
//         var query = c.query('UPDATE manufacturers SET name =? WHERE maf_id =?',[p.name,p.maf_id],function(err,result){
//             if(err){
//                 defer.reject(err);
    
//             }else{
//                 defer.resolve(result);
//             }

//         });
        
//     return defer.promise;

    
// }
function getmafID(maf_id){
    var defer = q.defer();
    var query = c.query('SELECT * FROM manufacturers WHERE ?',{maf_id:maf_id}, function (err, posts) {
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(posts);
        }


   });
   return defer.promise;

}
function editmaf(params){
    if(params){
        console.log('SQL Query:', 'UPDATE manufacturers SET name =? WHERE maf_id = ?', [params.name,params.maf_id]);

        var defer = q.defer();
        var query = c.query('UPDATE  manufacturers SET name =?  WHERE maf_id=?',[params.name,params.maf_id],function(err,result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;

    }
    return false;
}
function deletecar(car_id) {
    if (car_id) {
        console.log(car_id);
        var defer = q.defer();
        var query = c.query('DELETE FROM cars WHERE car_id = ?', [car_id], function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}
// function deletemaf(manufacturer_id){
//     if(manufacturer_id){
//         var defer = q.defer();
//         var query=c.query('DELETE FROM manufacturers WHERE manufacturer_id = ?',[manufacturer_id],function(err,result){
//             if(err){
//                 defer.reject(err);
//             }else{s
//                 defer.resolve(result);
//             }
//         });
//         return defer.promise;
//     }
//     return false;
// }

function deletemaf(maf_id) {
    if (maf_id) {
        return new Promise(function(resolve, reject) {
            var query = c.query('DELETE FROM manufacturers WHERE maf_id = ?', [maf_id], function(err, result) {
                console.log(query);
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    return Promise.reject(new Error("manufacturer_id không hợp lệ"));
}


module.exports={
    getAllcars:getAllcars,
    getCarById:getCarById,
    AddCar:AddCar,
    getcarID:getcarID,
    updateCars:updateCars,
    deletecar:deletecar,
    Addmaf:Addmaf,
    deletemaf:deletemaf,
    getmafID:getmafID,
    editmaf:editmaf,
    getMafById:getMafById
}