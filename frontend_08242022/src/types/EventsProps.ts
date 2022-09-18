import React from "react";

export type EventProps  = {
  EventImage1: string ,
  EventImage2: string,
  EventImage3:string,
  title: string,
  location: string,
  dateTime: string,
  capacity: number,
  description: string,
  host?: string,
  event_id?: string,
  results?: EventProps[],

}  


// export type EventsInfo = {
//   results: EventProps[]
// }