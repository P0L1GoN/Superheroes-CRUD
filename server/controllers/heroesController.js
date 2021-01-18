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
