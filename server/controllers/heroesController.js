const db=require('../database')

module.exports.getHeroes=(req,res)=>{
    let heroImagesList
    db.serialize(()=>{
        db.all(`SELECT * FROM Heroes_Images ORDER BY hero_id`,(err,rows)=>{
            if(err){
                console.log('Ошибка получения данных картинок')
                res.status(501).send(err)
            }
            else
                heroImagesList=rows
        })
        db.all(`SELECT * FROM Heroes ORDER BY id`,(err, rows)=>{
            if(err){
                console.log('Ошибка получения данных Героев')
                res.status(502).send(err)
            }
            else{
                rows.forEach(hero=>{
                    //цикл обьединения картинок и информации героев в один обьект
                    hero.image_array=[]
                    heroImagesList.forEach(image=>{
                        if(image.hero_id===hero.id)
                            hero.image_array.push(image.image)
                    })
                })
                res.send(rows)
            }
        })
    })
}
module.exports.createHeroes=(req,res)=>{
    db.serialize(()=>{
        db.run(`INSERT INTO Heroes (nickname, realName, originDescription, superpowers, catchPhrase)
        VALUES ("${req.body.nickname}", "${req.body.realName}", "${req.body.originDescription}", "${req.body.superpowers}", "${req.body.catchPhrase}")`
        ,function (err){
            if(err){
                console.error('Errorr'+err)
                return res.status(503).send(err)
            }
            else{
                let heroId=this.lastID
                req.body.imageArray.map(image=>{
                    db.run(`INSERT INTO Heroes_Images (hero_id, image)
                    VALUES (${heroId}, "${image.dataUrl}")`,err=>{
                        if(err)
                            return res.status(504).send(err)
                    })
                })
                res.send({success: 'true'})
            }
            // sqlImages=`INSERT INTO Heroes_Images (hero_id, image) 
            // VALUES ` + req.body.imageArray.map(image=>`(${heroId}, "${image.dataUrl}")`).join(', ')
        })
        // db.run(sqlImages,err=>{
        //     if(err){
        //         console.error(err)
        //         return res.status(504).send(err)
        //     }
        //     res.send('Success')
        // })
        

    })
}
