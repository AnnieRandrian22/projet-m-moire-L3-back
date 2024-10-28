const express = require('express');
const connection = require('../connection');
const router = express.Router();

//recupérations
router.get("/getAll", (req, res) => {
    //const lisitra= req.body;
    sql = "select * from retour";
    connection.query(sql, (err, result) => {
        if (!err) {
            return res.status(200).json(result)
        } else {
            console.log(err);
            return res.status(500).json(err)
        }
    })

});

//ajout 
router.post("/add", (req, res)=>{
    const retour = req.body;
    sql="insert into retour(designationApp, typeApp, nomDelegue, dateRetour, heureRetour, nombreApp) values(?,?,?,?,?,?)"
    connection.query(sql, [retour.designationApp, retour.typeApp, retour.nomDelegue, retour.dateRetour, retour.heureRetour, retour.nombreApp], (err, result) => {
        if (!err) {
            return res.status(200).json("Enregistrement OK")
        } else {
            return res.status(500).json(err);
            console.log("une erreur est survénue pendant l'opération")
        }
    })
})


//mise à jour
router.put("/maj", (req, res) => {
    const retour = req.body;
    sql = "update retour set designationApp=?, typeApp=?, nomDelegue=?, dateRetour=?, heureRetour=?, nombreApp=? where idRetour=?";
    connection.query(sql, [retour.designationApp, retour.typeApp, retour.nomDelegue, retour.dateRetour, retour.heureRetour, retour.nombreApp, retour.idRetour], (err, result) => {
        if (!err) {
            return res.status(200).json("Mise à jour éffectué")
        } else {

            console.log("une erreur est survénue pendant l'opération")
        }
    })
});

//recupération
router.get("/get/:id", (req, res) => {
    const idRetour = req.params.id;
    sql = "select * from retour where idRetour=?";
    connection.query(sql, [idRetour],(err, result) => {
        if (!err) {
            return res.status(200).json(result[0])
        } else {
            return res.status(500).json(err)
        }
    })
});


//suppression
router.delete("/delete/:id", (req, res) => {
    const idRetour = req.params.id;
    sql = "delete from retour where idRetour=?";
    connection.query(sql, [idRetour], (err, result) => {
        if (!err) {
            return res.status(200).json("Suppression éffectué")
        } else {
            return res.status(500).json(err)
        }

    })
});

module.exports = router;