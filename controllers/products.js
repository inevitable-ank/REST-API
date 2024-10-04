import Product from "../models/ProductModel.js"


export const getAllProducts = async (req, res) => {

    const {company, name, featured, sort, select} = req.query;

    const queryObject = {};
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = {$regex: name, $options : "i"};
    }
    if(featured){
        queryObject.featured = featured;
    }
    let apiData = Product.find(queryObject);
    // console.log(apiData)

    if(sort){
        let sortfix = sort.split(",").join(" ");
        apiData = apiData.sort(sortfix).collation({ locale: "en", strength: 2 })
    }

    if(select){
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }
    
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 10

    let skip = (page - 1)*limit;

    apiData= apiData.skip(skip).limit(limit);

    console.log(queryObject)



    const products = await apiData;
    res.status(200).json({ myData, nbHits: myData.length });
};

export const getAllProductstesting = async(req, res) =>{
    res.status(200).json({message:"You will test all your products"})
};
