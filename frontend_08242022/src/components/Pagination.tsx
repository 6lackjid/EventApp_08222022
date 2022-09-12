import { Pagination } from "@mantine/core";

import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

// export interface Props {
//   sum: number
//   per: number
//   onChange: (e: { page: number }) => void
// }

export const Page = () => {
  const [page, setPage] = useState(1);
 
  const urlPages = `http://127.0.0.1:8000/api/events/lists/?page=${page}`;
  const loadPage = async () => {
    const res = await axios.get(urlPages);
    console.log(res.data);
    setPage(res.data);
  };

  useEffect(() => {
   loadPage();
  }, []);

  return (
    
      <Pagination
        total={10}
        position="center"
        page={page}
        onChange={setPage}
        
        styles={(theme) => ({
          item: {
            "&[data-active]": {
              backgroundImage: theme.fn.gradient({ from: "red", to: "yellow" }),
            },
          },
        })}
      />


  );
};
