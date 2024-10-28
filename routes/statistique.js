const express = require('express');
const connection = require('../connection');
const router = express.Router();

//recupérations
router.get("/getAllNb/:date", (req, res) => {
    const date = req.params.date.split(`-`);
    const mois = +date[1],
    annee= date[0];
    let data1=[], label1=[], data2=[], label2;
    //const lisitra= req.body;
    sql = `select a.designationApp, 
    SUM(l.nombreApp) as somme 
    from lignecomsortie l
    JOIN appareil a ON l.idApp = a.idApp
    JOIN sortie s on l.idSortie = s.idSortie
    WHERE 
    YEAR(s.Dsortie)=? AND
    MONTH(s.Dsortie)=?
    GROUP BY l.idApp`;
    
    connection.query(sql, [annee, mois], (err, result) => {
        if (!err) {
            for(let a of result){
                label1.push(a.designationApp)
                data1.push(a.somme)
            }
            console.log(result)
            console.log({data1:data1,label1:label1, data2:data2, label2:label2})
            return res.status(200).json({data1:data1,label1:label1, data2:data2, label2:label2})
        } else {
            console.log(err);
            return res.status(500).json(err)
        }
    })

});

module.exports = router;