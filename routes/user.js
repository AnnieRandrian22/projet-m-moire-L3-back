
const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();


//register
router.post("/register", (req, res) => {
    const user = req.body;
    sql = "select emailUser, password from user where emailUser=?"
    connection.query(sql, [user.emailUser], (err, result) => 
        {
            if (!err) 
            {
                if (result.length <= 0) 
                {
                    sql = "insert into user(nomUser,emailUser,password) values (?,?,?)"
                    connection.query(sql, [user.nomUser, user.emailUser, user.password], (err, result) => {
                        if (!err) {
                            return res.status(200).json({ message: 'Succesfully Registerd' });
                        }
                        else {
                            return res.status(500).json(err);
                        }
                    })
                }
                else {
                    return res.status(400).json({ message: 'Emaily already exist,' });
                }
            }
        })
})

//login
router.post("/loginPost", (req, res) => {
    const user = req.body;
    sql = "select emailUser, password, is_admin, etat from user where emailUser=?"
    connection.query(sql, [user.emailUser], (err, result) => {
        if (!err) {
            console.log(result)
            if (result.length <= 0 || result[0].password != user.password) {
                return res.status(401).json({ message: "Email ou mot de passe incorrect" });
            }
            else if (result[0].etat == 0) {
                return res.status(401).json({ message: "Attendez d'abord une aprobation de l'administrateur" })
            }
            else if (result[0].password == user.password) {
                const response = { emailUser: result[0].emailUser, nomUser: result[0].nomUser }
             
                const accesToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                return res.status(200).json({ is_admin:result[0].is_admin,token: accesToken });
            }
            else {
                return res.status(400).json({ message: "something went wrong. Please try again later" })
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.post('/verificationToken', (req, res)=> {
    const token= req.body.token;
    console.log(token)
    jwt.verify(token,  process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: "non autosirée"})
        }
        console.log("sucses")
        res.status(200).json(true)
    });
});

//Register

router.post("/add", (req, res) => {
    const user = req.body;
    sql = "insert into user(nomUser, emailUser, password, etat, is_admin) values(?,?,?,?,?)";
    connection.query(sql, [user.nomUser, user.emailUser, user.password,0,0], (err, result) => {
        if (!err) {
            return res.status(200).json("Compte créer avec succès")  
        } else {
            console.log(err) 
            return res.status(500).json(err);
            
        }
 
    })

});

router.get("/getAll", (req, res) => {
    sql = "select idUser, nomUser, emailUser, etat, is_admin from user";
    connection.query(sql, (err, result)=> {
        if(!err) {
            return res.status(200).json(result)
        } else {
            console.log(err)
            return res.status(500).json(err)
        }
    })
})

//modification
//recupération
router.get("/get/:id", (req, res) => {
    const idUser = req.params.id;
    sql = "select idUser, nomUser,emailUser, etat, is_admin from user where idUser=?";
    connection.query(sql, [idUser],(err, result) => {
        if (!err) {
            return res.status(200).json(result[0])
        } else {
            return res.status(500).json(err)
        }
    })
});
router.put("/update", (req, res) => {
    const user = req.body;
    console.log(user)
    sql = "update user set nomUser=?,emailUser=?, etat=?, is_admin=? where idUser=?";
    connection.query(sql, [user.nomUser, user.emailUser, user.etat, user.is_admin, user.idUser],(err, result) => {
        if (!err) {
            return res.status(200).json(result[0])
        } else {
            return res.status(500).json(err)
        }
    })
});

//Suppréssion
router.delete("/delete/:id", (req, res) => {
    const idUser = req.params.id;
    sql = "delete from user where idUser=?";
    connection.query(sql, [idUser], (err, result) => {
        if (!err) {
            return res.status(200).json("Suppression éffectué")
        } else {
            return res.status(500).json(err)
        }

    })
});



module.exports = router;