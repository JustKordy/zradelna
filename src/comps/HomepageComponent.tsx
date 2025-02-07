"use client"
import { User, UserResponse } from "@supabase/supabase-js";


export const HomepageComponent = ({user} : {user: User})  => {
    
    

    return(
        <>
            <div className="w-screen h-full">
                {user.email}
            </div>
        </>
    )
}