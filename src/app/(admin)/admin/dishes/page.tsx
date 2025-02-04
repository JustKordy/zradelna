import { DishesComponent } from "~/comps/DishesComponent"
import IDish from "~/interfaces/IDish"
import { db } from "~/server/db"

export default async function Dishes() {

    const dishes: Array<IDish> = await db.query.dishes.findMany();

    console.log(dishes)

    return (
        <>
            <DishesComponent dishes={dishes} />
        </>
    ) 

}

