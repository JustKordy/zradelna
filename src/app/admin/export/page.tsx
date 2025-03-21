'use client'

import { useEffect, useState } from "react";
import {userChoice} from "~/server/queries/menus";

function Page() {

    const [userChoices, setUserChoices] = useState<{menuId: string; dish: string; toGo: boolean;}[]>();

    

  return (
    <div>

        
      
    </div>
  )
}

export default Page
