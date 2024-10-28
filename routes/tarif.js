const express = require('express');
const connection = require('../connection');
const router = express.Router();

//recupérations
router.get("/getAll", (req, res) => {
    sql = "select * from tarif";
    connection.query(sql, (err, result) => {
        if (!err) {
            return res.status(200).json(result)
        } else {
            return res.status(500).json(err)
        }
    })
});

//recupération
router.get("/get/:id", (req, res) => {
    const idApp = req.params.id;
    sql = "select * from tarif where idTarif=?";
    connection.query(sql, [idApp],(err, result) => {
        if (!err) {
            return res.status(200).json(result[0])
        } else {
            return res.status(500).json(err)
        }

    })

});



//ajout
router.post("/add", (req, res) => {
    const tarif = req.body;
    sql = "insert into tarif(DurreeAbonnement, montantChoisi, fonc1, fonc2, fonc3) values(?,?,?,?,?)";
    connection.query(sql, [tarif.DurreeAbonnement, tarif.montantChoisi, tarif.fonc1, tarif.fonc2, tarif.fonc3], (err, result) => {
        if (!err) {
            return res.status(200).json("Le demande a bien été enregistré!")
        } else {
            return res.status(500).json(err);
            console.log("une erreur est survénue pendant l'opération")
        }

    })

});

//mise à jour
router.put("/maj", (req, res) => {
    const tarif = req.body;
sql = "update tarif set DurreeAbonnement=?, montantChoisi=?, fonc1=?, fonc2=?, fonc3=? where idTarif=?";
connection.query(sql, [tarif.DurreeAbonnement, tarif.montantChoisi, tarif.fonc1, tarif.fonc2, tarif.fonc3, tarif.idTarif], (err, result) => {
        if (!err) {
            return res.status(200).json("Mise à jour éffectué")
        } else {

            console.log("une erreur est survénue pendant l'opération")
        }
    })
});

//supression
router.delete("/delete/:id", (req, res) => {
    const idTarif = req.params.id;
    sql = "delete from tarif where idTarif=?";
    connection.query(sql, [idTarif], (err, result) => {
        if (!err) {
            return res.status(200).json("Suppression éffectué")
        } else {
            return res.status(500).json(err)
        }
    })
});


module.exports = router;